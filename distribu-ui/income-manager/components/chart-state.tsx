import React, { type ReactNode, useState } from 'react';
import { useActionOutside } from '@/hooks/useActionOutside';
import type { IncomeState } from '@/data/types';
import { create, props } from 'stylex';
import { colors } from '../../../stylex/vars.stylex';

type ChartStateProps = {
  children: ReactNode;
  incomeState: IncomeState;
};

export function ChartState({ children, incomeState }: ChartStateProps) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useActionOutside<HTMLDivElement>(() => setCollapsed(true));

  // Create props to pass to children
  const childProps = {
    collapsed,
    hidden: collapsed, // For Legend component
    incomeState,
  };

  return (
    <div
      ref={ref}
      onClick={() => setCollapsed(!collapsed)}
      {...props(ChartStateStyles.base)}
    >
      {/* Clone children and inject props */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...childProps });
        }
        return child;
      })}
    </div>
  );
}

const ChartStateStyles = create({
  base: {
    backgroundColor: `${colors.secondaryBackground}10`,
    position: 'fixed',
    bottom: 0,
    zIndex: 10,
    width: '100%',
    borderTop: `1px solid ${colors.gray4}80`,
    paddingBottom: '12px',
    backdropFilter: 'blur(20px)',
  },
});
