"use client"

import React, { useState, useRef, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

export default function StoryCard({ story, image }){
  const [open, setOpen] = useState(false)
  const modalRef = useRef(null)
  const lastActive = useRef(null)

  // slug from title so we can open specific story via /products#slug
  const slug = story.title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '')

  // Open/close helpers that synchronize URL hash
  function openModal(){
    if(typeof window !== 'undefined'){
      history.replaceState(null, '', `/products#${slug}`)
    }
    setOpen(true)
  }

  function closeModal(){
    setOpen(false)
    if(typeof window !== 'undefined'){
      history.replaceState(null, '', '/products')
    }
  }

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

  // Listen to hash changes so a direct /products#slug opens the proper modal
  useEffect(() => {
    function checkHash(){
      if(typeof window === 'undefined') return
      const h = window.location.hash.replace('#','')
      if(h === slug) openModal()
      else if(open) closeModal()
    }

    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [slug])

  return (
    <>
      <article onClick={() => openModal()} className="card-item group relative cursor-pointer">
        <OptimizedImage src={image} alt={story.title} className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500" sizes="(min-width:1024px) 33vw, 100vw" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
          <div className="text-white">
            <h3 className="text-lg font-medium">{story.title}</h3>
            <p className="mt-2 text-sm text-gray-200">{story.story.split('.').slice(0,2).join('.')}.</p>
          </div>
        </div>
      </article>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label={`${story.title} detayları`}>
          <div className="absolute inset-0 story-modal-backdrop" onClick={() => closeModal()} />

          <div ref={modalRef} tabIndex={-1} className="story-modal-panel relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden focus:outline-none">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-black flex items-center justify-center p-6 overflow-hidden">
                <img src={image} alt={story.title} className="w-full h-96 object-cover object-position-cover rounded" />
              </div>

              <div className="md:w-1/2 p-8 bg-transparent text-white flex flex-col">
                <h3 className="text-2xl font-serifEleg text-mutedgold">{story.title}</h3>
                <div className="mt-4 text-sm text-gray-200 leading-relaxed">{story.story}</div>

                <div className="mt-6 flex gap-3">
                  <a href="/appointment" className="inline-block bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:opacity-90">Başvur</a>
                  <button onClick={() => closeModal()} className="inline-block bg-transparent border border-mutedgold text-mutedgold px-5 py-2 rounded-full text-sm font-medium hover:bg-mutedgold/10">Kapat</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
