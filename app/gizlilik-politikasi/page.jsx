export default function Privacy(){
  return (
    <section className="container py-20">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-heading text-mutedgold mb-4 section-title">Gizlilik Politikası</h1>
        <p className="muted">Kişisel verilerinizin işlenmesine ilişkin temel ilkeler ve kullanım amaçları.</p>
      </div>

      <div className="max-w-4xl mx-auto prose text-gray-700 legal-panel">
        <h2>1. Veri Sorumlusu</h2>
        <p>SHAWO SUEDE, kişisel verilerinizin güvenliği ve mahremiyetine azami özeni gösterir. Bu politika, hangi verilerin toplandığını, bunların hangi amaçlarla kullanıldığını ve haklarınızı açık bir şekilde sunar.</p>

        <h2>2. Toplanan Veriler</h2>
        <p>İletişim formlarından sağladığınız ad-soyad, e-posta ve telefon bilgileri; randevu talepleri, hizmet tercihleri ve teknik kullanım verileri (tarayıcı, IP, erişim zamanları) gibi bilgiler toplanabilir. Kullanım verileri anonimleştirilerek analiz amaçlı değerlendirilebilir.</p>

        <h2>3. İşleme Amaçları</h2>
        <p>Verileriniz, taleplerinizi yerine getirmek, müşteri deneyimini kişiselleştirmek, hizmet kalitesini iyileştirmek ve yasal zorunlulukları yerine getirmek için işlenir. Pazarlama amaçlı kullanımlar yalnızca açık rızanıza dayanır.</p>

        <h2>4. Haklarınız ve İletişim</h2>
        <p>Erişim, düzeltme, silme, işleme itiraz gibi hak taleplerinizi bize iletebilirsiniz. Talepleriniz şeffaf ve zamanında değerlendirilir; lütfen <a href="/contact" className="underline">İletişim</a> sayfamızdan başvuruda bulunun.</p>

        <p className="muted text-sm mt-6">Not: Bu içerik bilgilendirme amaçlıdır; yasal metinlerinizin son onayı için hukuk departmanınızla koordinasyon gereklidir.</p>
      </div>
    </section>
  )
}
