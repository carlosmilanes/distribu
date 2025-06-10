import { PrimaryButton } from '@/app/components/buttons/primary-button';
import { create, props, type StyleXStyles } from 'stylex';
import { Form } from 'react-router';
import { dynamicSizes, fontSizes } from '@/app/styles/vars.stylex';
import { useRef, useEffect } from 'react';

/**
 * React Router form for creating a new distribu
 *
 * @returns Form element for entering distribu name
 */
export function DistribuCreationForm({ styling }: { styling?: StyleXStyles }) {
  return (
    <Form
      {...props(styles.form, styling)}
      method='post'
    >
      <NameInput />
      <SubmitButton />
    </Form>
  );
}

function NameInput() {
  const inputRef = useAutoFocus();

  return (
    <input
      {...props(styles.input)}
      ref={inputRef}
      type='text'
      id='name'
      name='name'
      required
      placeholder='Pick a name...'
      aria-label='New distribu name'
    />
  );
}

/**
 * Custom hook for automatically focusing an input element
 *
 * @returns Ref object to be attached to an input element
 */
function useAutoFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
}

function SubmitButton() {
  return (
    <PrimaryButton
      styling={styles.button}
      type='submit'
      onPress={() => {}}
    >
      Let's go!
    </PrimaryButton>
  );
}

const styles = create({
  form: {
    width: '100%',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#111827',
  },

  input: {
    width: '100%',
    marginBottom: dynamicSizes.m1,
    padding: '0.5rem 0',
    border: 'none',
    borderBottom: '1px solid #d1d5db',
    fontSize: fontSizes.l,
    ':focus': {
      outline: 'none',
    },
    '::placeholder': {
      fontStyle: 'italic',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
  },

  button: {
    margin: '0 auto',
    fontSize: fontSizes.l,
  },
});
