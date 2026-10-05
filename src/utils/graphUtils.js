/**
 * Graph utilities for the simulated emergency road network.
 */

export function edgeKey(a, b) {
  return a < b ? `${a}-${b}` : `${b}-${a}`
}

export function nodesById(nodes) {
  const map = new Map()
  for (const node of nodes) {
    map.set(node.id, node)
  }
  return map
}

export function getNode(nodesMap, id) {
  return nodesMap.get(id) ?? null
}

/**
 * Build adjacency list from edges; blocked edges are excluded.
 * Roads are bidirectional.
 */
export function buildAdjacencyList(nodes, edges, blockedKeys = new Set()) {
  const adj = new Map()
  for (const node of nodes) {
    adj.set(node.id, [])
  }

  for (const edge of edges) {
    const key = edgeKey(edge.source, edge.target)
    if (blockedKeys.has(key) || edge.blocked) continue

    const listA = adj.get(edge.source)
    const listB = adj.get(edge.target)
    if (!listA || !listB) continue

    listA.push({ nodeId: edge.target, weight: edge.weight })
    listB.push({ nodeId: edge.source, weight: edge.weight })
  }

  return adj
}

export function reconstructPath(parentMap, start, dest) {
  if (start === dest) return [start]
  if (!parentMap.has(dest)) return null

  const path = []
  let current = dest
  while (current !== undefined) {
    path.unshift(current)
    if (current === start) break
    current = parentMap.get(current)
  }

  if (path[0] !== start) return null
  return path
}

export function pathCost(path, adjacency) {
  if (!path || path.length === 0) return null
  if (path.length === 1) return 0

  let total = 0
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i]
    const to = path[i + 1]
    const neighbors = adjacency.get(from) ?? []
    const edge = neighbors.find((n) => n.nodeId === to)
    if (!edge) return null
    total += edge.weight
  }
  return total
}

export function euclidean(nodeA, nodeB) {
  const dx = nodeA.x - nodeB.x
  const dy = nodeA.y - nodeB.y
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Binary min-heap for Dijkstra and A*.
 * Lower priority value = higher priority.
 */
export class MinHeap {
  constructor() {
    this.heap = []
  }

  isEmpty() {
    return this.heap.length === 0
  }

  push(priority, item) {
    this.heap.push({ priority, item })
    this._bubbleUp(this.heap.length - 1)
  }

  pop() {
    if (this.heap.length === 0) return null
    const { priority, item } = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length > 0) {
      this.heap[0] = last
      this._bubbleDown(0)
    }
    return { priority, item }
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (this.heap[parent].priority <= this.heap[index].priority) break
      ;[this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ]
      index = parent
    }
  }

  _bubbleDown(index) {
    const length = this.heap.length
    while (true) {
      const left = 2 * index + 1
      const right = 2 * index + 2
      let smallest = index

      if (
        left < length &&
        this.heap[left].priority < this.heap[smallest].priority
      ) {
        smallest = left
      }
      if (
        right < length &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right
      }
      if (smallest === index) break
      ;[this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ]
      index = smallest
    }
  }
}

export function formatMs(ms) {
  if (ms == null || Number.isNaN(ms)) return '—'
  if (ms < 0.01) return '<0.01 ms'
  return `${ms.toFixed(2)} ms`
}

export function pathEdgeKeys(path) {
  if (!path || path.length < 2) return new Set()
  const keys = new Set()
  for (let i = 0; i < path.length - 1; i++) {
    keys.add(edgeKey(path[i], path[i + 1]))
  }
  return keys
}
