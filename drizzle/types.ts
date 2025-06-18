import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import {
  incomes,
  reserves,
  tags,
  uses,
  recurringIncomes,
  recurringUses,
} from './database/schema';

// Base types from schema
type BaseIncome = InferSelectModel<typeof incomes>;
type BaseUse = InferSelectModel<typeof uses>;
type BaseRecurringIncome = InferSelectModel<typeof recurringIncomes>;
type BaseRecurringUse = InferSelectModel<typeof recurringUses>;
type BaseReserve = InferSelectModel<typeof reserves>;
type BaseTag = InferSelectModel<typeof tags>;

// App types with relationships
export type Income = BaseIncome & {
  recurrence?: BaseRecurringIncome;
};

export type Use = BaseUse & {
  recurrence?: BaseRecurringUse;
};

export type Reserve = BaseReserve & {
  tags?: BaseTag[];
  uses?: Use[];
  amountUsed: number;
};

export type Tag = BaseTag;

// Insert types
export type NewIncome = InferInsertModel<typeof incomes>;
export type NewUse = InferInsertModel<typeof uses>;
export type NewReserve = InferInsertModel<typeof reserves>;
export type NewTag = InferInsertModel<typeof tags>;

// App state types
export type FundsData = {
  status: FundsStatus;
  incomes: Income[];
};

export type FundsStatus = {
  total: number;
  assigned: number;
  used: number;
};
