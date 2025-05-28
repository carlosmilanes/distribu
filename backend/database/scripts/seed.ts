import { db } from '../connection';
import {
  tags as tagsTable,
  reserveTags,
  recurringIncomes,
  recurringUses,
  distribus,
} from '../schema';
import { addIncome } from '../actions/funds';
import { addReserve, addUse, addTag, deleteTag } from '../actions/reserves';
import { createDistribu, deleteDistribu } from '../actions/distribus';
import {
  mockTags,
  mockReserves,
  mockIncomes,
  mockUses,
  DISTRIBU_PLACEHOLDER_ID,
} from '../../mockData';
import { sql } from 'drizzle-orm';

async function seed() {
  console.log('Starting seed process...');

  try {
    // Clear all existing data
    console.log('Clearing existing data...');

    // Get all distribus and delete them (this will cascade to most related entities)
    const allDistribusResult = await db.select().from(distribus);
    for (const distribu of allDistribusResult) {
      await deleteDistribu(distribu.id);
    }

    // Delete any remaining tags that might not be associated with a reserve
    const allTagsResult = await db.select().from(tagsTable);
    for (const tag of allTagsResult) {
      await deleteTag(tag.id);
    }

    // Reset sequences to start from 1
    console.log('Resetting ID sequences...');
    await db.execute(sql`ALTER SEQUENCE distribus_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE incomes_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE reserves_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE tags_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE reserve_tags_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE uses_id_seq RESTART WITH 1`);
    await db.execute(
      sql`ALTER SEQUENCE recurring_incomes_id_seq RESTART WITH 1`
    );
    await db.execute(sql`ALTER SEQUENCE recurring_uses_id_seq RESTART WITH 1`);

    console.log('Database cleared and sequences reset.');

    // Create a distribu first (since everything references it)
    const [distribuResult] = await createDistribu('Test Distribu');

    const distribuId = distribuResult.id;
    console.log(`Created distribu with ID: ${distribuId}`);

    // Add all tags
    for (const tag of mockTags) {
      await addTag({ name: tag.name });
    }
    console.log(`Added ${mockTags.length} tags`);

    // Add all reserves
    for (const reserve of mockReserves) {
      // Adjust distribuId to match the one we just created
      const reserveData = {
        ...reserve,
        distribuId:
          reserve.distribuId === DISTRIBU_PLACEHOLDER_ID
            ? distribuId
            : reserve.distribuId,
      };

      const { tags, uses, amountUsed, ...reserveToAdd } = reserveData;

      // Add the reserve
      const result = await addReserve(reserveToAdd);
      // Get the inserted id from the returning clause
      const reserveId = reserve.id; // Use the original mock ID for simplicity

      // Add tag associations
      if (tags && tags.length > 0) {
        for (const tag of tags) {
          await db.insert(reserveTags).values({
            reserveId,
            tagId: tag.id,
          });
        }
      }

      console.log(`Added reserve: ${reserve.name} with ID: ${reserveId}`);
    }

    // Add all incomes
    for (const income of mockIncomes) {
      // Adjust distribuId to match the one we just created
      const incomeData = {
        ...income,
        distribuId:
          income.distribuId === DISTRIBU_PLACEHOLDER_ID
            ? distribuId
            : income.distribuId,
      };

      const { recurrence, ...incomeToAdd } = incomeData;

      await addIncome(incomeToAdd);
      console.log(`Added income: ${income.source} - ${income.amount}`);

      // Add recurrence if it exists
      if (recurrence) {
        await db.insert(recurringIncomes).values({
          incomeId: income.id,
          frequency: recurrence.frequency,
          nextOccurrence: recurrence.nextOccurrence,
        });
        console.log(`Added recurring schedule for income: ${income.source}`);
      }
    }

    // Add all uses
    for (const use of mockUses) {
      const { recurrence, ...useToAdd } = use;

      await addUse(useToAdd);
      console.log(`Added use: ${use.amount} for reserve ID: ${use.reserveId}`);

      // Add recurrence if it exists
      if (recurrence) {
        await db.insert(recurringUses).values({
          useId: use.id,
          frequency: recurrence.frequency,
          nextOccurrence: recurrence.nextOccurrence,
        });
        console.log(`Added recurring schedule for use ID: ${use.id}`);
      }
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
