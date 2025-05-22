import 'dotenv/config';
import { drizzle } from 'drizzle-orm/pglite';
import { sql } from 'drizzle-orm';

// Initialize the database connection
export const db = drizzle(process.env.DATABASE_URL!);

async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
