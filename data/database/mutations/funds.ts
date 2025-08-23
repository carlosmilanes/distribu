import { db } from '../entry';
import { incomes } from '../schema';
import type { NewIncome } from '../../types';
import { eq } from 'drizzle-orm';

/**
 * Adds a new income to the database
 *
 * @param income - The income data to insert
 * @returns The result of the insert operation
 */
export async function addIncome(income: NewIncome) {
  try {
    const { id, ...rest } = income;
    return await db.insert(incomes).values(rest);
  } catch (error) {
    console.error('Failed to add income:', error);
    throw new Error(
      'Failed to add income: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * Updates an existing income by ID
 *
 * @param id - The ID of the income to update
 * @param income - The updated income data
 * @returns The result of the update operation
 */
export async function updateIncome(id: number, income: NewIncome) {
  try {
    return await db.update(incomes).set(income).where(eq(incomes.id, id));
  } catch (error) {
    console.error('Failed to update income:', error);
    throw new Error(
      'Failed to update income: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * Deletes an income by ID
 *
 * @param id - The ID of the income to delete
 * @returns The result of the delete operation
 */
export async function deleteIncome(id: number) {
  try {
    return await db.delete(incomes).where(eq(incomes.id, id));
  } catch (error) {
    console.error('Failed to delete income:', error);
    throw new Error(
      'Failed to delete income: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}