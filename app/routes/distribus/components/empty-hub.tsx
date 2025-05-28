import { PrimaryButton } from '@/app/components/buttons/primary-button';
import {
  colors,
  fixedSizes,
  fontSizes,
  fontWeights,
  shadows,
} from '@/app/styles/vars.stylex';
import { borderRadius } from '@/app/styles/vars.stylex';
import { create, props } from 'stylex';

/**
 * EmptyHub displays a full-page empty state when no distribus exist.
 * Prompts the user to create their first distribu with a prominent button.
 *
 * @returns Full viewport empty state UI with create button
 */
export function EmptyHub() {
  return (
    <main
      {...props(styles.base)}
      aria-label='No distribus'
    >
      <h1 {...props(styles.emptyTitle)}>No Distribus Here</h1>
      <p {...props(styles.emptyDescription)}>Get started by creating one</p>
      <CreateDistribuButtonLarge />
    </main>
  );
}

/**
 * Large, prominent button for creating the first distribu in the empty state.
 *
 * @returns Button element
 */
function CreateDistribuButtonLarge() {
  const handleCreateClick = () => {
    // TODO: Implement create distribu modal/form
  };
  return (
    <PrimaryButton
      styling={styles.button}
      onPress={handleCreateClick}
      aria-label='Create your first distribu'
    >
      Create Distribu
    </PrimaryButton>
  );
}

// Styles
const styles = create({
  base: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    textAlign: 'center',
    padding: fixedSizes.m2,
  },
  emptyTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.text,
    letterSpacing: '-0.01em',
  },
  emptyDescription: {
    fontSize: fontSizes.l,
    color: colors.gray,
    marginBottom: fixedSizes.m2,
  },
  button: {
    fontSize: fontSizes.xl,
  },
});
