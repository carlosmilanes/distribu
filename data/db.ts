import { drizzle } from 'drizzle-orm/pglite';
import { sql } from 'drizzle-orm';

export const db = drizzle();

async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
