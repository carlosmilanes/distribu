import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './data/database/schema.ts',
  out: './data/database/migrations',
  driver: 'pglite',
  dbCredentials: {
    url: ':memory:',
  },
});
