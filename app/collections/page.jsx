import CollectionCard from '../../components/CollectionCard'

export default function Collections(){
  const images = [
    'https://i.hizliresim.com/p44qrln.png',
    'https://i.hizliresim.com/tngeyms.png',
    'https://i.hizliresim.com/p59h5zl.png',
  ]

  // Tek koleksiyon: Noir Silence — sayfada bu koleksiyonun detayına yönlendiriyoruz
  const collections = [
    { title: 'NOIR SILENCE', desc: 'Noir Silence koleksiyonumuza göz atın' }
  ]

  return (
    <section className="container py-20">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-heading text-mutedgold mb-3 section-title">Koleksiyonlar</h1>
        <p className="muted">Her koleksiyon bir anlatıdır — detayları görmek için davetiye ile iletişime geçin.</p>
      </div>

      <div className="stories-grid">
        {collections.map((c, idx) => (
          <CollectionCard key={idx} collection={c} image={images[idx % images.length]} />
        ))}
      </div>
    </section>
  )
}
