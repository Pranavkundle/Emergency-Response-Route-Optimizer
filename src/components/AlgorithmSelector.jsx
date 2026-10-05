import { ALGORITHM_ORDER, ALGORITHMS } from '../data/algorithmMeta.js'

export default function AlgorithmSelector({ value, onChange, disabled }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium text-[#a1a1a6]">Method</span>
      <select
        className="input-dark"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {ALGORITHM_ORDER.map((id) => (
          <option key={id} value={id} className="bg-[#1c1c1e]">
            {ALGORITHMS[id].label}
          </option>
        ))}
      </select>
    </label>
  )
}
