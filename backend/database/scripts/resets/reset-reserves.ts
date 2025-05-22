import { db } from '../../connection';
import { reserves } from '../../schema';
import { deleteReserve } from '../../actions/reserves';
import { sql } from 'drizzle-orm';

async function resetReservesTable() {
  console.log('Resetting reserves table...');

  try {
    // Get all reserves and delete them
    const allReservesResult = await db.select().from(reserves);

    for (const reserve of allReservesResult) {
      await deleteReserve(reserve.id);
      console.log(`Deleted reserve with ID: ${reserve.id}`);
    }

    // Reset sequence
    await db.execute(sql`ALTER SEQUENCE reserves_id_seq RESTART WITH 1`);

    console.log('Reserves table reset successfully');
  } catch (error) {
    console.error('Failed to reset reserves table:', error);
  } finally {
    process.exit(0);
  }
}

resetReservesTable();
