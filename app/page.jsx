import Link from 'next/link'
import Hero from '../components/Hero'
import OptimizedImage from '../components/OptimizedImage'
import CollectionStrip from '../components/CollectionStrip'
export default function Home(){
  return (
    <section>
      <Hero />

      <section className="max-w-4xl mx-auto py-12 px-6 text-center">
        <p className="text-sm text-mutedgold/90 leading-relaxed">SHAWO SUEDE, zamansız ve özenle üretilmiş sınırlı sayıda süet parçalar sunar. Hikaye ön planda; erişim davetiye ile verilir.</p>
      </section>

      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-heading text-mutedgold">Noir Silence koleksiyonumuza göz atın</h3>
          <a href="/collections" className="text-sm muted hover:underline">Tüm koleksiyonlara git →</a>
        </div>

        <div>
          {/* client carousel */}
          <CollectionStrip />
        </div>
      </section>
    </section>
  )
}
