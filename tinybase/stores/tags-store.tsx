import * as UiReact from 'tinybase/ui-react/with-schemas';
import type { NoValuesSchema } from 'tinybase/with-schemas';
import { createStore } from 'tinybase/with-schemas';

const STORE_ID = 'tags';

const TABLES_SCHEMA = {
  tags: {
    name: { type: 'string' },
  },
} as const;

type Schemas = [typeof TABLES_SCHEMA, NoValuesSchema];

const { useCreateStore, useProvideStore } =
  UiReact as UiReact.WithSchemas<Schemas>;

export function TagsStore() {
  const store = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA)
  );

  useProvideStore(STORE_ID, store);

  return null;
}
