/** Small graph for unit tests (isolated from demo network). */

export const testNodes = [
  { id: 'A', name: 'A', x: 0, y: 0 },
  { id: 'B', name: 'B', x: 10, y: 0 },
  { id: 'C', name: 'C', x: 20, y: 0 },
  { id: 'D', name: 'D', x: 10, y: 10 },
  { id: 'E', name: 'E', x: 30, y: 10 },
  { id: 'F', name: 'F', x: 40, y: 0 },
]

export const testEdges = [
  { source: 'A', target: 'B', weight: 1, blocked: false },
  { source: 'B', target: 'C', weight: 100, blocked: false },
  { source: 'A', target: 'D', weight: 1, blocked: false },
  { source: 'D', target: 'E', weight: 1, blocked: false },
  { source: 'E', target: 'C', weight: 1, blocked: false },
  { source: 'C', target: 'F', weight: 1, blocked: false },
  { source: 'B', target: 'F', weight: 10, blocked: false },
]
