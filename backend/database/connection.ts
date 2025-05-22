import 'dotenv/config';
import { drizzle } from 'drizzle-orm/pglite';
import { sql } from 'drizzle-orm';

// Initialize the database connection
export const db = drizzle(process.env.DATABASE_URL!);
