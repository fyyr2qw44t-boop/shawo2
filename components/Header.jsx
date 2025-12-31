"use client"

import { useState } from 'react'
import Link from 'next/link'
import BrandLogo from './BrandLogo'

export default function Header(){
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-oxblood/98 text-mutedgold border-b border-black/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center">
        <div className="w-1/3 flex items-center">
          <div className="flex items-center gap-4 w-full">
            <button aria-label="menu" onClick={() => setOpen(!open)} className="md:hidden p-2 rounded hover:bg-oxblood/80 transition">
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-mutedgold">
                <path d="M0 1.5H20M0 7H20M0 12.5H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="hidden md:flex items-center gap-6 text-sm ml-2">
              <Link href="/collections" className="text-mutedgold/80 hover:text-mutedgold transition">Koleksiyonlar</Link>
              <Link href="/products" className="text-mutedgold/80 hover:text-mutedgold transition">Ürünler</Link>
            </div>
          </div>
        </div>

        <div className="w-1/3 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <BrandLogo size="md" />
          </Link>
        </div>

        <div className="w-1/3 flex justify-end items-center">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/about" className="text-sm text-mutedgold/80 hover:text-mutedgold transition">Hakkımızda</Link>
            <Link href="/contact" className="text-sm text-mutedgold/80 hover:text-mutedgold transition">İletişim</Link>
            <Link href="/appointment" className="inline-flex items-center gap-2 bg-mutedgold text-oxblood px-4 py-2 rounded-full text-sm shadow-lux">Davetiye</Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-oxblood/98 border-t border-black/8">
          <nav className="px-4 py-4 flex flex-col gap-3">
            <Link href="/collections" onClick={() => setOpen(false)} className="text-mutedgold/90 py-2">Koleksiyonlar</Link>
            <Link href="/products" onClick={() => setOpen(false)} className="text-mutedgold/90 py-2">Ürünler</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-mutedgold/90 py-2">Hakkımızda</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-mutedgold/90 py-2">İletişim</Link>
            <Link href="/appointment" onClick={() => setOpen(false)} className="inline-block bg-mutedgold text-oxblood px-4 py-2 rounded-full w-max">Davetiye</Link>
          </nav>
        </div>
      )}
    </header>
  )
}