"use client"
import React from 'react';

const ShinyText = ({
  text,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0
}) => {
  const animationDuration = Math.max(0.1, speed) + 's'
  const animationDelay = (delay || 0) + 's'
  const animDirection = yoyo ? 'alternate' : 'normal'
  const dirFactor = direction === 'left' ? 'normal' : 'reverse'

  const gradient = `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`

  const style = {
    backgroundImage: gradient,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animationName: 'shiny-move',
    animationDuration,
    animationTimingFunction: 'linear',
    animationDelay,
    animationIterationCount: 'infinite',
    animationDirection: animDirection,
    animationPlayState: 'running'
  }

  const hoverClass = pauseOnHover ? 'shiny-pause-on-hover' : ''

  return (
    <span className={`shiny-text ${hoverClass} ${className}`} style={style} aria-hidden={false}>
      {text}
    </span>
  )
}

export default ShinyText;
