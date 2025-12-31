import ShinyText from './ShinyText'
import BrandLogo from './BrandLogo'

export default function Footer(){
  return (
    <footer className="border-t border-warmgray bg-cream mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-forest/80 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="space-x-4">
          <a href="/gizlilik-politikasi" className="hover:underline">Gizlilik Politikası</a>
          <a href="/mesafeli-satis" className="hover:underline">Mesafeli Satış Sözleşmesi</a>
          <a href="/iade-kosullari" className="hover:underline">İade Koşulları</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">© <span className="ml-1"><BrandLogo /></span></div>
          <span className="hidden md:inline-block w-px h-5 bg-forest/10 rounded mx-2" aria-hidden="true" />
          <a href="https://instagram.com/maliictnky" target="_blank" rel="noopener noreferrer" aria-label="Instagram — @maliictnky" className="footer-sig inline-flex items-baseline gap-2">
            <span className="signature-prefix text-xs uppercase tracking-widest text-forest/50">created by.</span>
            <ShinyText
              text="m.ali cetinkaya"
              speed={2}
              delay={0}
              color="#9ca3af"
              shineColor="#ffffff"
              spread={90}
              direction="left"
              yoyo={false}
              pauseOnHover={true}
              className="signature-name"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}