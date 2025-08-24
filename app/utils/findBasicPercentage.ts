/**
 * Calculates what percentage the part represents of the total, with smart rounding
 * 
 * Applies special rounding logic:
 * - Values < 1% but > 0% round up to 1%
 * - Values > 99% but < 100% round down to 99%
 * - All other values use normal rounding
 * 
 * @param part - The part value as a decimal string (e.g., "25.50")
 * @param total - The total value as a decimal string (e.g., "100.00")
 * @returns Percentage as a rounded number suitable for UI display
 */
export function findBasicPercentage(part: string, total: string): number {
  const partNum = parseFloat(part);
  const totalNum = parseFloat(total);
  
  if (totalNum === 0) return 0; // Avoid division by zero

  const percentage = (partNum / totalNum) * 100;

  if (percentage < 1 && percentage > 0) {
    return 1; // Round up to 1% for any non-zero value less than 1%
  } else if (percentage > 99 && percentage < 100) {
    return 99; // Round down to 99% for any value greater than 99% but less than 100%
  } else {
    return Math.round(percentage); // Normal rounding for all other cases
  }
}
