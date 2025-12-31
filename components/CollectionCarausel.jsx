"use client"
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { useRouter } from 'next/navigation'

function slugify(t){
  return t.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/(^-|-$)/g, '')
}

export default function CollectionCarousel(){
  const router = useRouter()
  const images = [
    'https://i.hizliresim.com/p44qrln.png',
    'https://i.hizliresim.com/tngeyms.png',
    'https://i.hizliresim.com/p59h5zl.png',
  ]

  // Tek koleksiyon: Noir Silence — mevcut 12 başlık bu koleksiyonun parçalarıdır
  const collections = [
    { title: 'NOIR SILENCE', desc: 'Noir Silence koleksiyonumuza göz atın' }
  ]

  // Seamless loop için kartları 2 kez tekrarla
  const doubled = [...collections, ...collections]

  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const positionRef = useRef(0)
  const pausedRef = useRef(false)
  const speedMultiplierRef = useRef(1)

  useEffect(()=>{
    const track = trackRef.current
    if(!track) {
      console.log('Track ref yok')
      return
    }

    console.log('Animasyon başlatılıyor...')

    // Reduced motion kontrolünü kaldırdık - carousel sürekli çalışsın

    // Hemen başlamak için sabit genişlik kullan
    const cardCount = collections.length
    const singleSetWidthRef = { current: cardCount * 324 } // 300px card + 24px gap

    console.log('Başlangıç genişliği:', singleSetWidthRef.current)

    // Gerçek genişliği sonra hesapla ve güncelle
    setTimeout(() => {
      let calculatedWidth = 0
      for(let i = 0; i < cardCount; i++){
        const card = track.children[i]
        if(card){
          const style = window.getComputedStyle(card)
          const width = card.offsetWidth
          const marginRight = parseFloat(style.marginRight) || 0
          calculatedWidth += width + marginRight
        }
      }
      if(calculatedWidth > 0) {
        singleSetWidthRef.current = calculatedWidth
        console.log('Güncellenmiş genişlik:', singleSetWidthRef.current)
      }
    }, 100)

    const startTimeRef = { current: null }
    const lastTimeRef = { current: null }

    function animate(timestamp){
      if(startTimeRef.current === null) {
        startTimeRef.current = timestamp
        lastTimeRef.current = timestamp
      }
      
      // Smooth yavaşlama/hızlanma efekti
      const targetSpeed = pausedRef.current ? 0 : 1
      const smoothness = 0.05 // Ne kadar küçükse o kadar smooth
      speedMultiplierRef.current += (targetSpeed - speedMultiplierRef.current) * smoothness
      
      // Yavaşlama bittiğinde tam durdur
      if(Math.abs(speedMultiplierRef.current) < 0.001) {
        speedMultiplierRef.current = 0
      }
      
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      
      // 20 saniyede tam bir döngü - daha hızlı!
      const baseSpeed = singleSetWidthRef.current / 15000 // piksel/milisaniye
      const currentSpeed = baseSpeed * speedMultiplierRef.current
      
      positionRef.current -= deltaTime * currentSpeed
      
      // Loop için position'ı sıfırla
      if(positionRef.current <= -singleSetWidthRef.current) {
        positionRef.current += singleSetWidthRef.current
      }
      
      if(track){
        track.style.transform = `translateX(${positionRef.current}px)`
      }
      
      rafRef.current = requestAnimationFrame(animate)
    }

    console.log('RAF başlatıldı')
    rafRef.current = requestAnimationFrame(animate)

    return ()=> {
      console.log('Animasyon temizleniyor')
      if(rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div 
      className="relative overflow-hidden py-8 bg-gradient-to-r from-transparent via-black/5 to-transparent"
      onMouseEnter={()=> pausedRef.current = true}
      onMouseLeave={()=> pausedRef.current = false}
    >
      <div 
        ref={trackRef}
        className="flex gap-6"
        style={{ 
          willChange: 'transform',
          display: 'flex',
          flexWrap: 'nowrap'
        }}
      >
        {doubled.map((collection, i) => {
          const img = images[i % images.length]
          const slug = slugify(collection.title)
          
          return (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: '300px', marginRight: '24px' }}
            >
              {/* Navigate directly into products page and open the related piece */}
              <Link 
                href={`/products#${slug}-piece-${(i % images.length) + 1}`}
                className="block group"
                onClick={(e)=>{e.preventDefault(); router.push(`/products#${slug}-piece-${(i % images.length) + 1}`)}}
              >
                <div className="card-item cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-80 overflow-hidden bg-gray-100">
                    <OptimizedImage 
                      src={img} 
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      sizes="300px"
                    />
                  </div>
                  <div className="card-caption p-4 bg-white">
                    <div className="flex flex-col gap-1">
                      <strong className="font-heading text-mutedgold text-lg">{collection.title}</strong>
                      <span className="muted text-sm text-gray-600">{collection.desc}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}