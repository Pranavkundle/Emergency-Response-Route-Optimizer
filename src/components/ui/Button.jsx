const variants = {
  primary:
    'bg-[#0a84ff] text-white hover:bg-[#409cff] shadow-lg shadow-blue-500/20 disabled:bg-white/10 disabled:text-white/30 disabled:shadow-none',
  secondary:
    'border border-white/10 bg-white/5 text-[#f5f5f7] hover:bg-white/10 disabled:opacity-40',
  ghost: 'text-[#0a84ff] hover:bg-white/5',
  danger:
    'bg-amber-500/90 text-white hover:bg-amber-400 shadow-lg shadow-amber-500/20',
}

export default function Button({
  variant = 'secondary',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed ${variants[variant] ?? variants.secondary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
