export function findBasicPercentage(part: number, total: number): number {
  if (total === 0) return 0; // Avoid division by zero

  const percentage = (part / total) * 100;

  if (percentage < 1 && percentage > 0) {
    return 1; // Round up to 1% for any non-zero value less than 1%
  } else if (percentage > 99 && percentage < 100) {
    return 99; // Round down to 99% for any value greater than 99% but less than 100%
  } else {
    return Math.round(percentage); // Normal rounding for all other cases
  }
}
