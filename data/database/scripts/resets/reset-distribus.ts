import { db } from '../../entry';
import { distribus } from '../../schema';
import { deleteDistribu } from '../../queries/distribus';
import { sql } from 'drizzle-orm';

async function resetDistribusTable() {
  console.log('Resetting distribus table...');

  try {
    // Get all distribus and delete them
    const allDistribusResult = await db.select().from(distribus);

    for (const distribu of allDistribusResult) {
      await deleteDistribu(distribu.id);
      console.log(`Deleted distribu with ID: ${distribu.id}`);
    }

    // Reset sequence
    await db.execute(sql`ALTER SEQUENCE distribus_id_seq RESTART WITH 1`);

    console.log('Distribus table reset successfully');
  } catch (error) {
    console.error('Failed to reset distribus table:', error);
  } finally {
    process.exit(0);
  }
}

resetDistribusTable();
