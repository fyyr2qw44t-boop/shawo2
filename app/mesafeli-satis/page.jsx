export default function DistanceSales(){
  return (
    <section className="container py-20">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-heading text-mutedgold mb-4 section-title">Satış Bilgileri</h1>
        <p className="muted">ShaWO ürünleri showroom veya randevu kanalıyla sunulur; standart çevrimiçi mesafeli satış uygulaması bulunmamaktadır.</p>
      </div>

      <div className="max-w-4xl mx-auto prose text-gray-700 legal-panel">
        <h2>1. Satış Usulü</h2>
        <p>Ürünlerimiz, showroom randevusu, özel sunum veya seçkin iş birlikleri yoluyla temin edilir. Çevrimiçi doğrudan satış yapılmamaktadır; talep ve rezervasyonlar mağaza temsilcisi aracılığıyla yürütülür.</p>

        <h2>2. Sipariş ve Rezervasyon</h2>
        <p>Rezervasyonlar, stok ve müşteri tercihlerine göre onaylanır. Rezervasyon aşamasında fiyat ve teslimat koşulları yazılı olarak teyit edilir.</p>

        <h2>3. Ödeme ve Güvence</h2>
        <p>Ödeme yöntemleri ve ön ödemeye ilişkin koşullar randevu sırasında veya teklifin teyidinde açıklanır. Nakit, banka transferi veya kartla ödeme seçenekleri sunulabilir.</p>

        <h2>4. Teslimat ve İade Politikası</h2>
        <p>Teslimat koşulları sipariş bazında belirlenir; iade koşulları için lütfen <a href="/iade-kosullari" className="underline">İade Koşulları</a> sayfamızı inceleyin. Ürünlerin özgün bakım ve hijyen gereklilikleri nedeniyle iade politikası sınırlı olabilir.</p>

        <p className="muted text-sm mt-6">Not: Bu bilgilendirme satış süreçlerimizin özeti niteliğindedir; hukuki doğruluk için son metinlerinizin hukuk departmanınca onaylanması önerilir.</p>
      </div>
    </section>
  )
}
