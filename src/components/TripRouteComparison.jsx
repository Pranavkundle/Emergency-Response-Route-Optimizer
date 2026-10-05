import { formatMs } from '../utils/graphUtils.js'
import Card from './ui/Card.jsx'

function StatusBadge({ rankLabel, found }) {
  if (!found) {
    return (
      <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-xs text-rose-400">
        No route
      </span>
    )
  }
  const styles = {
    Fastest: 'bg-emerald-500/20 text-emerald-400',
    Medium: 'bg-amber-500/20 text-amber-300',
    Slowest: 'bg-rose-500/20 text-rose-300',
  }
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[rankLabel] ?? 'bg-white/10 text-[#a1a1a6]'}`}
    >
      {rankLabel ?? '—'}
    </span>
  )
}

export default function TripRouteComparison({
  startName,
  destName,
  comparison,
}) {
  const { rows, winnerLabel, minCost, anyFound } = comparison ?? {}

  return (
    <Card title="Fast response from any location">
      {!comparison ? (
        <p className="mt-2 text-sm text-[#a1a1a6]">
          Select start and destination, then click{' '}
          <strong className="text-[#f5f5f7]">Find Route</strong> to compare BFS,
          Dijkstra, and A* for this trip.
        </p>
      ) : !anyFound ? (
        <p className="mt-2 text-sm text-rose-400" role="alert">
          No valid route exists from {startName} to {destName} with current road
          blocks.
        </p>
      ) : (
        <p className="mt-2 text-sm leading-relaxed text-[#a1a1a6]">
          Ambulance from{' '}
          <strong className="text-[#f5f5f7]">{startName}</strong> to{' '}
          <strong className="text-[#0a84ff]">{destName}</strong> can reach the
          hospital. Fastest route:{' '}
          <strong className="text-emerald-400">{winnerLabel}</strong>
          {minCost != null ? (
            <span className="text-[#f5f5f7]"> (cost {minCost})</span>
          ) : null}
          .
        </p>
      )}

      {rows ? (
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black/20 text-xs uppercase tracking-wide text-[#a1a1a6]">
                <th className="px-3 py-2">Algorithm</th>
                <th className="px-3 py-2">Path cost</th>
                <th className="px-3 py-2">Edges</th>
                <th className="px-3 py-2">Nodes visited</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-3 py-2 font-medium text-[#f5f5f7]">
                    {row.label}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-[#a1a1a6]">
                    {row.found ? row.cost : '—'}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-[#a1a1a6]">
                    {row.found ? row.edges : '—'}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-[#a1a1a6]">
                    {row.visitedNodes ?? '—'}
                  </td>
                  <td className="px-3 py-2 text-[#a1a1a6]">
                    {formatMs(row.executionTime)}
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge
                      rankLabel={row.rankLabel}
                      found={row.found}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Card>
  )
}
