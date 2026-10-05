import {
  MinHeap,
  buildAdjacencyList,
  edgeKey,
  pathCost,
  reconstructPath,
} from '../utils/graphUtils.js'

/**
 * Dijkstra's algorithm — shortest path with non-negative edge weights.
 *
 * Binary min-heap implementation:
 * Time: O((V + E) log V)
 * Space: O(V)
 */
export function dijkstra(graph, start, destination, blockedKeys = new Set()) {
  const { nodes, edges } = graph
  const adjacency = buildAdjacencyList(nodes, edges, blockedKeys)
  const visitedOrder = []
  const exploredEdges = []

  if (start === destination) {
    return {
      path: [start],
      cost: 0,
      visitedNodes: 1,
      visitedOrder: [start],
      exploredEdges: [],
      found: true,
    }
  }

  if (!adjacency.has(start) || !adjacency.has(destination)) {
    return emptyResult()
  }

  const dist = new Map([[start, 0]])
  const parent = new Map()
  const settled = new Set()
  const heap = new MinHeap()
  heap.push(0, start)

  while (!heap.isEmpty()) {
    const entry = heap.pop()
    if (!entry) break
    const { priority, item: current } = entry
    if (settled.has(current)) continue

    const currentDist = dist.get(current) ?? Infinity
    if (priority > currentDist) continue

    settled.add(current)
    visitedOrder.push(current)

    if (current === destination) break
    const neighbors = adjacency.get(current) ?? []

    for (const { nodeId: next, weight } of neighbors) {
      exploredEdges.push(edgeKey(current, next))
      if (settled.has(next)) continue

      const alt = currentDist + weight
      if (alt < (dist.get(next) ?? Infinity)) {
        dist.set(next, alt)
        parent.set(next, current)
        heap.push(alt, next)
      }
    }
  }

  const path = reconstructPath(parent, start, destination)
  if (!path) {
    return emptyResult(visitedOrder, exploredEdges, settled.size)
  }

  const cost = pathCost(path, adjacency)

  return {
    path,
    cost,
    visitedNodes: settled.size,
    visitedOrder,
    exploredEdges,
    found: true,
  }
}

function emptyResult(visitedOrder = [], exploredEdges = [], visitedNodes = 0) {
  return {
    path: null,
    cost: null,
    visitedNodes,
    visitedOrder,
    exploredEdges,
    found: false,
    message: 'No valid route exists between the selected locations.',
  }
}
