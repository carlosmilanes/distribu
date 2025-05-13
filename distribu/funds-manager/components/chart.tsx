import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { FundsStatus } from '../../data/types';
import { QuaternaryText } from '@/global/components/text/quaternary-text';
import { StatusBar } from './status-bar';
import { findBasicPercentage } from '@/global/utils/findBasicPercentage';
import { Money } from '@/global/components/money';
import { create, props as style } from 'stylex';
import {
  colors,
  dynamicSizes,
  fixedSizes,
  fontSizes,
} from '@/global/styles/vars.stylex';
import { useState } from 'react';
import { useOutsidePress } from '@/global/hooks/use-outside-press';
import { TertiaryText } from '@/global/components/text/tertiary-text';
import { glass } from '@/global/styles/materials.stylex';

export function Chart({ status }: { status: FundsStatus }) {
  const [collapsed, setCollapsed] = useState(false);
  const ref = useOutsidePress<HTMLDivElement>(() => setCollapsed(true));

  return (
    <div
      {...style(glass.regular, styles.base)}
      ref={ref}
      onClick={() => setCollapsed(!collapsed)}
    >
      <TotalHeader
        total={status.total}
        collapsed={collapsed}
      />

      <Legend
        status={status}
        hidden={collapsed}
      />

      <StatusBar
        status={status}
        styling={styles.stackedBar}
      />
    </div>
  );
}

function TotalHeader({ total, collapsed }: TotalHeaderProps) {
  return (
    <div {...style(styles.totalHeader)}>
      <div {...style(styles.totalContent)}>
        <TertiaryText styling={styles.totalLabel}>Total</TertiaryText>

        <Money
          styling={styles.totalAmount}
          amount={total}
        />
      </div>

      <ChevronDownIcon
        {...style(styles.chevron, collapsed && styles.chevronCollapsed)}
      />
    </div>
  );
}

function Legend({ status, hidden }: LegendProps) {
  if (!status) return null;

  return (
    <div {...style(styles.legend, hidden && styles.legendHidden)}>
      <LegendItem
        label='Disponible'
        amount={status.total - status.assigned}
        total={status.total}
        color={colors.income}
      />
      <LegendItem
        label='Asignado'
        amount={status.assigned}
        total={status.total}
        color={colors.assignedIncome}
      />
      <LegendItem
        label='Usado'
        amount={status.used}
        total={status.total}
        color={colors.usedIncome}
      />
    </div>
  );
}

function LegendItem({ label, amount, total, color }: LegendItemProps) {
  return (
    <div {...style(styles.legendItem)}>
      <QuaternaryText styling={styles.legendLabel}>{label}</QuaternaryText>

      <div {...style(styles.legendContent)}>
        <Money
          styling={[styles.legendAmount, styles.legendAmountColor(color)]}
          amount={amount}
        />

        <QuaternaryText
          styling={[
            styles.legendPercentage,
            styles.legendPercentageColor(color),
          ]}
        >
          {findBasicPercentage(amount, total)}%
        </QuaternaryText>
      </div>

      <DottedDivider />
    </div>
  );
}

function DottedDivider() {
  return (
    <div
      {...style(styles.dottedDivider)}
      style={{
        backgroundImage: `radial-gradient(circle, ${colors.gray} 1px, transparent 1px)`,
        backgroundSize: '10px 4px',
      }}
    />
  );
}

type TotalHeaderProps = {
  total: number;
  collapsed: boolean;
};

type LegendProps = {
  status: FundsStatus;
  hidden: boolean;
};

type LegendItemProps = {
  label: string;
  amount: number;
  total: number;
  color: string;
};

const styles = create({
  base: {
    position: 'absolute',
    bottom: '-1px',
    zIndex: 10,
    width: '100%',
    borderTop: `2px solid ${colors.glassyBorder}`,
    paddingBottom: fixedSizes.s3,
  },
  stackedBar: {
    margin: `0 ${fixedSizes.s3}`,
  },
  totalHeader: {
    position: 'relative',
    margin: `${fixedSizes.s2} 0`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${fixedSizes.s4} 0 ${fixedSizes.s3}`,
  },
  totalContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  totalLabel: {
    color: colors.gray,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: dynamicSizes.m1,
    fontWeight: '600',
  },
  chevron: {
    width: dynamicSizes.m1,
    height: dynamicSizes.m1,
    strokeWidth: '2',
    transition: 'transform 300ms ease-in-out',
  },
  chevronCollapsed: {
    transform: 'rotate(180deg)',
  },
  legend: {
    height: '12.5rem',
    margin: `0 ${fixedSizes.s3}`,
    overflow: 'hidden',
    transition: 'height 300ms ease-in-out, opacity 300ms ease-in-out',
  },
  legendHidden: {
    height: 0,
    opacity: 0,
  },
  legendItem: {
    marginBottom: fixedSizes.s2,
  },
  legendContent: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  legendLabel: {
    color: colors.gray,
    fontSize: dynamicSizes.s4,
  },
  legendAmount: {
    fontSize: fontSizes.l,
    fontWeight: '600',
  },
  legendPercentage: {
    fontSize: fontSizes.m,
  },
  dottedDivider: {
    height: fixedSizes.s1,
    backgroundRepeat: 'repeat-x',
  },
  legendAmountColor: (color: string) => ({
    color,
  }),
  legendPercentageColor: (color: string) => ({
    color,
  }),
});
