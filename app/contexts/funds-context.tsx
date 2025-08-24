import { createContext, useContext } from 'react';
import type { FundsStatus } from '@/data/types';

/**
 * Provider component for funds context
 *
 * @param fundsStatus - The funds status data to provide
 * @param children - Child components that can access the funds context
 */
export function FundsProvider({ fundsStatus, children }: FundsProviderProps) {
  return <FundsContext value={fundsStatus}>{children}</FundsContext>;
}

/**
 * Context for providing funds status data throughout the distribu route
 *
 * Provides access to total funds, assigned amounts, and used amounts
 * for calculating reserve allocation percentages and status indicators
 */
const FundsContext = createContext<FundsStatus | null>(null);

/**
 * Hook to access funds status data from context
 *
 * @returns FundsStatus object containing total, assigned, and used amounts
 * @throws Error if used outside of FundsProvider
 */
export function useFunds(): FundsStatus {
  const context = useContext(FundsContext);
  if (!context) {
    throw new Error('useFunds must be used within a FundsProvider');
  }
  return context;
}

type FundsProviderProps = {
  fundsStatus: FundsStatus;
  children: React.ReactNode;
};
