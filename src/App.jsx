import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AboutProject from './components/AboutProject.jsx'
import AlgorithmAnalysis from './components/AlgorithmAnalysis.jsx'
import AlgorithmComparison from './components/AlgorithmComparison.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import GraphCanvas from './components/GraphCanvas.jsx'
import Header from './components/Header.jsx'
import Legend from './components/Legend.jsx'
import TripRouteComparison from './components/TripRouteComparison.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import Button from './components/ui/Button.jsx'
import {
  ALGORITHM_ORDER,
  runAlgorithmTimed,
} from './data/algorithmMeta.js'
import {
  DEFAULT_DEST,
  DEFAULT_START,
  edges,
  nodes,
} from './data/graphData.js'
import { pathEdgeKeys } from './utils/graphUtils.js'
import { buildRankedTripComparison } from './utils/rankAlgorithms.js'

const SPEED_MS = { slow: 400, medium: 150, fast: 40 }

const graph = { nodes, edges }

export default function App() {
  const [startId, setStartId] = useState(DEFAULT_START)
  const [destId, setDestId] = useState(DEFAULT_DEST)
  const [algorithm, setAlgorithm] = useState('dijkstra')
  const [animationSpeed, setAnimationSpeed] = useState('medium')
  const [roadManagementMode, setRoadManagementMode] = useState(false)
  const [blockedKeys, setBlockedKeys] = useState(() => new Set())
  const [showAlgorithmAnalysis, setShowAlgorithmAnalysis] = useState(false)

  const [result, setResult] = useState(null)
  const [tripComparison, setTripComparison] = useState(null)
  const [comparisonResults, setComparisonResults] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const [visitedSet, setVisitedSet] = useState(() => new Set())
  const [currentNodeId, setCurrentNodeId] = useState(null)
  const [pathNodeSet, setPathNodeSet] = useState(() => new Set())
  const [pathEdgeSet, setPathEdgeSet] = useState(() => new Set())
  const [exploredEdgeSet, setExploredEdgeSet] = useState(() => new Set())

  const animTimerRef = useRef(null)
  const analysisRef = useRef(null)

  const nodeNames = useMemo(
    () => new Map(nodes.map((n) => [n.id, n.name])),
    [],
  )

  const startName = nodeNames.get(startId) ?? startId
  const destName = nodeNames.get(destId) ?? destId

  const sameNodeError = startId && destId && startId === destId

  const clearAnimation = useCallback(() => {
    if (animTimerRef.current) {
      clearInterval(animTimerRef.current)
      animTimerRef.current = null
    }
  }, [])

  const clearVisualization = useCallback(() => {
    setVisitedSet(new Set())
    setCurrentNodeId(null)
    setPathNodeSet(new Set())
    setPathEdgeSet(new Set())
    setExploredEdgeSet(new Set())
  }, [])

  useEffect(() => () => clearAnimation(), [clearAnimation])

  useEffect(() => {
    setTripComparison(null)
  }, [startId, destId, blockedKeys])

  const playAnimation = useCallback(
    (algoResult) => {
      clearAnimation()
      clearVisualization()

      if (!algoResult?.visitedOrder?.length) {
        if (algoResult?.found && algoResult.path) {
          setPathNodeSet(new Set(algoResult.path))
          setPathEdgeSet(pathEdgeKeys(algoResult.path))
        }
        setIsAnimating(false)
        setIsRunning(false)
        return
      }

      setIsAnimating(true)
      let index = 0
      const order = algoResult.visitedOrder
      const explored = algoResult.exploredEdges ?? []

      animTimerRef.current = setInterval(() => {
        if (index < order.length) {
          const id = order[index]
          setVisitedSet((prev) => new Set([...prev, id]))
          setCurrentNodeId(id)
          const edgeSlice = explored.slice(0, (index + 1) * 2)
          setExploredEdgeSet(new Set(edgeSlice))
          index += 1
        } else {
          clearAnimation()
          setCurrentNodeId(null)
          if (algoResult.found && algoResult.path) {
            setPathNodeSet(new Set(algoResult.path))
            setPathEdgeSet(pathEdgeKeys(algoResult.path))
          }
          setIsAnimating(false)
          setIsRunning(false)
        }
      }, SPEED_MS[animationSpeed] ?? 150)
    },
    [animationSpeed, clearAnimation, clearVisualization],
  )

  const handleFindRoute = () => {
    if (sameNodeError || !startId || !destId) return
    clearAnimation()
    clearVisualization()
    setComparisonResults([])
    setIsRunning(true)

    const resultsById = {}
    for (const id of ALGORITHM_ORDER) {
      resultsById[id] = runAlgorithmTimed(
        id,
        graph,
        startId,
        destId,
        blockedKeys,
      )
    }
    setTripComparison(buildRankedTripComparison(resultsById))

    const algoResult = resultsById[algorithm]
    setResult({ ...algoResult, executionTime: algoResult.executionTime })
    playAnimation(algoResult)
  }

  const handleCompareAll = () => {
    if (sameNodeError || !startId || !destId) return
    clearAnimation()
    clearVisualization()
    setResult(null)
    setIsRunning(true)

    const rows = ALGORITHM_ORDER.map((id) => {
      const r = runAlgorithmTimed(id, graph, startId, destId, blockedKeys)
      return { id, ...r }
    })
    setComparisonResults(rows)
    setIsRunning(false)
  }

  const handleReset = () => {
    clearAnimation()
    clearVisualization()
    setStartId(DEFAULT_START)
    setDestId(DEFAULT_DEST)
    setAlgorithm('dijkstra')
    setBlockedKeys(new Set())
    setRoadManagementMode(false)
    setResult(null)
    setTripComparison(null)
    setComparisonResults([])
    setIsRunning(false)
    setIsAnimating(false)
    setShowAlgorithmAnalysis(false)
  }

  const handleEdgeClick = (key) => {
    setBlockedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleAnalysis = () => {
    setShowAlgorithmAnalysis((v) => {
      const next = !v
      if (next) {
        requestAnimationFrame(() => {
          analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
      return next
    })
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <AboutProject />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ControlPanel
              nodes={nodes}
              startId={startId}
              destId={destId}
              algorithm={algorithm}
              animationSpeed={animationSpeed}
              roadManagementMode={roadManagementMode}
              isRunning={isRunning}
              sameNodeError={sameNodeError}
              onStartChange={setStartId}
              onDestChange={setDestId}
              onAlgorithmChange={setAlgorithm}
              onSpeedChange={setAnimationSpeed}
              onFindRoute={handleFindRoute}
              onCompareAll={handleCompareAll}
              onReset={handleReset}
              onToggleRoadMode={() => setRoadManagementMode((m) => !m)}
            />
          </div>
          <Legend />
        </div>

        <GraphCanvas
          nodes={nodes}
          edges={edges}
          startId={startId}
          destId={destId}
          blockedKeys={blockedKeys}
          visitedSet={visitedSet}
          currentNodeId={currentNodeId}
          pathNodeSet={pathNodeSet}
          pathEdgeSet={pathEdgeSet}
          exploredEdgeSet={exploredEdgeSet}
          roadManagementMode={roadManagementMode}
          onEdgeClick={handleEdgeClick}
        />

        <ResultsPanel
          algorithmId={algorithm}
          result={result}
          nodeNames={nodeNames}
          isAnimating={isAnimating}
        />

        <TripRouteComparison
          startName={startName}
          destName={destName}
          comparison={tripComparison}
        />

        <AlgorithmComparison comparisonResults={comparisonResults} />

        <div className="flex justify-center">
          <Button variant="secondary" onClick={toggleAnalysis}>
            {showAlgorithmAnalysis
              ? 'Hide Algorithm Analysis'
              : 'Algorithm Analysis'}
          </Button>
        </div>

        {showAlgorithmAnalysis ? (
          <div ref={analysisRef} className="panel-enter">
            <AlgorithmAnalysis />
          </div>
        ) : null}
      </main>
    </div>
  )
}
