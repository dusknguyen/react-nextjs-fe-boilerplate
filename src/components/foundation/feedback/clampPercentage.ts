/** Normalizes finite numbers to the inclusive 0–100 percentage range. */ export function clampPercentage(value: number) {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}
