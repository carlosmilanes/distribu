import { db } from '../connection';
import { reserves, reserveTags, tags, uses } from '../schema';
import type { Reserve, NewReserve, NewUse, Tag, Use } from '../../types';
import { eq, sum } from 'drizzle-orm';

export async function addReserve(reserve: NewReserve) {
  try {
    const { id, ...rest } = reserve;
    return await db.insert(reserves).values(rest);
  } catch (error) {
    console.error('Failed to add reserve:', error);
    if (error instanceof Error && error.message.includes('unique constraint')) {
      throw new Error(`Reserve with name "${reserve.name}" already exists`);
    }
    throw new Error(
      'Failed to add reserve: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function addUse(use: NewUse, reserve?: Reserve) {
  try {
    const { id, ...rest } = use;

    // If a reserve is provided, ensure reserveId is set
    if (reserve) {
      rest.reserveId = reserve.id;
    }

    return await db.insert(uses).values(rest);
  } catch (error) {
    console.error('Failed to add use:', error);
    throw new Error(
      'Failed to add use: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function getDistribuReserves(
  distribuId: number
): Promise<Reserve[]> {
  try {
    const reserveRows = await db
      .select()
      .from(reserves)
      .where(eq(reserves.distribuId, distribuId));

    const reserveObjects = await Promise.all(
      reserveRows.map(async (reserve) => {
        const amountUsed = await getReserveUsedAmount(reserve.id);
        const tags = await getReserveTags(reserve.id);
        const uses = await getReserveUses(reserve.id);

        return {
          ...reserve,
          amountUsed,
          tags,
          uses,
        };
      })
    );

    return reserveObjects;
  } catch (error) {
    console.error(`Failed to get reserves for distribu ${distribuId}:`, error);
    throw new Error(
      'Failed to get reserves: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

async function getReserveUsedAmount(reserveId: number): Promise<number> {
  try {
    const [{ usedAmount }] = await db
      .select({
        usedAmount: sum(uses.amount).mapWith(Number),
      })
      .from(uses)
      .where(eq(uses.reserveId, reserveId));

    return usedAmount ?? 0;
  } catch (error) {
    console.error(
      `Failed to get used amount for reserve ID ${reserveId}:`,
      error
    );
    throw new Error(
      'Failed to get used amount for reserve: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

async function getReserveTags(reserveId: number): Promise<Tag[]> {
  try {
    const result = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(reserveTags)
      .innerJoin(tags, eq(reserveTags.tagId, tags.id))
      .where(eq(reserveTags.reserveId, reserveId));

    return result;
  } catch (error) {
    console.error(`Failed to get tags for reserve ${reserveId}:`, error);
    throw new Error(
      'Failed to get tags for reserve: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

async function getReserveUses(reserveId: number): Promise<Use[]> {
  try {
    const result = await db
      .select({
        id: uses.id,
        reserveId: uses.reserveId,
        amount: uses.amount,
        createdAt: uses.createdAt,
        notes: uses.notes,
      })
      .from(uses)
      .where(eq(uses.reserveId, reserveId));

    return result;
  } catch (error) {
    console.error(`Failed to get uses for reserve ${reserveId}:`, error);
    throw new Error(
      'Failed to get uses for reserve: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
