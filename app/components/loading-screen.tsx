import { create, props, keyframes } from 'stylex';
import { colors } from '../styles/vars.stylex';

export function LoadingScreen() {
  return (
    <div {...props(styles.container)}>
      <div {...props(styles.spinner)} />
    </div>
  );
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const styles = create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  spinner: {
    width: '40px',
    height: '40px',
    // border: '4px solid',
    // borderColor: `${colors.gray3} transparent ${colors.gray3} transparent`,
    // borderTop: `4px solid ${colors.income}`,
    borderRadius: '50%',
    animationName: spin,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
});
