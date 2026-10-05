import { useState } from 'react'
import { GRAPH_VIEWBOX } from '../data/graphData.js'
import { edgeKey } from '../utils/graphUtils.js'

export default function GraphCanvas({
  nodes,
  edges,
  startId,
  destId,
  blockedKeys,
  visitedSet,
  currentNodeId,
  pathNodeSet,
  pathEdgeSet,
  exploredEdgeSet,
  roadManagementMode,
  onEdgeClick,
}) {
  const [hoveredNodeId, setHoveredNodeId] = useState(null)
  const nodeById = new Map(nodes.map((n) => [n.id, n]))

  function nodeFill(id) {
    if (pathNodeSet?.has(id)) return '#0a84ff'
    if (id === currentNodeId) return '#a78bfa'
    if (visitedSet?.has(id)) return '#fbbf24'
    if (id === startId) return '#34d399'
    if (id === destId) return '#fb7185'
    return '#71717a'
  }

  function nodeStroke(id) {
    if (id === currentNodeId) return '#c4b5fd'
    if (pathNodeSet?.has(id)) return '#5ac8fa'
    return 'rgba(255,255,255,0.9)'
  }

  function edgeStroke(e) {
    const key = edgeKey(e.source, e.target)
    if (blockedKeys.has(key)) return '#fb7185'
    if (pathEdgeSet?.has(key)) return '#0a84ff'
    if (exploredEdgeSet?.has(key)) return 'rgba(255,255,255,0.2)'
    return 'rgba(255,255,255,0.22)'
  }

  function edgeWidth(e) {
    const key = edgeKey(e.source, e.target)
    if (pathEdgeSet?.has(key)) return 5
    if (blockedKeys.has(key)) return 3
    return 2
  }

  function midPoint(e) {
    const a = nodeById.get(e.source)
    const b = nodeById.get(e.target)
    if (!a || !b) return { x: 0, y: 0 }
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  }

  return (
    <div className="glass-panel overflow-hidden p-3">
      <svg
        viewBox={`0 0 ${GRAPH_VIEWBOX.width} ${GRAPH_VIEWBOX.height}`}
        className="h-auto w-full max-h-[520px] rounded-xl"
        role="img"
        aria-label="Simulated road network graph"
      >
        <defs>
          <pattern
            id="dotGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.06)" />
          </pattern>
          <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          width={GRAPH_VIEWBOX.width}
          height={GRAPH_VIEWBOX.height}
          fill="#0d0d0f"
          rx={12}
        />
        <rect
          width={GRAPH_VIEWBOX.width}
          height={GRAPH_VIEWBOX.height}
          fill="url(#dotGrid)"
          rx={12}
        />

        {edges.map((e) => {
          const a = nodeById.get(e.source)
          const b = nodeById.get(e.target)
          if (!a || !b) return null
          const key = edgeKey(e.source, e.target)
          const blocked = blockedKeys.has(key)
          const onRoute = pathEdgeSet?.has(key)
          const mid = midPoint(e)

          return (
            <g key={key}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="transparent"
                strokeWidth={16}
                style={{ cursor: roadManagementMode ? 'pointer' : 'default' }}
                onClick={() => roadManagementMode && onEdgeClick(key)}
              />
              {onRoute ? (
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#0a84ff"
                  strokeWidth={8}
                  strokeOpacity={0.35}
                  filter="url(#routeGlow)"
                  pointerEvents="none"
                />
              ) : null}
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={edgeStroke(e)}
                strokeWidth={edgeWidth(e)}
                strokeLinecap="round"
                strokeDasharray={
                  blocked
                    ? '6 4'
                    : exploredEdgeSet?.has(key)
                      ? '4 3'
                      : undefined
                }
                opacity={blocked ? 0.9 : 1}
                pointerEvents="none"
              />
              <rect
                x={mid.x - 10}
                y={mid.y - 14}
                width={20}
                height={14}
                rx={4}
                fill="rgba(0,0,0,0.55)"
                pointerEvents="none"
              />
              <text
                x={mid.x}
                y={mid.y - 5}
                textAnchor="middle"
                className="select-none text-[9px] font-medium fill-[#a1a1a6]"
                pointerEvents="none"
              >
                {e.weight}
              </text>
            </g>
          )
        })}

        {nodes.map((n) => {
          const isHovered = hoveredNodeId === n.id
          const isCurrent = n.id === currentNodeId
          const r = isCurrent ? 13 : isHovered ? 14 : 11

          return (
            <g
              key={n.id}
              onMouseEnter={() => setHoveredNodeId(n.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={18}
                fill="transparent"
                style={{ cursor: 'pointer' }}
              />
              {isCurrent ? (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={20}
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  className="graph-pulse-ring"
                  pointerEvents="none"
                />
              ) : null}
              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill={nodeFill(n.id)}
                stroke={nodeStroke(n.id)}
                strokeWidth={isHovered ? 2.5 : 2}
                className={`graph-node-circle ${isHovered ? 'graph-node-circle-hovered' : ''}`}
                pointerEvents="none"
              />
              <text
                x={n.x}
                y={n.y + 24}
                textAnchor="middle"
                pointerEvents="none"
                className="select-none text-[9px] font-medium fill-[rgba(245,245,247,0.85)]"
              >
                {n.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
