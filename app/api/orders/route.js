import { NextResponse } from 'next/server'

export async function POST(request){
  const data = await request.json().catch(()=> ({}))
  // placeholder: persist order or forward to backend
  return NextResponse.json({ ok:true, id: Date.now(), received: data })
}
