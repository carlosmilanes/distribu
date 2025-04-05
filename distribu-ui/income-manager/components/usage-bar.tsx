import { TertiaryText } from '@/components/tertiary-text';
import { findBasicPercentage } from '@/utils/findBasicPercentage';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../../../stylex/vars.stylex';

export function UsageBar({
  part,
  total,
  color = colors.gray,
  label,
  ...otherProps
}: {
  part: string;
  total: string;
  label: string;
  color: string;
}) {
  return (
    <div
      {...props(UsageBarStyles.base)}
      {...otherProps}
    >
      <div
        {...props(UsageBarStyles.bar)}
        style={{
          width: `${findBasicPercentage(part, total)}%`,
          backgroundColor: `${color}80`,
        }}
      ></div>
      <div {...props(UsageBarStyles.amount)}>{part}</div>
      <TertiaryText {...props(UsageBarStyles.label)}>
        {label} ({findBasicPercentage(part, total)}%)
      </TertiaryText>
    </div>
  );
}

const UsageBarStyles = create({
  base: {
    position: 'relative',
    height: '64px',
    padding: '8px',
  },
  bar: {
    backgroundColor: 'currentColor',
    borderTopRightRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: 0,
    zIndex: 10,
  },
  amount: {
    width: 'min-content',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '24px',
    color: `${colors.text}80`,
    position: 'relative',
    zIndex: 20,
  },
  label: {
    position: 'relative',
    zIndex: 20,
  },
});
