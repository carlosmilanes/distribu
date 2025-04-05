import { cloneElement } from 'react';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../stylex/vars.stylex';

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
    width: '36px',
    height: '36px',
    borderRadius: borderRadius.medium,
    padding: '4px',
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
