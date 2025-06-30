import { db } from '../../entry';
import { uses } from '../../schema';
import { deleteUse } from '../../queries/reserves';
import { sql } from 'drizzle-orm';

async function resetUsesTable() {
  console.log('Resetting uses table...');

  try {
    // Get all uses and delete them
    const allUsesResult = await db.select().from(uses);

    for (const use of allUsesResult) {
      await deleteUse(use.id);
      console.log(`Deleted use with ID: ${use.id}`);
    }

    // Reset sequence
    await db.execute(sql`ALTER SEQUENCE uses_id_seq RESTART WITH 1`);

    console.log('Uses table reset successfully');
  } catch (error) {
    console.error('Failed to reset uses table:', error);
  } finally {
    process.exit(0);
  }
}

resetUsesTable();
