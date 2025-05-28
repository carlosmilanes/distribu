import { PrimaryText } from './text/primary-text';
import { create, props } from 'stylex';
import {
  colors,
  borderRadius,
  fixedSizes,
} from '@/app/styles/vars.stylex';

export function TopBar({
  title,
  children,
  ...otherProps
}: {
  title: string;
  children?: React.ReactNode;
}) {
  /*
  A top navigation bar component that displays a title and optional elements.
  Any child components passed will be rendered as options in the top right corner of the bar.
   */
  return (
    <div
      {...props(TopBarStyles.base)}
      {...otherProps}
    >
      <PrimaryText>{title}</PrimaryText>
      <div {...props(TopBarStyles.options)}>{children}</div>
    </div>
  );
}

const TopBarStyles = create({
  base: {
    borderBottom: `1px solid ${colors.gray4}80`,
    backgroundColor: `${colors.background}99`,
    display: 'flex',
    height: fixedSizes.m3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: borderRadius.l,
    borderTopRightRadius: borderRadius.l,
    paddingLeft: fixedSizes.s4,
    paddingRight: fixedSizes.s4,
    backdropFilter: 'blur(20px)',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    gap: fixedSizes.s2,
  },
});
