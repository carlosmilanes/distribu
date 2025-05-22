import { db } from '../connection';
import { distribus } from '../schema';

export async function createDistribu(name: string) {
  try {
    return await db
      .insert(distribus)
      .values({ name })
      .returning({ id: distribus.id });
  } catch (error) {
    console.error('Error creating distribu:', error);
    throw error;
  }
}
