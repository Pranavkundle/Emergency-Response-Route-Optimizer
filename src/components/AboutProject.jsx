import Card from './ui/Card.jsx'

export default function AboutProject() {
  return (
    <Card title="About the Project">
      <p className="mt-2 text-sm leading-relaxed text-[#a1a1a6]">
        Emergency Response Route Optimizer is a graph-based simulation that
        demonstrates how shortest-path algorithms can determine efficient
        emergency routes through a weighted road network.
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-[#a1a1a6]">
        <li>Nodes = locations (vertices)</li>
        <li>Edges = roads between locations</li>
        <li>Weights = distance / travel time on each road</li>
        <li>Blocked edges = unavailable roads (removed during search)</li>
      </ul>
    </Card>
  )
}
