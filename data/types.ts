export type Income = {
  id: number;
  source: string;
  date: Date;
  amount: string;
  recurring: boolean;
  notes?: string;
};

export type IncomeState = {
  total: string;
  assigned: string;
  assignable: string;
  used: string;
};

export type IncomeData = {
  state: IncomeState;
  incomes?: Income[];
};

export type Expense = {
  id: number;
  date: Date;
  amount: string;
  recurring: boolean;
  notes?: string;
};

export type Attribute = {
  id: number;
  name: string;
};

export type Mission = {
  id: number;
  name: string;
  assigned: string;
  portion: number;
  used: string; // not to include in database schema, only in returned object
  deferred: boolean; // if tags.contains("deferred")
  monthly: boolean; // if tags.contains("monthly")
  attributes?: Attribute[];
  expenses?: Expense[];
};
