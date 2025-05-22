import { db } from '../../connection';
import { incomes } from '../../schema';
import { deleteIncome } from '../../actions/funds';
import { sql } from 'drizzle-orm';

async function resetIncomesTable() {
  console.log('Resetting incomes table...');

  try {
    // Get all incomes and delete them
    const allIncomesResult = await db.select().from(incomes);

    for (const income of allIncomesResult) {
      await deleteIncome(income.id);
      console.log(`Deleted income with ID: ${income.id}`);
    }

    // Reset sequence
    await db.execute(sql`ALTER SEQUENCE incomes_id_seq RESTART WITH 1`);

    console.log('Incomes table reset successfully');
  } catch (error) {
    console.error('Failed to reset incomes table:', error);
  } finally {
    process.exit(0);
  }
}

resetIncomesTable();
