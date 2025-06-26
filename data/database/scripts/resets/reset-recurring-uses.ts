import { db } from '../../access';
import { recurringUses } from '../../schema';
import { sql } from 'drizzle-orm';

async function resetRecurringUsesTable() {
  console.log('Resetting recurring uses table...');

  try {
    // Delete all recurring uses directly since there's no action function
    await db.delete(recurringUses);
    console.log('Deleted all recurring uses');

    // Reset sequence
    await db.execute(sql`ALTER SEQUENCE recurring_uses_id_seq RESTART WITH 1`);

    console.log('Recurring uses table reset successfully');
  } catch (error) {
    console.error('Failed to reset recurring uses table:', error);
  } finally {
    process.exit(0);
  }
}

resetRecurringUsesTable();
