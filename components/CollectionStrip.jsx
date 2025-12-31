"use client"
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

function slugify(t){
  return t.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/(^-|-$)/g, '')
}

export default function CollectionStrip(){
  const router = useRouter()
  const images = [
    'https://i.hizliresim.com/p44qrln.png',
    'https://i.hizliresim.com/tngeyms.png',
    'https://i.hizliresim.com/p59h5zl.png',
  ]

  // Tek koleksiyon: Noir Silence — diğer başlıklar bu koleksiyonun parçaları olarak gösterilecek
  const collections = [
    { title: 'NOIR SILENCE', desc: 'Noir Silence koleksiyonumuza göz atın' }
  ]

  // Eğer tek koleksiyon varsa, 12 adet parça oluştur ve onları marquee'de göster
  const pieces = Array.from({ length: 12 }).map((_, i) => ({
    title: `No. ${String(i+1).padStart(2, '0')}`,
    subtitle: 'Noir Silence',
  }))

  const items = collections.length === 1 ? pieces : collections

  // duplicate the list for seamless loop
  const repeated = [...items, ...items]

  const trackRef = useRef(null)
  const marqueeRef = useRef(null)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const speedMultiplierRef = useRef(1)

  useEffect(()=>{
    const track = trackRef.current
    console.log('[marquee] useEffect mounted, trackRef present?', !!track)
    if(!track){
      console.log('[marquee] trackRef missing, aborting useEffect')
      return
    }

    // Animasyonu her zaman çalıştır
    console.log('[marquee] animasyon başlatılıyor')
    
    // disable CSS animation fallback for JS-driven marquee
    console.log('[marquee] disabling CSS animation fallback (setting track.style.animation = "none")')
    track.style.animation = 'none'

    const children = Array.from(track.children)
    console.log('[marquee] children length:', children.length, 'trackClientWidth:', track.clientWidth, 'trackScrollWidth:', track.scrollWidth)
    const singleCount = items.length

    // Hemen başlamak için tahmin edilen genişlik - ref olarak tutuyoruz
    const cycleWidthRef = { current: singleCount * 350 } // yaklaşık kart genişliği + margin
    console.log('[marquee] initial cycleWidth (estimated):', cycleWidthRef.current)

    // compute cycle width robustly; images may not be loaded yet so retry until we have >0 width
    function computeCycleWidth(){
      const ch = Array.from(track.children)
      const startLeft = ch[0]?.offsetLeft || 0
      const duplicateStart = ch[singleCount]?.offsetLeft || 0
      let w = duplicateStart - startLeft
      if(!w || w <= 0){
        w = ch.slice(0, singleCount).reduce((acc, el) => acc + el.offsetWidth + (parseFloat(getComputedStyle(el).marginRight) || 16), 0)
      }
      // fallback to scrollWidth/2 if still zero (covers lazy images or CSS differences)
      if(!w || w <= 0){
        const sw = track.scrollWidth || 0
        if(sw > 0){
          w = Math.floor(sw / 2)
        }
      }
      cycleWidthRef.current = w
      return cycleWidthRef.current
    }

    console.log('[marquee] before computeCycleWidth - skipping initial computation')
    // İlk hesaplamayı atla, tahmin edilen değerle başla
    // computeCycleWidth()
    console.log('[marquee] using estimated cycleWidth:', cycleWidthRef.current)

    // if width is zero (images still loading), retry after a short delay and also listen for load events on imgs
    let retry = null
    let imgs = []
    let _cleanupImgs = null
    function addImgListeners(){
      imgs = Array.from(track.querySelectorAll('img'))
      console.log('[marquee] addImgListeners found imgs:', imgs.length)
      if(imgs.length === 0) return
      let loaded = 0
      const onImgLoad = ()=>{
        loaded++
        if(loaded >= imgs.length){
          const w = computeCycleWidth()
          console.log('[marquee] images loaded, new cycleWidth:', w)
          if(w > 0) cleanupListeners()
        }
      }
      imgs.forEach(img => img.addEventListener('load', onImgLoad))
      // final fallback: try again after 250ms
      retry = setTimeout(()=>{ const w = computeCycleWidth(); console.log('[marquee] retry computeCycleWidth:', w); if(w > 0) cleanupListeners() }, 250)

      function cleanupListeners(){
        imgs.forEach(img => img.removeEventListener('load', onImgLoad))
        if(retry) clearTimeout(retry)
        window.removeEventListener('load', onWindowLoad)
      }
      _cleanupImgs = cleanupListeners
    }

    function onWindowLoad(){
      const w = computeCycleWidth()
      if(w > 0 && typeof _cleanupImgs === 'function') _cleanupImgs()
    }

    // Resimler yüklendiğinde genişliği güncelle (opsiyonel iyileştirme)
    addImgListeners()
    window.addEventListener('load', onWindowLoad)
    // improved timing control - smooth pause/resume!
    const duration = 15000 // 15 saniyede tam döngü - daha hızlı!
    const startTimeRef = { current: null }
    const positionRef = { current: 0 }
    const lastTimeRef = { current: null }
    let loggedFirst = false

    function step(ts){
      if(startTimeRef.current === null) {
        startTimeRef.current = ts
        lastTimeRef.current = ts
      }

      // Smooth yavaşlama/hızlanma efekti
      const targetSpeed = pausedRef.current ? 0 : 1
      const smoothness = 0.05 // Ne kadar küçükse o kadar smooth
      speedMultiplierRef.current += (targetSpeed - speedMultiplierRef.current) * smoothness
      
      // Yavaşlama bittiğinde tam durdur
      if(Math.abs(speedMultiplierRef.current) < 0.001) {
        speedMultiplierRef.current = 0
      }

      const deltaTime = ts - lastTimeRef.current
      lastTimeRef.current = ts

      const baseSpeed = cycleWidthRef.current / duration // piksel/milisaniye
      const currentSpeed = baseSpeed * speedMultiplierRef.current
      
      positionRef.current -= deltaTime * currentSpeed
      
      // Loop için position'ı sıfırla
      if(positionRef.current <= -cycleWidthRef.current) {
        positionRef.current += cycleWidthRef.current
      }
      
      track.style.transform = `translateX(${positionRef.current}px)`

      if(!loggedFirst){
        console.log('[marquee] step start: cycleWidth=', cycleWidthRef.current, 'duration=', duration)
        loggedFirst = true
      }

      rafRef.current = requestAnimationFrame(step)
    }

    // Hemen başlat - genişlik hesaplamayı beklemeden
    console.log('[marquee] starting RAF immediately with cycleWidth=', cycleWidthRef.current)
    rafRef.current = requestAnimationFrame(step)
    
    // Arka planda gerçek genişliği hesapla ve güncelle
    setTimeout(() => {
      const w = computeCycleWidth()
      if(w > 0 && w !== cycleWidthRef.current) {
        console.log('[marquee] updated cycleWidth after delay:', cycleWidthRef.current)
      }
    }, 200)

    // Mouse event handlers for smooth pause/resume
    const marqueeNode = marqueeRef.current
    function onEnter(){ pausedRef.current = true }
    function onLeave(){ pausedRef.current = false }

    marqueeNode?.addEventListener('mouseenter', onEnter)
    marqueeNode?.addEventListener('mouseleave', onLeave)

    // also handle window resize to recompute cycleWidth cleanly
    function onResize(){
      const childrenNow = Array.from(track.children)
      const ds = childrenNow[singleCount]?.offsetLeft || 0
      const st = childrenNow[0]?.offsetLeft || 0
      cycleWidthRef.current = ds - st || childrenNow.slice(0, singleCount).reduce((acc, el) => acc + el.offsetWidth + parseFloat(getComputedStyle(el).marginRight || 16), 0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      marqueeNode?.removeEventListener('mouseenter', onEnter)
      marqueeNode?.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onWindowLoad)
      if(typeof _cleanupImgs === 'function') _cleanupImgs()
    }
  }, [])

  return (
    <div ref={marqueeRef} className="marquee" role="region" aria-label="Koleksiyonlar">
      <div ref={trackRef} className="marquee-track" aria-hidden="true">
        {repeated.map((c, i) => {
          const img = images[i % images.length]
          const slug = slugify((c.subtitle ? `${c.subtitle} ${c.title}` : c.title))
          // Tek koleksiyon modu: parça olarak gösteriyoruz ve /collection sayfasına hash ile yönlendiriyoruz
          const href = collections.length === 1 ? `/collection#${slug}` : `/collections#${slug}`
          return (
            // Navigate into products page using product/collection hash so products page handles opening
            <Link key={i} href={`/products#${slug}`} className="marquee-card" aria-label={`${c.title} — ${c.subtitle || ''}`.trim()} onClick={(e)=>{e.preventDefault(); router.push(`/products#${slug}`)}}>
              <div className="marquee-thumb">
                <OptimizedImage priority={true} src={img} alt={`${c.title} ${c.subtitle ? `— ${c.subtitle}` : ''}`} className="w-full h-full object-cover" sizes="(min-width:1024px) 20vw, 40vw" />
              </div>
              <div className="marquee-meta">
                <span className="font-heading text-mutedgold">{c.title}</span>
                {c.subtitle && <small className="block text-xs text-gray-400">{c.subtitle} koleksiyonundan</small>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}