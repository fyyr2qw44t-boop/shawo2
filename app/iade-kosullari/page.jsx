export default function Returns(){
  return (
    <section className="container py-20">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-heading text-mutedgold mb-4 section-title">İade Koşulları</h1>
        <p className="muted">Ürün iade süreçleri, koşulları ve iade taleplerinin nasıl işleneceğine dair bilgiler.</p>
      </div>

      <div className="max-w-4xl mx-auto prose text-gray-700 legal-panel">
        <h2>1. İade Süresi ve Koşullar</h2>
        <p>İade talepleri, teslimat tarihinden itibaren 14 gün içinde değerlendirilebilir. Ancak ürünün orijinal ambalajı, etiketleri ve hijyen koşulları korunmalıdır; aksi hâlde iade talebiniz kısıtlanabilir.</p>

        <h2>2. Hangi Durumlarda İade Kabul Edilir?</h2>
        <p>İade yalnızca ürünün teslimat sırasında hasarlı olması veya üretim hatası içermesi durumunda tam olarak kabul edilir. Standart kullanıcı kaynaklı hasarlarda iade kabul edilmeyecektir; istisnai durumlar müşteri hizmetleri değerlendirmesiyle çözülür.</p>

        <h2>3. İade Süreci</h2>
        <p>İade talebinizi <a href="/contact" className="underline">İletişim</a> kanalları üzerinden bildiriniz. Müşteri hizmetleri iade koşullarını, adres ve kargo prosedürünü size iletecektir. Onay sonrası iade süreci hızla yürütülür.</p>

        <p className="muted text-sm mt-6">Not: Ürünlerin lüks ve özel üretim niteliği gereği iade şartlarında farklılıklar olabilir; lütfen sipariş öncesi iade koşullarını teyit ediniz.</p>
      </div>
    </section>
  )
}
