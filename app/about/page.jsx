import OptimizedImage from '../../components/OptimizedImage'
import BrandLogo from '../../components/BrandLogo'

export default function About(){
  return (
    <section className="container py-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-heading text-mutedgold section-title">Sessiz Lüks</h1>
          <p className="muted mt-3"><BrandLogo /> minimal ve zamansız tasarımlarla süetin en iyi yüzünü sunar. Her parça, ustalık ve özenle hayat bulur.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <h3 className="text-xl font-medium mb-3">Zanaatkârlık</h3>
            <p className="muted">Malzeme seçimi ve el işçiliği markanın merkezinde yer alır. Küçük atölye süreçleri ve sınırlı üretimle her parça eşsizdir.</p>

            <h3 className="text-xl font-medium mt-6 mb-3">Miras</h3>
            <p className="muted">Geleneksel tekniklerden ilham alır, modern bir estetik ile yeniden yorumlanır. Hikâye, ürünün görünmeyen bir parçasıdır.</p>
          </div>

          <div className="card-lux p-6">
            <div className="about-hero-frame mb-4">
              <OptimizedImage src="https://resmim.net/cdn/2025/12/31/wBRZeq.jpg" alt="Atölye" className="w-full h-[320px] object-cover rounded-md" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <p className="text-sm about-hero-caption">Atölyemizin bir anı: el işçiliğinin sessiz ritmi, malzemenin dokunuşu ve ustalığın sabrı burada birleşir. Her parça bu sessiz emekten doğar; süreçlerimiz görünmeyeni görünür kılar.</p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-heading text-mutedgold mb-4">Değerlerimiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 glass rounded-lg">
              <h4 className="font-medium mb-2">Seçicilik</h4>
              <p className="muted text-sm">Sadece en iyi malzemeler ve en sağlam zanaatkarlar tercih edilir.</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <h4 className="font-medium mb-2">Sürdürülebilirlik</h4>
              <p className="muted text-sm">Uzun ömür ve onarılabilirlik ilk önceliğimizdir.</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <h4 className="font-medium mb-2">Gizlilik</h4>
              <p className="muted text-sm">Erişim davetiye ile sağlanır — seçkin bir deneyim sunuyoruz.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
/*
export default function About(){
  return (
    <section className="container py-20">
      <h1 className="text-3xl font-serifEleg mb-4">Sessiz Lüks</h1>
      <p className="muted mb-6">SHAWO SUEDE, zanaatkârlık ve malzeme seçiminin sessiz birleşimidir. Her parça bir hikâye anlatır.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src="/atelier1.jpg" alt="atelier" className="w-full h-64 object-cover" />
        <img src="/atelier2.jpg" alt="material" className="w-full h-64 object-cover" />
      </div>
    </section>
  )
}
*/