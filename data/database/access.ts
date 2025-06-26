import { PGlite, type PGliteInterfaceExtensions } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { drizzle } from 'drizzle-orm/pglite';

export const pglite = await PGlite.create('idb://distribu-pglite', {
  relaxedDurability: true,
  extensions: { live },
});

export const db = drizzle(pglite);
