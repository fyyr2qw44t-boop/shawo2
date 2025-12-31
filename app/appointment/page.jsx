import AppointmentForm from '../../components/AppointmentForm'

export default function Appointment(){
  return (
    <section className="container py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-mutedgold mb-4">Birebir Deneyim</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Shawo'nun özel showroomunda, sessiz ve kişisel bir deneyim için randevu alın. Lütfen kısa bir mesaj bırakın; size dönüş sağlayacağız.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Card */}
            <div className="p-6 rounded-lg border-2 border-mutedgold/20 bg-mutedgold/5 hover:border-mutedgold/40 transition">
              <h3 className="text-sm font-medium text-mutedgold mb-2 uppercase tracking-wider">Lokasyon</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                İzmir, Türkiye
              </p>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-lg border-2 border-mutedgold/20 bg-mutedgold/5 hover:border-mutedgold/40 transition">
              <h3 className="text-sm font-medium text-mutedgold mb-2 uppercase tracking-wider">Çalışma Saatleri</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Pazartesi – Cuma<br/>12:00 – 18:00<br/>
                <span className="text-xs text-mutedgold/70">Randevu ile</span>
              </p>
            </div>

            {/* Note Card */}
            <div className="p-6 rounded-lg border-2 border-mutedgold/20 bg-mutedgold/5 hover:border-mutedgold/40 transition">
              <h3 className="text-sm font-medium text-mutedgold mb-2 uppercase tracking-wider">İhtiyaç</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Tüm ziyaretler <strong>davetiye</strong> ile gerçekleştirilir. Lütfen erişim için başvuru yapınız.
              </p>
            </div>

            {/* Contact Card */}
            <div className="p-6 rounded-lg border-2 border-mutedgold/20 bg-mutedgold/5 hover:border-mutedgold/40 transition">
              <h3 className="text-sm font-medium text-mutedgold mb-3 uppercase tracking-wider">İletişim</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <a href="mailto:info@shawosuede.com" className="text-mutedgold hover:underline">info@shawosuede.com</a>
                </p>
                <p>
                  <a href="https://instagram.com/shawosuede" target="_blank" rel="noopener noreferrer" className="text-mutedgold hover:underline">@shawosuede</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-lg border-2 border-mutedgold/20 bg-gradient-to-br from-white/50 via-white/30 to-mutedgold/5 backdrop-blur-sm">
              <h2 className="text-2xl font-heading text-mutedgold mb-6">Randevu Talep Edin</h2>
              <AppointmentForm />
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-16 pt-12 border-t border-mutedgold/10 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-mutedgold">Gizlilik:</strong> Tarafınızdan sağlanan bilgiler tamamen gizli tutulur ve yalnızca randevu işlemleri için kullanılır. Daha fazla bilgi için <a href="/gizlilik-politikasi" className="text-mutedgold hover:underline">gizlilik politikasını</a> ziyaret edin.
          </p>
        </div>
      </div>
    </section>
  )
}
