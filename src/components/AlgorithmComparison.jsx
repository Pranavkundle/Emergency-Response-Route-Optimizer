import { ALGORITHM_ORDER, ALGORITHMS } from '../data/algorithmMeta.js'
import { formatMs } from '../utils/graphUtils.js'
import Card from './ui/Card.jsx'

export default function AlgorithmComparison({ comparisonResults }) {
  if (!comparisonResults || comparisonResults.length === 0) return null

  const maxVisited = Math.max(
    ...comparisonResults.map((r) => r.visitedNodes ?? 0),
    1,
  )

  return (
    <Card title="Algorithm Comparison">
      <p className="mt-1 text-xs text-[#a1a1a6]">
        Same start and destination; metrics are measured live. Performance
        depends on graph structure and heuristic quality.
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-black/20 text-xs uppercase tracking-wide text-[#a1a1a6]">
              <th className="px-3 py-2">Algorithm</th>
              <th className="px-3 py-2">Path cost</th>
              <th className="px-3 py-2">Nodes visited</th>
              <th className="px-3 py-2">Execution time</th>
              <th className="px-3 py-2">Suitable for</th>
            </tr>
          </thead>
          <tbody>
            {comparisonResults.map((row) => {
              const meta = ALGORITHMS[row.id]
              return (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-3 py-2 font-medium text-[#f5f5f7]">
                    {meta.label}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-[#a1a1a6]">
                    {row.found ? row.cost : 'No path'}
                  </td>
                  <td className="px-3 py-2 tabular-nums text-[#a1a1a6]">
                    {row.visitedNodes ?? '—'}
                  </td>
                  <td className="px-3 py-2 text-[#a1a1a6]">
                    {formatMs(row.executionTime)}
                  </td>
                  <td className="px-3 py-2 text-xs text-[#a1a1a6]">
                    {meta.suitableFor}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-[#a1a1a6]">Nodes visited</p>
        <div className="mt-3 space-y-3">
          {comparisonResults.map((row) => {
            const meta = ALGORITHMS[row.id]
            const width = ((row.visitedNodes ?? 0) / maxVisited) * 100
            return (
              <div key={row.id} className="flex items-center gap-3 text-xs">
                <span className="w-20 shrink-0 text-[#a1a1a6]">
                  {meta.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#0a84ff] to-[#5ac8fa] transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="w-8 text-right tabular-nums text-[#f5f5f7]">
                  {row.visitedNodes ?? '—'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase text-[#a1a1a6]">
              <th className="px-3 py-2">Algorithm</th>
              <th className="px-3 py-2">Time complexity</th>
              <th className="px-3 py-2">Space complexity</th>
            </tr>
          </thead>
          <tbody>
            {ALGORITHM_ORDER.map((id) => (
              <tr key={id} className="border-b border-white/5">
                <td className="px-3 py-2 font-medium text-[#f5f5f7]">
                  {ALGORITHMS[id].label}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-[#a1a1a6]">
                  {ALGORITHMS[id].timeComplexity}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-[#a1a1a6]">
                  {ALGORITHMS[id].spaceComplexity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
