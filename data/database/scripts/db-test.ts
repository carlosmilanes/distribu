import { sql } from 'drizzle-orm';
import { db } from '../entry';

async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
