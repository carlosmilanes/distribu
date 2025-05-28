import { create, props } from 'stylex';
import {
  colors,
  borderRadius,
  fixedSizes,
} from '@/app/styles/vars.stylex';

export function Switch({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (active: boolean) => void;
}) {
  return (
    <button
      {...props(
        SwitchStyles.base,
        active ? SwitchStyles.active : SwitchStyles.inactive
      )}
      type='button'
      role='switch'
      aria-checked={active}
      onClick={(e) => {
        e.preventDefault();
        onChange(!active);
      }}
    >
      <span
        {...props(
          SwitchStyles.thumb,
          active ? SwitchStyles.thumbActive : SwitchStyles.thumbInactive
        )}
      />
    </button>
  );
}

const SwitchStyles = create({
  base: {
    position: 'relative',
    height: fixedSizes.m1,
    width: fixedSizes.m2,
    borderRadius: borderRadius.full,
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
  },
  active: {
    backgroundColor: colors.income,
  },
  inactive: {
    backgroundColor: colors.gray4,
  },
  thumb: {
    position: 'absolute',
    top: fixedSizes.s1,
    display: 'block',
    height: fixedSizes.s4,
    width: fixedSizes.s4,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transitionProperty: 'transform',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
  },
  thumbActive: {
    transform: 'translateX(20px)',
  },
  thumbInactive: {
    transform: `translateX(${fixedSizes.s1})`,
  },
});
