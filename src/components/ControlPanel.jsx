import AlgorithmSelector from './AlgorithmSelector.jsx'
import Button from './ui/Button.jsx'
import Card from './ui/Card.jsx'

const SPEEDS = [
  { id: 'slow', label: 'Slow' },
  { id: 'medium', label: 'Med' },
  { id: 'fast', label: 'Fast' },
]

export default function ControlPanel({
  nodes,
  startId,
  destId,
  algorithm,
  animationSpeed,
  roadManagementMode,
  isRunning,
  sameNodeError,
  onStartChange,
  onDestChange,
  onAlgorithmChange,
  onSpeedChange,
  onFindRoute,
  onCompareAll,
  onReset,
  onToggleRoadMode,
}) {
  const canRun = startId && destId && startId !== destId && !isRunning

  return (
    <Card title="Control Panel" className="!p-4">
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-xs font-medium text-[#a1a1a6]">From</span>
          <select
            className="input-dark"
            value={startId}
            onChange={(e) => onStartChange(e.target.value)}
            disabled={isRunning}
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id} className="bg-[#1c1c1e]">
                {n.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-xs font-medium text-[#a1a1a6]">To</span>
          <select
            className="input-dark"
            value={destId}
            onChange={(e) => onDestChange(e.target.value)}
            disabled={isRunning}
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id} className="bg-[#1c1c1e]">
                {n.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <AlgorithmSelector
          value={algorithm}
          onChange={onAlgorithmChange}
          disabled={isRunning}
        />
        <div className="block text-sm">
          <span className="text-xs font-medium text-[#a1a1a6]">Speed</span>
          <div className="mt-1 flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1">
            {SPEEDS.map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={isRunning}
                onClick={() => onSpeedChange(s.id)}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-all ${
                  animationSpeed === s.id
                    ? 'bg-[#0a84ff] text-white'
                    : 'text-[#a1a1a6] hover:bg-white/5'
                } disabled:opacity-40`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {sameNodeError ? (
        <p className="mt-2 text-xs text-rose-400" role="alert">
          Start and destination must be different.
        </p>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          variant="primary"
          className="sm:flex-1"
          onClick={onFindRoute}
          disabled={!canRun}
        >
          Find Route
        </Button>
        <Button variant="secondary" onClick={onCompareAll} disabled={!canRun}>
          Compare All
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
        <Button
          variant={roadManagementMode ? 'danger' : 'ghost'}
          onClick={onToggleRoadMode}
        >
          {roadManagementMode ? 'Roads: ON' : 'Roads'}
        </Button>
      </div>
      {roadManagementMode ? (
        <p className="mt-2 text-xs text-amber-300/80">
          Click a road on the map to block or unblock.
        </p>
      ) : null}
    </Card>
  )
}
