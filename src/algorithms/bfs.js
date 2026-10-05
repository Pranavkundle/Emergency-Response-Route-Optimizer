import {
  buildAdjacencyList,
  edgeKey,
  pathCost,
  reconstructPath,
} from '../utils/graphUtils.js'

/**
 * Breadth-First Search — finds a path with the minimum number of edges (hops).
 *
 * Time: O(V + E)
 * Space: O(V)
 *
 * BFS guarantees the shortest path in terms of edge count when all edges are
 * treated as equal. It does NOT guarantee minimum total weight on a weighted graph.
 */
export function bfs(graph, start, destination, blockedKeys = new Set()) {
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

  const visited = new Set([start])
  const parent = new Map()
  const queue = [start]
  visitedOrder.push(start)

  while (queue.length > 0) {
    const current = queue.shift()

    if (current === destination) break

    const neighbors = adjacency.get(current) ?? []
    for (const { nodeId: next } of neighbors) {
      exploredEdges.push(edgeKey(current, next))
      if (visited.has(next)) continue
      visited.add(next)
      parent.set(next, current)
      visitedOrder.push(next)
      queue.push(next)
    }
  }

  const path = reconstructPath(parent, start, destination)
  if (!path) {
    return emptyResult(visitedOrder, exploredEdges, visited.size)
  }

  const cost = pathCost(path, adjacency)

  return {
    path,
    cost,
    visitedNodes: visited.size,
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
