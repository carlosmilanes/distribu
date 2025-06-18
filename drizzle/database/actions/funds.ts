import { db } from '../connection';
import { incomes, uses, reserves } from '../schema';
import type { Income, NewIncome, FundsData, Reserve } from '../../types';
import { eq, sum } from 'drizzle-orm';
import { getDistribuReserves } from './reserves';

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

async function getDistribuTotalFunds(distribuId: number): Promise<number> {
  const incomeRows = await getDistribuIncomes(distribuId);
  return incomeRows.reduce(
    (sum: number, income: Income) => sum + Number(income.amount),
    0
  );
}

async function getDistribuAssignedFunds(distribuId: number): Promise<number> {
  const reserveRows = await getDistribuReserves(distribuId);
  return reserveRows.reduce(
    (sum: number, reserve: Reserve) => sum + Number(reserve.amountAssigned),
    0
  );
}

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
