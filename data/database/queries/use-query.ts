import { useLiveIncrementalQuery } from '@electric-sql/pglite-react';
import type { Query } from 'drizzle-orm';

export function useQuery(queryBuilder: QueryBuilder, key: string) {
  const query = queryBuilder.toSQL();
  return useLiveIncrementalQuery(query.sql, query.params, key);
}

type QueryBuilder = { toSQL(): Query };
