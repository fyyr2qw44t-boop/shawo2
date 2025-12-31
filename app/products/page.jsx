'use client'

import { useState, useEffect } from 'react'
import OptimizedImage from '../../components/OptimizedImage'

export default function Products(){
  const [activeCollection, setActiveCollection] = useState(null)
  const [activeProduct, setActiveProduct] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const images = [
    'https://i.hizliresim.com/p44qrln.png',
    'https://i.hizliresim.com/tngeyms.png',
    'https://i.hizliresim.com/p59h5zl.png',
  ]

  const stories = [
    { title: 'ORIGIN', story: 'Her şeyin başladığı yer. İlk dokunuş, ilk kesim, ilk sessizlik. Origin, süetin en saf haliyle zamansız bir formda buluştuğu koleksiyondur. Gösteriş yoktur, sadece kalite vardır.' },
    { title: 'NOIR SOFT', story: 'Siyahın en yumuşak tonu. Işığı emen ama sertleşmeyen bir karakter. Noir Soft, güçlü ama bağırmayan kadınlar için tasarlandı.' },
    { title: 'SILENCE', story: 'Bu koleksiyon konuşmaz. Bakıldığında hissedilir. Minimal çizgiler, uzun ömürlü formlar ve bilinçli bir sadelik. Silence, gürültüden uzak duranlar içindir.' },
    { title: 'ÉLAN', story: 'Zarafetin doğal hâli. Çabasız bir şıklık, kontrollü bir akış. Élan, hareket ederken bile sakin kalan bir duruşu temsil eder.' },
    { title: 'RAW SUEDE', story: 'İşlenmiş ama ruhu korunmuş. Hamlığını kaybetmeyen süet yüzeyler, net kesimler. Raw Suede, malzemenin kendisini ön plana çıkarır.' },
    { title: 'CALMA', story: 'Yavaşlamayı bilenler için. Yumuşak renkler, rahat kalıplar ve dingin bir enerji. Calma, acele etmeyen bir yaşam tarzının ifadesidir.' },
    { title: 'ARCHIVE 01', story: 'Geçmişten ilham alan ama bugüne ait. Markanın zamansız çizgilerinin arşivlenmiş yorumu. Archive 01, Shawo’nun hafızasıdır.' },
    { title: 'DUST & LIGHT', story: 'Toprak tonlarıyla yumuşak ışığın buluşması. Doğal renk paleti, dengeli formlar. Dış dünyayla uyumlu ama içe dönük bir koleksiyon.' },
    { title: 'FORME', story: 'Kesimin ön planda olduğu bir anlatı. Her dikişin, her çizginin bir amacı var. Forme, yapısal zarafeti temsil eder.' },
    { title: 'AFTER HOURS', story: 'Günün bittiği, karakterin ortaya çıktığı anlar. Daha yumuşak, daha kişisel bir şıklık. After Hours, sessiz akşamlar için tasarlandı.' },
    { title: 'NATURAL ORDER', story: 'Her şey olması gerektiği gibi. Doğal tonlar, dengeli hacimler, zamansız silüetler. Natural Order, karmaşaya karşı bilinçli bir duruştur.' },
    { title: 'LIMITED ESSENCE', story: 'Az sayıda, bilinçli üretim. Her parça bir kararın sonucu. Limited Essence, Shawo’nun “fazlalık yok” felsefesinin özüdür.' },
  ]

  const slugify = (t) =>
    t
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/(^-|-$)/g, '')

  // Collections with products
  const collections = [
    {
      id: 'noir-silence',
      title: 'NOIR SILENCE',
      desc: '12 parçalık sınırlı koleksiyon',
      products: Array.from({ length: 12 }).map((_, i) => ({
        id: `piece-${i + 1}`,
        title: `No. ${String(i + 1).padStart(2, '0')}`,
        story: `Noir Silence koleksiyonundan parça ${i + 1}. Her parça ustalık ve malzeme seçiminin bir sonucudur. Siyahın yumuşak ve hassas tonları, minimal kesimler ve bilinçli tasarım bu parçanın özüdür. Zamansız bir form, uzun ömürlü bir yatırım.`
      }))
    }
  ]

  // URL hash handling: allow deep linking from the homepage carousel
  // Supported hash formats:
  //  - #noir-silence            => opens collection view
  //  - #noir-silence-piece-3    => opens collection and specific product (piece-3)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.location.hash.replace('#', '')
    if (!raw) return

    // Supported hash formats:
    // - noir-silence
    // - noir-silence-piece-3
    // - noir-silence-no-03  (legacy / other components may use this)
    // - noir-silence-no01
    const piecePatterns = [
      /^(?<col>.+)-piece-(?<idx>\d+)$/i,
      /^(?<col>.+)-no-(?<idx>\d{1,2})$/i,
      /^(?<col>.+)-no(?<idx>\d{1,2})$/i
    ]

    let colId = raw
    let idx = null

    for (const pat of piecePatterns) {
      const m = raw.match(pat)
      if (m && m.groups) {
        colId = m.groups.col
        idx = parseInt(m.groups.idx, 10)
        break
      }
    }

    const collection = collections.find(c => c.id === colId)
    if (collection) {
      setActiveCollection(collection)
      if (idx !== null && !Number.isNaN(idx)) {
        const product = collection.products.find(p => p.id === `piece-${idx}`)
        if (product) {
          setActiveProduct(product)
          setSelectedImageIndex(0)
        }
      }
    }
  }, [])

  return (
    <section className="container py-24">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-heading text-mutedgold mb-4 section-title">Hikayeler</h1>
        <p className="text-gray-600 max-w-xl mx-auto">Her koleksiyon bir anlatı, her parça bir durak. Keşfetmek için bir koleksiyonu seçin.</p>
      </div>

      {!activeCollection ? (
        // Collections view
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col)}
              className="text-left cursor-pointer group bg-mutedgold/5 hover:bg-mutedgold/10 rounded-lg p-8 transition border-2 border-mutedgold/20 hover:border-mutedgold/50 focus-visible:outline-mutedgold focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <h3 className="text-2xl font-heading text-mutedgold mb-2 group-hover:text-mutedgold transition">{col.title}</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition">{col.desc}</p>
              <p className="text-xs text-mutedgold/60 group-hover:text-mutedgold mt-3 font-medium">→ Göz atın</p>
            </button>
          ))}
        </div>
      ) : !activeProduct ? (
        // Products view (12 pieces)
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setActiveCollection(null)}
            className="mb-6 text-mutedgold hover:text-black/60 text-sm font-medium transition focus-visible:outline-mutedgold focus-visible:outline-2">← Koleksiyonlara dön</button>
          <h2 className="text-3xl font-heading text-mutedgold mb-8">{activeCollection.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {activeCollection.products.map((product, idx) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product)}
                className="text-left cursor-pointer group bg-mutedgold/5 hover:bg-mutedgold/10 rounded-lg p-4 transition border-2 border-mutedgold/20 hover:border-mutedgold/50 focus-visible:outline-mutedgold focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div className="aspect-square bg-gray-300 rounded mb-3 overflow-hidden">
                  <img src={images[idx % images.length]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h4 className="font-medium text-mutedgold group-hover:text-black/70 transition text-sm">{product.title}</h4>
                <p className="text-xs text-mutedgold/60 group-hover:text-mutedgold/80 transition mt-1 font-medium">→ Hikayeyi keşfet</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Product story view
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setActiveProduct(null)}
            className="mb-6 text-mutedgold hover:text-black/60 text-sm font-medium transition focus-visible:outline-mutedgold focus-visible:outline-2">← Ürünlere dön</button>
          <div className="bg-mutedgold/5 rounded-lg p-8 border-2 border-mutedgold/20">
            <h3 className="text-3xl font-heading text-mutedgold mb-6">{activeCollection.title} — {activeProduct.title}</h3>
            
            {/* Gallery Section */}
            <div className="mb-8">
              {/* Main Image */}
              <div className="aspect-video bg-gray-300 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={images[selectedImageIndex]} 
                  alt={`${activeProduct.title} - görsel ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    onMouseEnter={() => setSelectedImageIndex(idx)}
                    className={`aspect-square w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx 
                        ? 'border-mutedgold' 
                        : 'border-mutedgold/20 hover:border-mutedgold/50'
                    }`}
                    aria-label={`Görsel ${idx + 1}`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">{activeProduct.story}</p>
            <a href="/appointment" className="inline-block bg-mutedgold text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-mutedgold/90 transition focus-visible:outline-mutedgold focus-visible:outline-2 focus-visible:outline-offset-2">Başvur</a>
          </div>
        </div>
      )}
    </section>
  )
}
