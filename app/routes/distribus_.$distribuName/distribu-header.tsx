import { Heading } from '@/app/components/text/heading';
import { Button } from '@/app/components/core/button';
import { SettingsIcon } from '@/app/components/icons';
import { create, props as style } from 'stylex';
import { colors, fixedSizes, zIndices } from '@/app/styles/vars.stylex';

export function DistribuHeader({ distribuName }: { distribuName: string }) {
  return (
    <div {...style(styles.header)}>
      <Heading>{distribuName}</Heading>
      <DistribuSettings />
    </div>
  );
}

function DistribuSettings() {
  return (
    <Button styleProps={styles.settingsButton}>
      <SettingsIcon {...style(styles.settingsIcon)} />
    </Button>
  );
}

const iconSize = fixedSizes.m2;

const styles = create({
  header: {
    position: 'sticky',
    top: 0,
    padding: fixedSizes.s4,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: zIndices.elevated,
    background: `linear-gradient(to bottom, ${colors.background} 60%, transparent)`, // TODO: UNDERSTAND
  },
  settingsButton: {
    color: colors.gray,
    padding: fixedSizes.s2,
  },
  settingsIcon: {
    width: iconSize,
    height: iconSize,
  },
});
