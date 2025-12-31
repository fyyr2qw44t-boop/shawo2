"use client"

import React from 'react'

export default function OptimizedImage({ src, alt='', className='', sizes='100vw', priority=false, ...props }){
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'low'}
      sizes={sizes}
      {...props}
    />
  )
}