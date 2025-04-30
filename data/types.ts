export type FundsData = {
  status: FundsStatus;
  incomes: Income[];
};

export type FundsStatus = {
  total: number;
  assigned: number;
  used: number;
};

export type Income = {
  id: number;
  source: string;
  date: Date;
  amount: number;
  isRecurring: boolean;
  notes?: string;
};

export type Reserve = {
  id: number;
  name: string;
  amountAssigned: number;
  amountUsed: number; // not to include in database schema, only in returned object
  tags?: Tag[];
  isMonthly: boolean; // if tags.contains("monthly")
  notes?: string;
  uses?: Use[];
};

export type Tag = {
  id: number;
  name: string;
};

export type Use = {
  id: number;
  date: Date;
  amount: number;
  isRecurring: boolean; // only if in monthly reserve
  notes?: string;
};
