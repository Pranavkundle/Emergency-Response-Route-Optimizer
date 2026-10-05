import {
  MinHeap,
  buildAdjacencyList,
  edgeKey,
  euclidean,
  nodesById,
  pathCost,
  reconstructPath,
} from '../utils/graphUtils.js'

/**
 * A* search — goal-directed shortest path using f(n) = g(n) + h(n).
 *
 * g(n) = actual cost from start to n
 * h(n) = Euclidean distance estimate from n to destination (admissible; may be inconsistent with arbitrary weights, so nodes can be re-opened)
 * f(n) = g(n) + h(n)
 *
 * Time: depends on heuristic; worst case similar to Dijkstra
 * Space: O(V)
 */
export function aStar(graph, start, destination, blockedKeys = new Set()) {
  const { nodes, edges } = graph
  const nodeMap = nodesById(nodes)
  const destNode = nodeMap.get(destination)
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

  if (!adjacency.has(start) || !adjacency.has(destination) || !destNode) {
    return emptyResult()
  }

  const gScore = new Map([[start, 0]])
  const fScore = new Map([
    [start, heuristic(nodeMap.get(start), destNode)],
  ])
  const parent = new Map()
  const closed = new Set()
  const open = new MinHeap()
  open.push(fScore.get(start), start)

  while (!open.isEmpty()) {
    const entry = open.pop()
    if (!entry) break
    const { priority, item: current } = entry
    if (closed.has(current)) continue

    const currentG = gScore.get(current) ?? Infinity
    const bestF = fScore.get(current) ?? Infinity
    if (priority > bestF) continue

    closed.add(current)
    visitedOrder.push(current)

    const neighbors = adjacency.get(current) ?? []

    for (const { nodeId: next, weight } of neighbors) {
      exploredEdges.push(edgeKey(current, next))
      const tentativeG = currentG + weight
      const bestG = gScore.get(next) ?? Infinity

      if (tentativeG >= bestG) continue

      parent.set(next, current)
      gScore.set(next, tentativeG)
      const h = heuristic(nodeMap.get(next), destNode)
      const f = tentativeG + h
      fScore.set(next, f)

      // Re-open if a better path reaches an already closed node (heuristic may be inconsistent with weights).
      if (closed.has(next)) closed.delete(next)

      open.push(f, next)
    }
  }

  const path = reconstructPath(parent, start, destination)
  if (!path) {
    return emptyResult(visitedOrder, exploredEdges, closed.size)
  }

  const cost = pathCost(path, adjacency)

  return {
    path,
    cost,
    visitedNodes: closed.size,
    visitedOrder,
    exploredEdges,
    found: true,
  }
}

function heuristic(node, destNode) {
  if (!node || !destNode) return 0
  return euclidean(node, destNode)
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
