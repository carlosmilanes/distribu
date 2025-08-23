import { db } from '../entry';
import { reserves, reserveTags, tags, uses } from '../schema';
import type {
  Reserve,
  NewReserve,
  NewUse,
  Tag,
  NewTag,
} from '../../types';
import { eq } from 'drizzle-orm';

/**
 * Adds a new reserve to the database
 *
 * @param reserve - The reserve data to insert
 * @returns The result of the insert operation
 */
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

/**
 * Updates an existing reserve by ID
 *
 * @param id - The ID of the reserve to update
 * @param reserve - The updated reserve data
 * @returns The result of the update operation
 */
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

/**
 * Deletes a reserve by ID
 *
 * @param id - The ID of the reserve to delete
 * @returns The result of the delete operation
 */
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

/**
 * Adds a new use to the database
 *
 * @param use - The use data to insert
 * @param reserve - Optional reserve to associate the use with
 * @returns The result of the insert operation
 */
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

/**
 * Updates an existing use by ID
 *
 * @param id - The ID of the use to update
 * @param use - The updated use data
 * @returns The result of the update operation
 */
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

/**
 * Deletes a use by ID
 *
 * @param id - The ID of the use to delete
 * @returns The result of the delete operation
 */
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

/**
 * Adds a new tag to the database
 *
 * @param tag - The tag data to insert
 * @returns The result of the insert operation
 */
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

/**
 * Associates a tag with a reserve
 *
 * @param reserveId - The ID of the reserve
 * @param tagId - The ID of the tag to associate
 * @returns The result of the insert operation
 */
export async function addReserveTag(reserveId: number, tagId: number) {
  try {
    return await db.insert(reserveTags).values({ reserveId, tagId });
  } catch (error) {
    console.error('Failed to add reserve tag:', error);
  }
}

/**
 * Updates an existing tag by ID
 *
 * @param id - The ID of the tag to update
 * @param tag - The updated tag data
 * @returns The result of the update operation
 */
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

/**
 * Deletes a tag by ID
 *
 * @param id - The ID of the tag to delete
 * @returns The result of the delete operation
 */
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

/**
 * Removes a tag association from a reserve
 *
 * @param reserveId - The ID of the reserve
 * @param tagId - The ID of the tag to remove
 * @returns The result of the delete operation
 */
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