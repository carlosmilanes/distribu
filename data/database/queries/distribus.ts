import { db } from '../entry';
import { distribus, incomes, reserves, uses } from '../schema';
import { eq, sum } from 'drizzle-orm';

export async function createDistribu(name: string) {
  try {
    return await db
      .insert(distribus)
      .values({ name })
      .returning({ id: distribus.id });
  } catch (error) {
    console.error('Error creating distribu:', error);
    throw new Error(
      'Failed to create distribu: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function deleteDistribu(id: number) {
  try {
    return await db.delete(distribus).where(eq(distribus.id, id));
  } catch (error) {
    console.error('Error deleting distribu:', error);
    throw new Error(
      'Failed to delete distribu: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function getDistribus() {
  try {
    const allDistribus = await db.select().from(distribus);

    const distribusWithAmounts = await Promise.all(
      allDistribus.map(async (distribu) => {
        const [totalIncomes, totalAssigned, totalUsed] = await Promise.all([
          getDistribuTotalIncomes(distribu.id),
          getDistribuTotalAssigned(distribu.id),
          getDistribuTotalUsed(distribu.id),
        ]);

        const totalAmount = totalIncomes || 0;
        const assignedAmount = totalAssigned || 0;
        const usedAmount = totalUsed || 0;
        const availableAmount = totalAmount - assignedAmount;

        return {
          id: distribu.id,
          name: distribu.name,
          totalAmount,
          assignedAmount,
          usedAmount,
          availableAmount,
          createdAt: distribu.createdAt,
          updatedAt: distribu.updatedAt,
        };
      })
    );

    return distribusWithAmounts;
  } catch (error) {
    console.error('Error getting distribus:', error);
    throw new Error(
      'Failed to get distribus: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

async function getDistribuTotalIncomes(distribuId: number): Promise<number> {
  try {
    const [{ total }] = await db
      .select({
        total: sum(incomes.amount).mapWith(Number),
      })
      .from(incomes)
      .where(eq(incomes.distribuId, distribuId));

    return total || 0;
  } catch (error) {
    console.error('Failed to get total incomes:', error);
    return 0;
  }
}

async function getDistribuTotalAssigned(distribuId: number): Promise<number> {
  try {
    const [{ total }] = await db
      .select({
        total: sum(reserves.amountAssigned).mapWith(Number),
      })
      .from(reserves)
      .where(eq(reserves.distribuId, distribuId));

    return total || 0;
  } catch (error) {
    console.error('Failed to get total assigned:', error);
    return 0;
  }
}

async function getDistribuTotalUsed(distribuId: number): Promise<number> {
  try {
    const [{ total }] = await db
      .select({
        total: sum(uses.amount).mapWith(Number),
      })
      .from(uses)
      .innerJoin(reserves, eq(uses.reserveId, reserves.id))
      .where(eq(reserves.distribuId, distribuId));

    return total || 0;
  } catch (error) {
    console.error('Failed to get total used:', error);
    return 0;
  }
}
