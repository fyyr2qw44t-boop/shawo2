export default function Contact(){
  const showrooms = [
    {
      name: "İzmir Showroom",
      address: "Konak, İzmir, Türkiye",
      hours: "Pazartesi – Cuma, 12:00 – 18:00",
      phone: "+90 (555) 555-5555",
      email: "info@shawosuede.com",
      accessNote: "Davetiye ile erişim"
    },
    {
      name: "Alaçatı Showroom",
      address: "Yakında.",
      hours: "...",
      phone: "+90 (555) 555-5555",
      email: "info@shawosuede.com",
      accessNote: "Davetiye ile erişim"
    }
  ]

  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com/shawosuede", handle: "@shawosuede" },
    { name: "Email", url: "mailto:info@shawosuede.com", handle: "info@shawosuede.com" }
  ]

  return (
    <section className="container py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-mutedgold mb-4">İletişim</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            SHAWO SUEDE ile bağlantı kurun. Davetiye talepleri için <a href="/appointment" className="text-mutedgold hover:underline font-medium">randevu talep</a> sayfasını ziyaret edin.
          </p>
        </div>

        {/* Showrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {showrooms.map((showroom, idx) => (
            <div key={idx} className="p-8 rounded-lg border-2 border-mutedgold/20 bg-gradient-to-br from-white/50 via-white/30 to-mutedgold/5 backdrop-blur-sm hover:border-mutedgold/40 transition">
              <h3 className="text-2xl font-heading text-mutedgold mb-6">{showroom.name}</h3>
              
              <div className="space-y-4 text-sm text-gray-700">
                {/* Address */}
                <div className="pb-4 border-b border-mutedgold/10">
                  <p className="text-xs font-medium text-mutedgold/70 uppercase tracking-wider mb-2">Adres</p>
                  <p className="leading-relaxed">{showroom.address}</p>
                </div>

                {/* Hours */}
                <div className="pb-4 border-b border-mutedgold/10">
                  <p className="text-xs font-medium text-mutedgold/70 uppercase tracking-wider mb-2">Çalışma Saatleri</p>
                  <p className="leading-relaxed">{showroom.hours}</p>
                </div>

                {/* Access */}
                <div className="pb-4 border-b border-mutedgold/10">
                  <p className="text-xs font-medium text-mutedgold/70 uppercase tracking-wider mb-2">Giriş</p>
                  <p className="leading-relaxed text-mutedgold font-medium">{showroom.accessNote}</p>
                </div>

                {/* Phone */}
                <div className="pb-4 border-b border-mutedgold/10">
                  <p className="text-xs font-medium text-mutedgold/70 uppercase tracking-wider mb-2">Telefon</p>
                  <a href={`tel:${showroom.phone}`} className="text-mutedgold hover:underline font-medium">
                    {showroom.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs font-medium text-mutedgold/70 uppercase tracking-wider mb-2">E-posta</p>
                  <a href={`mailto:${showroom.email}`} className="text-mutedgold hover:underline font-medium">
                    {showroom.email}
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <a 
                href="/appointment" 
                className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-mutedgold to-mutedgold/90 text-black font-medium rounded-lg hover:shadow-lg hover:from-mutedgold hover:to-mutedgold/80 transition-all focus:outline-none focus:ring-2 focus:ring-mutedgold/50"
              >
                Randevu Talep Et
              </a>
            </div>
          ))}
        </div>

        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading text-mutedgold mb-8 text-center">Sosyal Medya & İletişim</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-lg border-2 border-mutedgold/20 bg-mutedgold/5 hover:border-mutedgold/50 hover:bg-mutedgold/10 transition text-center group"
              >
                <h3 className="text-lg font-heading text-mutedgold mb-2 group-hover:text-mutedgold/80 transition">{link.name}</h3>
                <p className="text-sm text-gray-700 group-hover:text-gray-900 transition font-medium">{link.handle}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ / Info Section */}
        <div className="bg-mutedgold/5 border-2 border-mutedgold/20 rounded-lg p-8">
          <h2 className="text-2xl font-heading text-mutedgold mb-6">Sıkça Sorulan Sorular</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-mutedgold mb-2">Nasıl davetiye alabilirim?</h3>
              <p className="text-sm text-gray-700">Davetiye talep etmek için <a href="/appointment" className="text-mutedgold hover:underline">randevu talep</a> sayfasından başvuru yapınız. Size kısa süre içinde dönüş sağlanacak.</p>
            </div>

            <div>
              <h3 className="font-medium text-mutedgold mb-2">Showroom ziyareti ne kadar sürer?</h3>
              <p className="text-sm text-gray-700">Birebir deneyim yaklaşık 45-60 dakika sürmektedir. Koleksiyonları keşfetmek, ürün hakkında detaylı bilgi almak ve kişisel öneriler almak için yeterli zaman ayrılır.</p>
            </div>

            <div>
              <h3 className="font-medium text-mutedgold mb-2">Çevrimiçi satış yapıyor musunuz?</h3>
              <p className="text-sm text-gray-700">Shawo ürünleri yalnızca birebir deneyim ve davetiye ile sunulmaktadır. Çevrimiçi satış bulunmamaktadır. Detaylar için <a href="https://instagram.com/shawosuede" target="_blank" rel="noopener noreferrer" className="text-mutedgold hover:underline">Instagram</a>'ımız takip edin.</p>
            </div>

            <div>
              <h3 className="font-medium text-mutedgold mb-2">Kişiselleştirilmiş ürün siparişi verebilir miyim?</h3>
              <p className="text-sm text-gray-700">Evet, davetiye ile showroomda ziyaret ettiğinizde kişiselleştirilmiş tasarımlar ve özel siparişler hakkında bilgi alabilirsiniz. Showroom ziyaretiniz sırasında ayrıntılar tartışılır.</p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 pt-8 border-t border-mutedgold/10 text-center">
          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            <strong className="text-mutedgold">Gizlilik:</strong> Tarafınızdan sağlanan tüm iletişim bilgileri tamamen gizli tutulur. Daha fazla bilgi için <a href="/gizlilik-politikasi" className="text-mutedgold hover:underline">gizlilik politikasını</a> ziyaret edin.
          </p>
        </div>
      </div>
    </section>
  )
}
