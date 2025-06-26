import type { PGlite, PGliteInterfaceExtensions } from '@electric-sql/pglite';
import { makePGliteProvider } from '@electric-sql/pglite-react';
import { pglite } from './access';
import type { live } from '@electric-sql/pglite/live';

const { PGliteProvider } = makePGliteProvider<
  PGlite & PGliteInterfaceExtensions<{ live: typeof live }>
>();

export function DataProvider({ children }: { children: React.ReactNode }) {
  return <PGliteProvider db={pglite}>{children}</PGliteProvider>;
}