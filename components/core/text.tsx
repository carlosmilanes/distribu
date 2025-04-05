import { create, props } from 'stylex';

export type TextProps = {
  children: React.ReactNode;
};

export function Text({ children }: TextProps) {
  return <div {...props(TextStyles.base)}>{children}</div>;
}

const TextStyles = create({
  base: {
    display: 'flex',
    width: 'min-content',
    whiteSpace: 'nowrap',
  },
});
