import Card from './ui/Card.jsx'

export default function Legend() {
  const nodeItems = [
    { color: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]', label: 'Start' },
    { color: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.5)]', label: 'Destination' },
    { color: 'bg-amber-400', label: 'Visited' },
    { color: 'bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.6)]', label: 'Current' },
    { color: 'bg-[#0a84ff] shadow-[0_0_12px_rgba(10,132,255,0.6)]', label: 'Final route' },
    { color: 'bg-zinc-500', label: 'Normal node' },
  ]

  const edgeItems = [
    { style: 'bg-white/30', label: 'Open road' },
    { style: 'bg-white/15', label: 'Explored', dashed: true },
    { style: 'bg-[#0a84ff]', label: 'Final route', thick: true },
    { style: 'bg-rose-400', label: 'Blocked', dashed: true },
  ]

  return (
    <Card title="Legend">
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-[#a1a1a6]">Nodes</p>
          <ul className="mt-2 space-y-2">
            {nodeItems.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-xs text-[#f5f5f7]">
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${item.color}`}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-[#a1a1a6]">Roads</p>
          <ul className="mt-2 space-y-2">
            {edgeItems.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-xs text-[#f5f5f7]">
                <span
                  className={`h-0.5 w-6 shrink-0 ${item.style} ${item.dashed ? 'opacity-60' : ''} ${item.thick ? 'h-1' : ''}`}
                />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
