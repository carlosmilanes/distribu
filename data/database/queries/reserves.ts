import { db } from '../entry';
import { reserves, reserveTags, tags, uses } from '../schema';
import type {
  Reserve,
  Tag,
  Use,
} from '../../types';
import { eq, sum } from 'drizzle-orm';

/**
 * Gets all reserves for a distribu with their usage data and tags
 *
 * @param distribuId - The ID of the distribu
 * @returns Array of reserves with associated data
 */
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

/**
 * Gets the total used amount for a specific reserve
 *
 * @param reserveId - The ID of the reserve
 * @returns The total used amount for the reserve
 */
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

/**
 * Gets all tags associated with a reserve
 *
 * @param reserveId - The ID of the reserve
 * @returns Array of tags for the reserve
 */
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

/**
 * Gets all uses for a specific reserve
 *
 * @param reserveId - The ID of the reserve
 * @returns Array of uses for the reserve
 */
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

