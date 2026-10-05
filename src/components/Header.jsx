export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,10,12,0.75)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <p className="text-xs font-medium uppercase tracking-widest text-[#0a84ff]">
          DAA Simulation
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#f5f5f7] md:text-3xl">
          Emergency Response Route Optimizer
        </h1>
      </div>
    </header>
  )
}
