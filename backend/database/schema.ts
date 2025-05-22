import {
  integer,
  text,
  decimal,
  boolean,
  timestamp,
  serial,
  pgTable,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';

export const RecurrenceFrequency = pgEnum('recurrence_frequency', [
  'daily',
  'weekly',
  'monthly',
]);

export const Role = pgEnum('role', ['manager', 'viewer']);

export const distribus = pgTable('distribus', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const incomes = pgTable(
  'incomes',
  {
    id: serial('id').primaryKey(),
    distribuId: integer('distribu_id')
      .notNull()
      .references(() => distribus.id, { onDelete: 'cascade' }),
    source: text('source'),
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    notes: text('notes'),
  },
  (table) => [
    index('incomes_distribu_id_idx').on(table.distribuId),
    index('incomes_created_at_idx').on(table.createdAt),
  ]
);

export const recurringIncomes = pgTable('recurring_incomes', {
  id: serial('id').primaryKey(),
  incomeId: integer('income_id')
    .notNull()
    .references(() => incomes.id, { onDelete: 'cascade' }),
  frequency: RecurrenceFrequency('frequency').default('monthly'),
  nextOccurrence: timestamp('next_occurrence', {
    withTimezone: true,
  }).notNull(),
});

export const reserves = pgTable(
  'reserves',
  {
    id: serial('id').primaryKey(),
    distribuId: integer('distribu_id')
      .notNull()
      .references(() => distribus.id, { onDelete: 'cascade' }),
    name: text('name').notNull().unique(),
    position: integer('position').notNull(),
    amountAssigned: decimal('amount_assigned', {
      precision: 12,
      scale: 2,
    }).notNull(),
    isPermanent: boolean('is_permanent').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    notes: text('notes'),
  },
  (table) => [
    index('reserves_distribu_id_idx').on(table.distribuId),
    index('reserves_position_idx').on(table.position),
  ]
);

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const reserveTags = pgTable('reserve_tags', {
  id: serial('id').primaryKey(),
  reserveId: integer('reserve_id')
    .notNull()
    .references(() => reserves.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
});

export const uses = pgTable(
  'uses',
  {
    id: serial('id').primaryKey(),
    reserveId: integer('reserve_id').references(() => reserves.id, {
      onDelete: 'cascade',
    }),
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    notes: text('notes'),
  },
  (table) => [
    index('uses_reserve_id_idx').on(table.reserveId),
    index('uses_created_at_idx').on(table.createdAt),
  ]
);

export const recurringUses = pgTable('recurring_uses', {
  id: serial('id').primaryKey(),
  useId: integer('use_id')
    .notNull()
    .references(() => uses.id, { onDelete: 'cascade' }),
  frequency: RecurrenceFrequency('frequency').default('monthly'),
  nextOccurrence: timestamp('next_occurrence', {
    withTimezone: true,
  }).notNull(),
});

// AUTHENTICATION 👇

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  salt: text('salt').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('sessions_user_id_idx').on(table.userId),
    index('sessions_expires_at_idx').on(table.expiresAt),
  ]
);

export const distribuRoles = pgTable(
  'distribu_roles',
  {
    id: serial('id').primaryKey(),
    distribuId: integer('distribu_id')
      .notNull()
      .references(() => distribus.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: Role('role').notNull().default('viewer'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('distribu_roles_distribu_id_idx').on(table.distribuId),
    index('distribu_roles_user_id_idx').on(table.userId),
  ]
);
