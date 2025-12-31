"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OptimizedImage from './OptimizedImage'

export default function CollectionCard({ collection, image }){
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [main, setMain] = useState(image)
  const thumbs = collection.thumbs || [image, image, image]
  const modalRef = useRef(null)
  const lastActive = useRef(null)
  
  // Generate 12 pieces for NOIR SILENCE collection
  const pieces = Array.from({ length: 12 }).map((_, i) => ({
    id: `piece-${i + 1}`,
    title: `No. ${String(i + 1).padStart(2, '0')}`,
    image: image,
    story: `Noir Silence koleksiyonundan parça ${i + 1}. Her parça ustalık ve malzeme seçiminin bir sonucudur.`
  }))
  
  const isSingleCollection = collection.title === 'NOIR SILENCE'
  const displayPieces = isSingleCollection ? pieces : []
  
  const slug = collection.title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '')

  useEffect(() => {
    function onKey(e){
      if(!open) return
      if(e.key === 'Escape'){
        e.preventDefault()
        closeModal()
      }

      if(e.key === 'Tab'){
        const node = modalRef.current
        if(!node) return
        const focusable = node.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])')
        if(focusable.length === 0){
          e.preventDefault()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if(e.shiftKey){
          if(document.activeElement === first){
            e.preventDefault()
            last.focus()
          }
        } else {
          if(document.activeElement === last){
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    if(open){
      lastActive.current = document.activeElement
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKey)
      // focus first focusable inside modal
      setTimeout(() => {
        const node = modalRef.current
        if(!node) return
        const focusable = node.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])')
        if(focusable.length) focusable[0].focus()
        else node.focus()
      }, 0)
    }

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if(lastActive.current && lastActive.current.focus) lastActive.current.focus()
    }
  }, [open])

  // open/close helpers that synchronize URL hash
  function openModal(){
    if(typeof window !== 'undefined'){
      // set products hash so deep links point to products view (collection modal behavior kept)
      history.replaceState(null, '', `/products#${slug}`)
    }
    setOpen(true)
  }

  function closeModal(){
    setOpen(false)
    if(typeof window !== 'undefined'){
      history.replaceState(null, '', '/collections')
    }
  }

  // listen to hash changes so direct links open the modal
  useEffect(()=>{
    function checkHash(){
      if(typeof window === 'undefined') return
      const h = window.location.hash.replace('#','')
      // open modal if hash equals collection slug or starts with slug- (e.g. piece hashes)
      if(h === slug || h.startsWith(`${slug}-`)) openModal()
      else if(open) closeModal()
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return ()=> window.removeEventListener('hashchange', checkHash)
  }, [slug])

  function goToStory(){
    closeModal()
    if(isSingleCollection){
      router.push(`/products#${slug}`)
    } else {
      router.push(`/products#${slug}`)
    }
  }

  return (
    <>
      <div onClick={openModal} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal() } }} role="button" tabIndex={0} className="card-item group relative cursor-pointer">
        <OptimizedImage
          src={image}
          alt={collection.title}
          className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
          sizes="(min-width:1024px) 33vw, 100vw"
        />

        <div className="card-caption">
          <div className="font-medium">{collection.title}</div>
          <div className="card-badge">Sadece Davetiye</div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label={`${collection.title} detay`} style={{ willChange: 'opacity' }}>
          <div className="absolute inset-0 modal-backdrop" onClick={() => closeModal()} style={{ willChange: 'opacity' }} />

          <div ref={modalRef} tabIndex={-1} className="modal-panel relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden flex flex-col focus:outline-none" style={{ willChange: 'transform' }}>
            {isSingleCollection ? (
              // Simplified NOIR SILENCE Modal - just show collection info + CTA
              <div className="w-full max-w-2xl mx-auto p-8 bg-black text-white flex flex-col text-center">
                <button onClick={() => closeModal()} aria-label="Kapat" className="absolute top-4 right-4 text-white text-2xl leading-none hover:text-mutedgold transition">✕</button>
                
                <img src={image} alt={collection.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                
                <h3 className="text-4xl font-serifEleg text-mutedgold mb-3">{collection.title}</h3>
                <p className="text-base text-gray-300 mb-2">12 Parçalık Sınırlı Koleksiyon</p>
                <p className="text-sm text-gray-400 mb-8">Her parça ustalık ve malzeme seçiminin bir sonucudur. Siyahın yumuşak tonları, minimal kesimler ve bilinçli tasarım.</p>
                
                <div className="flex gap-3 justify-center">
                  <a href="/appointment" className="inline-block bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition">Başvur</a>
                  <button onClick={() => {
                    closeModal()
                    router.push('/products')
                  }} className="inline-block bg-mutedgold text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-mutedgold/90 transition">12 Parçayı Keşfet</button>
                </div>
              </div>
            ) : (
              // Original modal for other collections
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-6 overflow-hidden">
                  <img src={main} alt={collection.title} className="modal-main-img max-h-[72vh] w-full object-cover rounded" />
                </div>

                <div className="w-full md:w-1/3 p-6 bg-gradient-to-t from-black/70 to-transparent text-white flex flex-col relative">
                  <h3 className="text-2xl font-serifEleg text-mutedgold">{collection.title}</h3>
                  <p className="mt-3 text-sm text-gray-200">{collection.desc}</p>

                  <div className="mt-6 flex gap-3 md:flex-col">
                    {thumbs.map((t, i) => (
                      <button key={i} onMouseEnter={() => setMain(t)} onClick={() => setMain(t)} className="modal-thumb focus-visible:outline-2 focus-visible:outline-mutedgold focus-visible:outline-offset-2" aria-label={`Görsel ${i + 1}`}>
                        <img src={t} alt={`thumb-${i}`} />
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a href="/appointment" className="inline-block bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition focus-visible:outline-2 focus-visible:outline-offset-2">Başvur</a>
                    <button onClick={goToStory} className="inline-block bg-transparent border border-mutedgold text-mutedgold px-5 py-2 rounded-full text-sm font-medium hover:bg-mutedgold/10 transition focus-visible:outline-2 focus-visible:outline-mutedgold focus-visible:outline-offset-2">Hikayeyi Keşfet</button>
                  </div>

                  <button onClick={() => closeModal()} aria-label="Kapat" className="absolute top-4 right-4 text-white text-2xl leading-none focus-visible:outline-2 focus-visible:outline-mutedgold hover:text-mutedgold transition">✕</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
