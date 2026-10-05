import { aStar } from '../algorithms/astar.js'
import { bfs } from '../algorithms/bfs.js'
import { dijkstra } from '../algorithms/dijkstra.js'
import { measure } from '../utils/performance.js'

export const ALGORITHMS = {
  bfs: {
    id: 'bfs',
    label: 'BFS',
    name: 'Breadth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    suitableFor: 'Unweighted graphs (shortest hop count)',
  },
  dijkstra: {
    id: 'dijkstra',
    label: "Dijkstra's",
    name: "Dijkstra's Algorithm",
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    suitableFor: 'Weighted graphs with non-negative edges',
  },
  astar: {
    id: 'astar',
    label: 'A*',
    name: 'A* Algorithm',
    timeComplexity: 'O((V + E) log V) typical with heap',
    spaceComplexity: 'O(V)',
    suitableFor: 'Goal-directed pathfinding with a good heuristic',
  },
}

export const ALGORITHM_ORDER = ['bfs', 'dijkstra', 'astar']

const runners = {
  bfs: bfs,
  dijkstra: dijkstra,
  astar: aStar,
}

export function runAlgorithmTimed(id, graph, start, dest, blockedKeys) {
  const fn = runners[id]
  if (!fn) return null
  const { result, executionTimeMs } = measure(() =>
    fn(graph, start, dest, blockedKeys),
  )
  return { ...result, executionTime: executionTimeMs }
}
