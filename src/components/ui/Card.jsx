export default function Card({ title, children, className = '', id }) {
  return (
    <section id={id} className={`glass-panel p-5 ${className}`}>
      {title ? (
        <h2 className="text-sm font-semibold tracking-tight text-[#f5f5f7]">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}
