export function calculateUsage(used: unknown, total: unknown): number {
  return ((used as number) / (total as number)) * 100;
}
