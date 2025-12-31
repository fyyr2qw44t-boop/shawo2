import Link from 'next/link'
import OptimizedImage from './OptimizedImage'

export default function Hero(){
  return (
    <section className="relative">
      <div className="h-[60vh] md:h-[72vh] w-full overflow-hidden relative">
        <OptimizedImage src="https://i.hizliresim.com/1hz0a56.png" alt="Hero" className="w-full h-full object-cover" sizes="(min-width:1024px) 100vw, 100vw" priority={true} />
        <div className="absolute inset-0 bg-black/48" />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-2xl bg-black/60 p-8 md:p-12 text-center shadow-2xl border border-black/20">
            <h1 className="text-3xl md:text-4xl font-heading text-mutedgold"> Zamansız süet parçalar. </h1>
            <p className="mt-3 text-sm text-mutedgold/80">Sessiz lüksü tercih edenler için — erişim davetiye ile sağlanır.</p>
            <p className="mt-2 text-sm text-mutedgold/80">Sınırlı üretim.</p>
            <div className="mt-6">
              <Link href="/appointment" className="inline-block bg-mutedgold text-oxblood px-6 py-2 rounded-full text-sm font-medium hover:opacity-95 transition">Davetiye İste</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}