import { db } from '../../connection';
import { tags } from '../../schema';
import { deleteTag } from '../../actions/reserves';
import { sql } from 'drizzle-orm';

async function resetTagsTable() {
  console.log('Resetting tags table...');

  try {
    // Get all tags and delete them
    const allTagsResult = await db.select().from(tags);

    for (const tag of allTagsResult) {
      await deleteTag(tag.id);
      console.log(`Deleted tag with ID: ${tag.id}`);
    }

    // Reset sequence
    await db.execute(sql`ALTER SEQUENCE tags_id_seq RESTART WITH 1`);

    console.log('Tags table reset successfully');
  } catch (error) {
    console.error('Failed to reset tags table:', error);
  } finally {
    process.exit(0);
  }
}

resetTagsTable();
