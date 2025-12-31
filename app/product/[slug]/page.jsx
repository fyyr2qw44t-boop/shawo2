import Link from 'next/link'
import OptimizedImage from '../../../components/OptimizedImage'

export default function Product({ params }){
  const { slug } = params;

  const imageMap = {
    'no.01': 'https://i.hizliresim.com/p44qrln.png',
    'no.01-soft-earth': 'https://i.hizliresim.com/p44qrln.png',
    'no.02': 'https://i.hizliresim.com/tngeyms.png',
    'no.02-dusk': 'https://i.hizliresim.com/tngeyms.png',
    'no.03': 'https://i.hizliresim.com/p59h5zl.png',
    'no.03-whisper': 'https://i.hizliresim.com/p59h5zl.png',
  }

  const slugKey = String(slug || '').toLowerCase()
  const imgSrc = imageMap[slugKey] || imageMap['no.01']

  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <OptimizedImage src={imgSrc} alt={slug} className="w-full h-[680px] object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-heading text-mutedgold mb-2 flex items-center gap-3 section-title">
            No.01 — Soft Earth
          </h1>
          <h2 className="muted mb-4 text-sm text-mutedgold/80">Noir Silence koleksiyonundan</h2>
          <p className="mb-6">Bu parça, sessiz bir dil kullanarak geçmişi ve zanaatı birleştirir — kısa ve şiirsel bir hikaye burada yer alır.</p>

          <div className="text-sm muted mb-6">
            <ul>
              <li>%100 doğal süet</li>
              <li>Türkiye'de üretildi</li>
              <li>Tam astarlı</li>
            </ul>
          </div>

          <div className="mb-6 p-4 bg-black/5 rounded-lg border border-black/5 card-lux">
            <div className="text-sm text-gray-400">Teslim süresi: 4–6 hafta</div>
            <div className="mt-3 text-sm text-mutedgold/80">Erişim davetiye ile sağlanır. Ürün detayları başvuru sonrası paylaşılır.</div>

            <div className="mt-4 flex gap-3">
              <Link href="/appointment" className="inline-block bg-mutedgold text-oxblood px-5 py-2 rounded-full shadow-lux">Davetiye İste</Link>
              <Link href="/contact" className="underline muted text-sm">İletişim kur</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
