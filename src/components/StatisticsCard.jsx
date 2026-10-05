export default function StatisticsCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-[#a1a1a6]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[#f5f5f7]">
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-[#a1a1a6]">{sub}</p> : null}
    </div>
  )
}
