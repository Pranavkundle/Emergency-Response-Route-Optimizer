import { ALGORITHM_ORDER, ALGORITHMS } from '../data/algorithmMeta.js'

const RANK_LABELS = ['Fastest', 'Medium', 'Slowest']

/**
 * Rank three algorithm results by path cost (asc), then execution time (asc).
 * No-path results sort last and get rankLabel null (use "No route" in UI).
 */
export function buildRankedTripComparison(resultsById) {
  const entries = ALGORITHM_ORDER.map((id) => {
    const r = resultsById[id]
    const meta = ALGORITHMS[id]
    return {
      id,
      label: meta.label,
      found: r?.found ?? false,
      cost: r?.found ? r.cost : null,
      edges: r?.found && r.path ? r.path.length - 1 : null,
      visitedNodes: r?.visitedNodes ?? null,
      executionTime: r?.executionTime ?? null,
      rankLabel: null,
    }
  })

  const sortable = [...entries].sort((a, b) => {
    if (a.found !== b.found) return a.found ? -1 : 1
    if (!a.found) return 0
    const costDiff = (a.cost ?? Infinity) - (b.cost ?? Infinity)
    if (costDiff !== 0) return costDiff
    return (a.executionTime ?? Infinity) - (b.executionTime ?? Infinity)
  })

  let rankIndex = 0
  for (const row of sortable) {
    if (row.found && rankIndex < RANK_LABELS.length) {
      row.rankLabel = RANK_LABELS[rankIndex]
      rankIndex += 1
    }
  }

  const byId = new Map(entries.map((e) => [e.id, e]))
  const rows = ALGORITHM_ORDER.map((id) => byId.get(id))

  const winners = sortable.filter((r) => r.found && r.rankLabel === 'Fastest')
  const minCost = winners[0]?.cost ?? null
  const winnerLabel =
    winners.length > 1
      ? winners.map((w) => w.label).join(' & ')
      : winners[0]?.label ?? null

  return { rows, winnerLabel, minCost, anyFound: sortable.some((r) => r.found) }
}
