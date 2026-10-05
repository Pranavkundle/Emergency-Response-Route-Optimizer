import { describe, expect, it } from 'vitest'
import { aStar } from './astar.js'
import { bfs } from './bfs.js'
import { dijkstra } from './dijkstra.js'
import { testEdges, testNodes } from '../data/testGraph.js'
import { edgeKey } from '../utils/graphUtils.js'

const graph = { nodes: testNodes, edges: testEdges }

describe('pathfinding algorithms', () => {
  it('finds a normal multi-hop route', () => {
    const d = dijkstra(graph, 'A', 'F', new Set())
    expect(d.found).toBe(true)
    expect(d.cost).toBe(4)
    expect(d.path).toEqual(['A', 'D', 'E', 'C', 'F'])
  })

  it('finds a direct single-edge route', () => {
    const d = dijkstra(graph, 'A', 'B', new Set())
    expect(d.found).toBe(true)
    expect(d.cost).toBe(1)
    expect(d.path).toEqual(['A', 'B'])
  })

  it('requires multiple edges', () => {
    const b = bfs(graph, 'A', 'F', new Set())
    expect(b.found).toBe(true)
    expect(b.path.length).toBeGreaterThan(2)
  })

  it('uses alternate route when road is blocked', () => {
    const blocked = new Set([edgeKey('E', 'C')])
    const d = dijkstra(graph, 'A', 'C', blocked)
    expect(d.found).toBe(true)
    expect(d.path).toEqual(['A', 'B', 'F', 'C'])
    expect(d.cost).toBe(12)
  })

  it('reports no route when graph is cut', () => {
    const blocked = new Set([
      edgeKey('A', 'B'),
      edgeKey('A', 'D'),
      edgeKey('B', 'C'),
      edgeKey('B', 'F'),
      edgeKey('C', 'F'),
      edgeKey('E', 'C'),
      edgeKey('D', 'E'),
    ])
    const d = dijkstra(graph, 'A', 'C', blocked)
    expect(d.found).toBe(false)
    expect(d.path).toBeNull()
  })

  it('handles start equals destination', () => {
    for (const run of [bfs, dijkstra, aStar]) {
      const r = run(graph, 'A', 'A', new Set())
      expect(r.found).toBe(true)
      expect(r.path).toEqual(['A'])
      expect(r.cost).toBe(0)
      expect(r.visitedNodes).toBe(1)
    }
  })

  it('BFS may differ from Dijkstra on weighted graph', () => {
    const b = bfs(graph, 'A', 'C', new Set())
    const d = dijkstra(graph, 'A', 'C', new Set())
    expect(b.found).toBe(true)
    expect(d.found).toBe(true)
    expect(b.path).toEqual(['A', 'B', 'C'])
    expect(b.cost).toBe(101)
    expect(d.cost).toBe(3)
    expect(d.path).toEqual(['A', 'D', 'E', 'C'])
  })

  it('A* matches Dijkstra cost on test graph', () => {
    const d = dijkstra(graph, 'A', 'F', new Set())
    const a = aStar(graph, 'A', 'F', new Set())
    expect(a.cost).toBe(d.cost)
    expect(a.found).toBe(true)
    expect(a.path).toEqual(d.path)
  })
})
