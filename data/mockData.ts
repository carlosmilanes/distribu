import { RecurrenceFrequency } from './schema';
import type { FundsData, Income, Reserve, Tag, Use } from './types';

// Mock tags
export const mockTags: Tag[] = [
  { id: 1, name: 'Bills' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Transportation' },
  { id: 4, name: 'Entertainment' },
  { id: 5, name: 'Savings' },
];

// Mock uses
export const mockUses: Use[] = [
  {
    id: 1,
    reserveId: 1,
    amount: '250.00',
    createdAt: new Date('2024-08-01'),
    notes: 'Monthly rent payment',
  },
  {
    id: 2,
    reserveId: 2,
    amount: '75.50',
    createdAt: new Date('2024-08-02'),
    notes: 'Groceries',
  },
  {
    id: 3,
    reserveId: 3,
    amount: '45.00',
    createdAt: new Date('2024-08-03'),
    notes: 'Gas',
    recurrence: {
      id: 1,
      useId: 3,
      frequency: 'weekly',
      nextOccurrence: new Date('2024-08-10'),
    },
  },
];

// Mock reserves
export const mockReserves: Reserve[] = [
  {
    id: 1,
    distribuId: 1,
    name: 'Housing',
    position: 1,
    amountAssigned: '1000.00',
    isPermanent: true,
    isActive: true,
    notes: 'Rent and utilities',
    tags: [mockTags[0]],
    uses: [mockUses[0]],
    amountUsed: 250.0,
  },
  {
    id: 2,
    distribuId: 1,
    name: 'Groceries',
    position: 2,
    amountAssigned: '400.00',
    isPermanent: true,
    isActive: true,
    notes: 'Food and household items',
    tags: [mockTags[1]],
    uses: [mockUses[1]],
    amountUsed: 75.5,
  },
  {
    id: 3,
    distribuId: 1,
    name: 'Transportation',
    position: 3,
    amountAssigned: '200.00',
    isPermanent: true,
    isActive: true,
    notes: 'Gas, car maintenance, public transport',
    tags: [mockTags[2]],
    uses: [mockUses[2]],
    amountUsed: 45.0,
  },
  {
    id: 4,
    distribuId: 1,
    name: 'Entertainment',
    position: 4,
    amountAssigned: '150.00',
    isPermanent: false,
    isActive: true,
    notes: 'Movies, dining out, hobbies',
    tags: [mockTags[3]],
    uses: [],
    amountUsed: 0,
  },
  {
    id: 5,
    distribuId: 1,
    name: 'Emergency Fund',
    position: 5,
    amountAssigned: '500.00',
    isPermanent: true,
    isActive: true,
    notes: 'Savings for unexpected expenses',
    tags: [mockTags[4]],
    uses: [],
    amountUsed: 0,
  },
];

// Mock incomes
export const mockIncomes: Income[] = [
  {
    id: 1,
    distribuId: 1,
    source: 'Salary',
    amount: '2500.00',
    createdAt: new Date('2024-08-01'),
    notes: 'Monthly salary',
    recurrence: {
      id: 1,
      incomeId: 1,
      frequency: 'monthly',
      nextOccurrence: new Date('2024-09-01'),
    },
  },
  {
    id: 2,
    distribuId: 1,
    source: 'Freelance work',
    amount: '350.00',
    createdAt: new Date('2024-08-15'),
    notes: 'Web development project',
  },
];

// Complete mock funds data
export const mockFundsData: FundsData = {
  status: {
    total: 2850.0, // Sum of all incomes
    assigned: 2250.0, // Sum of all assigned amounts
    used: 370.5, // Sum of all used amounts
  },
  incomes: mockIncomes,
};
