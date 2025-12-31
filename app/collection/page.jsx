export default function Collection(){
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-heading">Noir Silence</h1>
      <p className="mt-3 text-gray-700">İlk Koleksiyon — 10 parçalık sınırlı bir süet koleksiyonu. Tekrar edilmeyecek.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({length:12}).map((_,i)=>(
          <article key={i} className="bg-white shadow-sm overflow-hidden">
            <div className="aspect-[4/5] bg-gray-100"></div>
            <div className="p-4">
              <div className="text-sm text-gray-800">No.0{i+1} — Soft Earth</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
