/**
 * Utility functions for consistent monetary calculations across the app.
 * All functions handle string decimal values (as stored in database) and return strings.
 */

/**
 * Subtracts one monetary amount from another
 * 
 * @param minuend - The amount to subtract from (string decimal)
 * @param subtrahend - The amount to subtract (string decimal)  
 * @returns The difference as a string decimal with 2 decimal places
 */
export function subtractMoney(minuend: string, subtrahend: string): string {
  const result = parseFloat(minuend) - parseFloat(subtrahend);
  return result.toFixed(2);
}

/**
 * Adds two monetary amounts together
 * 
 * @param a - First amount (string decimal)
 * @param b - Second amount (string decimal)
 * @returns The sum as a string decimal with 2 decimal places
 */
export function addMoney(a: string, b: string): string {
  const result = parseFloat(a) + parseFloat(b);
  return result.toFixed(2);
}

/**
 * Multiplies a monetary amount by a factor
 * 
 * @param amount - The monetary amount (string decimal)
 * @param factor - The multiplication factor (number)
 * @returns The product as a string decimal with 2 decimal places
 */
export function multiplyMoney(amount: string, factor: number): string {
  const result = parseFloat(amount) * factor;
  return result.toFixed(2);
}

/**
 * Divides a monetary amount by a divisor
 * 
 * @param amount - The monetary amount (string decimal)
 * @param divisor - The division factor (number)
 * @returns The quotient as a string decimal with 2 decimal places
 */
export function divideMoney(amount: string, divisor: number): string {
  if (divisor === 0) {
    throw new Error('Cannot divide by zero');
  }
  const result = parseFloat(amount) / divisor;
  return result.toFixed(2);
}