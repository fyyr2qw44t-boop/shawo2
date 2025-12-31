export default function Cart(){
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading">Sepet</h1>
      <p className="mt-4 text-gray-700">Minimal sepet özeti. Teslim süresi: 4–6 hafta.</p>

      <div className="mt-6 bg-white/5 p-6 shadow-sm border border-black/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">No.01 — Soft Earth</div>
            <div className="text-xs text-gray-500">Adet: 1</div>
          </div>
          <div className="text-sm text-mutedgold">Sadece Davetiye</div>
        </div>

        <div className="mt-6">
          <p className="text-sm muted mb-4">Satın alma süreci yalnızca davetiye ile ilerler. Davetiye almak için başvurun.</p>
          <Link href="/appointment" className="inline-block bg-mutedgold text-oxblood px-6 py-2 rounded-full">Davetiye İste</Link>
        </div>
      </div>
    </section>
  )
}
/*
export default function Cart(){
  return (
    <section className="container py-20">
      <h1 className="text-3xl font-serifEleg mb-4">Sepet</h1>
      <p className="muted mb-6">Minimal sepet. Teslim süresi: 4–6 hafta.</p>
      <div className="max-w-2xl">
        <div className="border p-4 mb-4">
          <div className="flex justify-between">
            <div>No.01 — Soft Earth</div>
            <div>€1,200</div>
          </div>
        </div>
        <button className="luxury-cta">Satın Al</button>
      </div>
    </section>
  )
}
*/