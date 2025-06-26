import { db } from '../../access';
import { recurringIncomes } from '../../schema';
import { sql } from 'drizzle-orm';

async function resetRecurringIncomesTable() {
  console.log('Resetting recurring incomes table...');

  try {
    // Delete all recurring incomes directly since there's no action function
    await db.delete(recurringIncomes);
    console.log('Deleted all recurring incomes');

    // Reset sequence
    await db.execute(
      sql`ALTER SEQUENCE recurring_incomes_id_seq RESTART WITH 1`
    );

    console.log('Recurring incomes table reset successfully');
  } catch (error) {
    console.error('Failed to reset recurring incomes table:', error);
  } finally {
    process.exit(0);
  }
}

resetRecurringIncomesTable();
