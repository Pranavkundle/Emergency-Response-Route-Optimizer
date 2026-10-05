import { ALGORITHMS } from '../data/algorithmMeta.js'
import { formatMs } from '../utils/graphUtils.js'
import StatisticsCard from './StatisticsCard.jsx'
import Card from './ui/Card.jsx'

export default function ResultsPanel({
  algorithmId,
  result,
  nodeNames,
  isAnimating,
}) {
  if (!result) {
    return (
      <div className="glass-panel border-dashed p-8 text-center text-sm text-[#a1a1a6]">
        Select start and destination, then run an algorithm to see results.
      </div>
    )
  }

  const algo = ALGORITHMS[algorithmId]
  const pathNames =
    result.path?.map((id) => nodeNames.get(id) ?? id).join(' → ') ?? '—'

  return (
    <Card title="Route Result">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {isAnimating ? (
          <span className="text-xs font-medium text-violet-400">
            Animating search…
          </span>
        ) : (
          <span />
        )}
      </div>

      {!result.found ? (
        <p className="mt-4 text-sm font-medium text-rose-400" role="alert">
          {result.message ??
            'No valid route exists between the selected locations.'}
        </p>
      ) : (
        <>
          <p className="mt-2 text-xs text-[#a1a1a6]">
            Algorithm:{' '}
            <strong className="text-[#f5f5f7]">{algo?.name ?? algorithmId}</strong>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#a1a1a6]">
            <span className="font-medium text-[#f5f5f7]">Path: </span>
            {pathNames}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticsCard
              label="Path cost (distance)"
              value={result.cost ?? '—'}
            />
            <StatisticsCard
              label="Path length (edges)"
              value={
                result.path && result.path.length > 0
                  ? result.path.length - 1
                  : '—'
              }
            />
            <StatisticsCard
              label="Nodes visited"
              value={result.visitedNodes ?? '—'}
            />
            <StatisticsCard
              label="Execution time"
              value={formatMs(result.executionTime)}
            />
          </div>
        </>
      )}
    </Card>
  )
}
