import { create, props } from 'stylex';

export type TextProps = {
  children: React.ReactNode;
};

export function Text({ children }: TextProps) {
  return <div {...props(TextStyles.all)}>{children}</div>;
}

const TextStyles = create({
  all: {
    display: 'flex',
    width: 'min-content',
    whiteSpace: 'nowrap',
  },
});
