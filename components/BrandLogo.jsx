export default function BrandLogo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'text-sm tracking-tight',
    md: 'text-lg md:text-2xl tracking-wide',
    lg: 'text-2xl md:text-3xl tracking-wide'
  }

  const base = `brand-logo inline-flex items-center gap-2 text-mutedgold ${sizeMap[size] || sizeMap.md}`

  return (
    <span className={`${base} ${className}`} aria-label="Shawo Suede">
      <span className="logo-shawo">shawo</span>
      <span className="logo-suede">suede</span>
    </span>
  )
}
