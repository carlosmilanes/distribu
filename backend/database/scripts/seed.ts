import { db } from '../connection';
import {
  tags as tagsTable,
  reserveTags,
  recurringIncomes,
  recurringUses,
} from '../schema';
import { addIncome } from '../actions/funds';
import { addReserve, addUse } from '../actions/reserves';
import { createDistribu } from '../actions/distribus';
import { mockTags, mockReserves, mockIncomes, mockUses } from '../../mockData';

async function seed() {
  console.log('Starting seed process...');

  try {
    // Create a distribu first (since everything references it)
    const [distribuResult] = await createDistribu('Test Distribu');

    const distribuId = distribuResult.id;
    console.log(`Created distribu with ID: ${distribuId}`);

    // Add all tags
    for (const tag of mockTags) {
      await db.insert(tagsTable).values({
        name: tag.name,
      });
    }
    console.log(`Added ${mockTags.length} tags`);

    // Add all reserves
    for (const reserve of mockReserves) {
      // Adjust distribuId to match the one we just created
      const reserveData = {
        ...reserve,
        distribuId,
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
        distribuId,
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
