import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request){
  const data = await request.json().catch(()=> ({}))

  // Validate input
  if (!data.name || !data.email) {
    return NextResponse.json({ ok:false, error: 'İsim ve e-posta gereklidir' }, { status: 400 })
  }

  // If VDS_URL is set, forward to it and return its response
  const VDS_URL = process.env.VDS_URL || process.env.VDS_IP && `http://${process.env.VDS_IP}:${process.env.VDS_PORT || 3003}`

  if (VDS_URL) {
    try {
      // fetch with timeout so serverless function doesn't hang
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const resp = await fetch(`${VDS_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: 'Yeni davetiye başvurusu', ...data }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!resp.ok) {
        const body = await resp.text().catch(()=>'<unreadable>')
        console.error('VDS responded with non-OK status', resp.status, body)
        // Return an informative error so caller can retry or switch to SMTP
        return NextResponse.json({ ok:false, error: 'VDS error', status: resp.status, body }, { status: 502 })
      }

      const body = await resp.json().catch(()=>({}))
      return NextResponse.json({ ok:true, forwarded:true, remote: body })
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error('VDS forwarding timed out')
        return NextResponse.json({ ok:false, error: 'VDS request timed out' }, { status: 504 })
      }
      console.error('VDS forwarding error', err)
      // fallthrough to try local send
    }
  }

  // Fallback: attempt to send via nodemailer using server env vars
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const MAIL_TO = process.env.MAIL_TO || process.env.MAIL_FROM
  const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER || 'no-reply@example.com'

  // If SMTP not configured, store submission in memory or return success (demo mode)
  if (!SMTP_HOST || !SMTP_USER) {
    console.log('Demo mode: Storing appointment request (SMTP not configured)')
    console.log('Appointment:', data)
    return NextResponse.json({ ok:true, message: 'Talebiniz alındı. E-posta yapılandırması yapıldıktan sonra iletişime geçeceğiz.' })
  }

  try {
    // Use pool and timeouts to be a bit more resilient in serverless environments
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      pool: true,
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    })

    const subject = data.subject || 'Yeni davetiye başvurusu'
    const text = JSON.stringify(data, null, 2)
    const html = `<pre>${text}</pre>`

    // sanitize and validate submitter email; set as Reply-To instead of From
    const _clean = (v='') => v.toString().trim().replace(/^<|>$/g, '')
    const submitEmail = _clean(data.email || '')
    const _isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitEmail)

    const mailOptions = {
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      text,
      html,
      // Ensure SMTP envelope uses configured MAIL_FROM / MAIL_TO
      envelope: { from: MAIL_FROM, to: MAIL_TO },
      ...( _isEmail ? { replyTo: submitEmail } : {}),
    }

    const info = await transporter.sendMail(mailOptions)

    return NextResponse.json({ ok:true, sent: true, info })
  } catch (err) {
    console.error('Local mail send error', err)
    return NextResponse.json({ ok:false, error: err.message }, { status: 500 })
  }
}
