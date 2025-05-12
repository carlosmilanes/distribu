import { cloneElement } from 'react';
import { create, props } from 'stylex';
import { colors, borderRadius, fixedSizes } from '@/presentation/stylex/vars.stylex';

export function ToggleOptionButton({
  children,
  active,
  activeColor = colors.gray,
  onClick,
  ...otherProps
}: {
  children: React.ReactElement;
  active: boolean;
  activeColor?: string;
  onClick: (active: boolean) => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(!active);
      }}
      {...props(
        ToggleOptionButtonStyles.base,
        active && ToggleOptionButtonStyles.active
      )}
      {...otherProps}
    >
      {cloneElement(children, {
        ...props(ToggleOptionButtonStyles.icon),
        style: active ? { stroke: activeColor } : undefined,
        ...(children.props as React.HTMLAttributes<HTMLElement>),
      })}
    </button>
  );
}

const ToggleOptionButtonStyles = create({
  base: {
    width: fixedSizes.m2,
    height: fixedSizes.m2,
    borderRadius: borderRadius.m,
    padding: fixedSizes.s1,
    ':hover': {
      backgroundColor: colors.gray4,
    },
  },
  active: {
    backgroundColor: colors.gray4,
  },
  icon: {
    color: colors.gray,
    transitionProperty: 'stroke',
    transitionDuration: '200ms',
  },
});
