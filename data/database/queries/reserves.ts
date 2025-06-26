import { db } from '../access';
import { reserves, reserveTags, tags, uses } from '../schema';
import type {
  Reserve,
  NewReserve,
  NewUse,
  Tag,
  Use,
  NewTag,
} from '../../types';
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

export async function updateReserve(id: number, reserve: NewReserve) {
  try {
    return await db.update(reserves).set(reserve).where(eq(reserves.id, id));
  } catch (error) {
    console.error('Failed to update reserve:', error);
    throw new Error(
      'Failed to update reserve: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function deleteReserve(id: number) {
  try {
    return await db.delete(reserves).where(eq(reserves.id, id));
  } catch (error) {
    console.error('Failed to delete reserve:', error);
    throw new Error(
      'Failed to delete reserve: ' +
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

export async function updateUse(id: number, use: NewUse) {
  try {
    return await db.update(uses).set(use).where(eq(uses.id, id));
  } catch (error) {
    console.error('Failed to update use:', error);
    throw new Error(
      'Failed to update use: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function deleteUse(id: number) {
  try {
    return await db.delete(uses).where(eq(uses.id, id));
  } catch (error) {
    console.error('Failed to delete use:', error);
    throw new Error(
      'Failed to delete use: ' +
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

// Tags
export async function addTag(tag: NewTag) {
  try {
    return await db.insert(tags).values(tag);
  } catch (error) {
    console.error('Failed to add tag:', error);
    throw new Error(
      'Failed to add tag: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function addReserveTag(reserveId: number, tagId: number) {
  try {
    return await db.insert(reserveTags).values({ reserveId, tagId });
  } catch (error) {
    console.error('Failed to add reserve tag:', error);
  }
}

export async function updateTag(id: number, tag: NewTag) {
  try {
    return await db.update(tags).set(tag).where(eq(tags.id, id));
  } catch (error) {
    console.error('Failed to update tag:', error);
    throw new Error(
      'Failed to update tag: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function deleteTag(id: number) {
  try {
    return await db.delete(tags).where(eq(tags.id, id));
  } catch (error) {
    console.error('Failed to delete tag:', error);
    throw new Error(
      'Failed to delete tag: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function deleteReserveTag(reserveId: number, tagId: number) {
  try {
    return await db
      .delete(reserveTags)
      .where(eq(reserveTags.reserveId, reserveId));
  } catch (error) {
    console.error('Failed to delete reserve tag:', error);
    throw new Error(
      'Failed to delete reserve tag: ' +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
