import { db } from '../entry';
import { distribus } from '../schema';
import { eq } from 'drizzle-orm';

/**
 * Creates a new distribu with the given name
 *
 * @param name - The name for the new distribu
 * @returns The created distribu with its ID
 */
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

/**
 * Deletes a distribu by ID
 *
 * @param id - The ID of the distribu to delete
 * @returns The result of the delete operation
 */
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