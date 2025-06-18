import * as UiReact from 'tinybase/ui-react/with-schemas';
import {
  createMergeableStore,
  createRelationships,
} from 'tinybase/with-schemas';
import type { NoValuesSchema } from 'tinybase/with-schemas';
import { useCallback } from 'react';

const STORE_ID = 'store';

const TABLES_SCHEMA = {
  distribus: {
    name: { type: 'string' },
  },
  incomes: {
    distribuId: { type: 'string' },
    source: { type: 'string' },
    amount: { type: 'number' },
    createdAt: { type: 'string', default: new Date().toISOString() },
    notes: { type: 'string', default: '' },
    isRecurring: { type: 'boolean', default: false },
    frequency: { type: 'string' },
    nextOccurrence: { type: 'string' },
  },
  reserves: {
    distribuId: { type: 'string' },
    name: { type: 'string' },
    position: { type: 'number' },
    amountAssigned: { type: 'number', default: 0 },
    isMonthly: { type: 'boolean', default: false },
    isActive: { type: 'boolean', default: true },
    notes: { type: 'string', default: '' },
  },
  uses: {
    distribuId: { type: 'string' },
    reserveId: { type: 'string', default: '' },
    name: { type: 'string' },
    amount: { type: 'number', default: 0 },
    createdAt: { type: 'string', default: new Date().toISOString() },
    notes: { type: 'string', default: '' },
    isRecurring: { type: 'boolean', default: false },
    frequency: { type: 'string' },
    nextOccurrence: { type: 'string' },
  },
  tags: {
    name: { type: 'string' },
  },
  reserveTags: {
    reserveId: { type: 'string' },
    tagId: { type: 'string' },
  },
} as const;

type Schemas = [typeof TABLES_SCHEMA, NoValuesSchema];

// getting hooks from TinyBase
const { useCreateStore, useCreateRelationships, useProvideStore, useStore } =
  UiReact as UiReact.WithSchemas<Schemas>;

export function Store() {
  // create mergeable store
  const store = useCreateStore(() =>
    createMergeableStore().setTablesSchema(TABLES_SCHEMA)
  );

  // create relationships
  const relationships = useCreateRelationships(store, (store) =>
    createRelationships(store)
      .setRelationshipDefinition(
        'distribuIncomes',
        'incomes',
        'distribus',
        'distribuId'
      )
      .setRelationshipDefinition(
        'distribuReserves',
        'reserves',
        'distribus',
        'distribuId'
      )
      .setRelationshipDefinition(
        'distribuUses',
        'uses',
        'distribus',
        'distribuId'
      )
      .setRelationshipDefinition('reserveUses', 'uses', 'reserves', 'reserveId')
      .setRelationshipDefinition(
        'reserveTags',
        'reserveTags',
        'reserves',
        'reserveId'
      )
      .setRelationshipDefinition('appliedTags', 'reserveTags', 'tags', 'tagId')
  );

  // TODO: add indexes

  useProvideStore(STORE_ID, store);

  return null;
}

// OPERATIONS
export function useDistribuCreationCallback() {
  const store = useStore(STORE_ID);

  return useCallback(
    (name: string): string | undefined => {
      if (!store) return;

      // Check for existing distribu with same name
      const existingDistribus = store.getTable('distribus');
      const hasDuplicate = Object.values(existingDistribus).some(
        (distribu) => distribu.name === name
      );

      if (hasDuplicate) {
        throw new Error(`Distribu with name "${name}" already exists`);
      }

      const newDistribuId = store.addRow('distribus', {
        name,
      });

      return newDistribuId;
    },
    [store]
  );
}

// const VALUES_SCHEMA = {
//   name: { type: 'string' },
// } as const;

// const TABLES_SCHEMA = {
//   incomes: {
//     source: { type: 'string' },
//     amount: { type: 'number' },
//     createdAt: { type: 'string' },
//     notes: { type: 'string' },
//     isRecurring: { type: 'boolean' },
//     frequency: { type: 'string' },
//     nextOccurrence: { type: 'string' },
//   },
//   reserves: {
//     id: { type: 'string' },
//   },
// } as const;

// .setRelationshipDefinition(
//   'distribuIncomes',
//   'incomes',
//   'distribus',
//   'distribuId'
// )
// .setRelationshipDefinition(
//   'distribuReserves',
//   'reserves',
//   'distribus',
//   'distribuId'
// )
// .setRelationshipDefinition('reserveUses', 'uses', 'reserves', 'reserveId')
// .setRelationshipDefinition(
//   'reserveTags',
//   'reserveTags',
//   'reserves',
//   'reserveId'
// )
// .setRelationshipDefinition('tagReserves', 'reserveTags', 'tags', 'tagId')
