import * as UiReact from 'tinybase/ui-react/with-schemas';
import { createStore } from 'tinybase/with-schemas';

const VALUES_SCHEMA = {
  name: { type: 'string' },
  position: { type: 'number' },
  amountAssigned: { type: 'number' },
  isMonthly: { type: 'boolean' },
  isActive: { type: 'boolean' },
  notes: { type: 'string' },
} as const;

const TABLES_SCHEMA = {
  tags: {
    id: { type: 'string' },
  },
} as const;

type Schemas = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];

// getting the hooks
const { useCreateStore } = UiReact as UiReact.WithSchemas<Schemas>;

export function ReserveStore() {
  const store = useCreateStore(() =>
    createStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );

  return null;
}
