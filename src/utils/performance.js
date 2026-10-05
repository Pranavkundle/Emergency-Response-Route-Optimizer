/**
 * Measure synchronous algorithm execution time (excludes UI animation).
 */
export function measure(fn) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  return {
    result,
    executionTimeMs: end - start,
  }
}
