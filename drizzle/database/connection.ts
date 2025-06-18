import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

export const db = drizzle(new PGlite('indexeddb://distribu-local'));