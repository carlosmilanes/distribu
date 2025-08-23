import { db } from '../entry';
import { incomes, uses, reserves } from '../schema';
import type { Income, FundsData, Reserve } from '../../types';
import { eq, sum } from 'drizzle-orm';
import { getDistribuReserves } from './reserves';

/**
 * Gets comprehensive funds data for a distribu
 *
 * @param distribuId - The ID of the distribu
 * @returns Complete funds data including totals and income list
 */
export async function getDistribuFundsData(
  distribuId: number
): Promise<FundsData> {
  try {
    const [total, assigned, totalUsed, incomeRows] = await Promise.all([
      getDistribuTotalFunds(distribuId),
      getDistribuAssignedFunds(distribuId),
      getDistribuUsedFunds(distribuId),
      getDistribuIncomes(distribuId),
    ]);

    return {
      status: {
        total,
        assigned,
        used: totalUsed,
      },
      incomes: incomeRows,
    };
  } catch (error) {
    console.error('Failed to get funds data:', error);
    throw new Error(
      'Failed to get funds data: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * Gets the total funds amount for a distribu
 *
 * @param distribuId - The ID of the distribu
 * @returns The total funds amount
 */
async function getDistribuTotalFunds(distribuId: number): Promise<number> {
  const incomeRows = await getDistribuIncomes(distribuId);
  return incomeRows.reduce(
    (sum: number, income: Income) => sum + Number(income.amount),
    0
  );
}

/**
 * Gets the total assigned funds for a distribu
 *
 * @param distribuId - The ID of the distribu
 * @returns The total assigned funds amount
 */
async function getDistribuAssignedFunds(distribuId: number): Promise<number> {
  const reserveRows = await getDistribuReserves(distribuId);
  return reserveRows.reduce(
    (sum: number, reserve: Reserve) => sum + Number(reserve.amountAssigned),
    0
  );
}

/**
 * Gets all incomes for a distribu
 *
 * @param distribuId - The ID of the distribu
 * @returns Array of incomes for the distribu
 */
async function getDistribuIncomes(distribuId: number): Promise<Income[]> {
  try {
    return await db
      .select()
      .from(incomes)
      .where(eq(incomes.distribuId, distribuId));
  } catch (error) {
    console.error('Failed to get incomes:', error);
    throw new Error(
      'Failed to get incomes: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

/**
 * Gets the total used funds for a distribu
 *
 * @param distribuId - The ID of the distribu
 * @returns The total used funds amount
 */
async function getDistribuUsedFunds(distribuId: number): Promise<number> {
  try {
    const [{ totalUsed }] = await db
      .select({
        totalUsed: sum(uses.amount).mapWith(Number),
      })
      .from(uses)
      .innerJoin(reserves, eq(uses.reserveId, reserves.id))
      .where(eq(reserves.distribuId, distribuId));

    return totalUsed || 0;
  } catch (error) {
    console.error('Failed to get used funds:', error);
    throw new Error(
      'Failed to get used funds: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
