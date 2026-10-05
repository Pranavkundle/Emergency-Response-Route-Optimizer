import { ALGORITHM_ORDER, ALGORITHMS } from '../data/algorithmMeta.js'
import Card from './ui/Card.jsx'

export default function AlgorithmAnalysis() {
  return (
    <Card id="algorithm-analysis" title="Algorithm Analysis">
      <div className="mt-4 space-y-6 text-sm text-[#a1a1a6]">
        <div>
          <h3 className="font-semibold text-[#f5f5f7]">BFS</h3>
          <p className="mt-1 leading-relaxed">
            Explores in increasing hop distance using a FIFO queue. Useful when
            edges are unweighted or all weights are equal. Time{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#f5f5f7]">
              O(V+E)
            </code>
            , space{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#f5f5f7]">
              O(V)
            </code>
            . Limitation: on weighted graphs it does not guarantee minimum total
            distance.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#f5f5f7]">Dijkstra</h3>
          <p className="mt-1 leading-relaxed">
            Maintains best-known distances and settles nodes in non-decreasing
            distance order using a min-heap. Correct for non-negative weights.
            Time{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#f5f5f7]">
              O((V+E) log V)
            </code>
            , space{' '}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#f5f5f7]">
              O(V)
            </code>
            .
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#f5f5f7]">A*</h3>
          <p className="mt-1 leading-relaxed">
            Uses f(n)=g(n)+h(n). g is actual cost from start; h is Euclidean
            estimate to the destination. This implementation re-opens nodes when
            a better g(n) is found if weights disagree with geometry.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/25 p-4">
          <h4 className="font-medium text-[#f5f5f7]">
            Why doesn&apos;t BFS always give the shortest distance?
          </h4>
          <p className="mt-2 leading-relaxed">
            BFS minimizes the number of edges, not the sum of weights. Run
            Compare All from Accident Site to Hospital A to see live differences.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[#a1a1a6]">
                <th className="px-3 py-2">Algorithm</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Space</th>
              </tr>
            </thead>
            <tbody>
              {ALGORITHM_ORDER.map((id) => (
                <tr key={id} className="border-b border-white/5">
                  <td className="px-3 py-2 font-medium text-[#f5f5f7]">
                    {ALGORITHMS[id].label}
                  </td>
                  <td className="px-3 py-2 font-mono text-[#a1a1a6]">
                    {ALGORITHMS[id].timeComplexity}
                  </td>
                  <td className="px-3 py-2 font-mono text-[#a1a1a6]">
                    {ALGORITHMS[id].spaceComplexity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
