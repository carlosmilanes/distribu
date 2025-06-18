import { PrimaryButton } from '@/app/components/buttons/primary-button';
import { type PressEvent } from 'react-aria-components';
import { create, props, type StyleXStyles } from 'stylex';
import { useFetcher, useNavigate } from 'react-router';
import { colors, dynamicSizes, fontSizes } from '@/app/styles/vars.stylex';
import { useRef, useEffect, useState } from 'react';
import { createSlug } from '@/app/utils/slug';
import { useDistribuCreationCallback } from '@/tinybase/stores/store';
import { Form } from 'react-router';

/**
 * React Router form for creating a new distribu
 *
 * @returns Form element for entering distribu name
 */
export function DistribuCreationForm({ styling }: { styling?: StyleXStyles }) {
  const [inputValue, setInputValue] = useState('');
  // const fetcher = useFetcher();

  return (
    <Form
      {...props(styling)}
      method='post'
    >
      <NameInput
        value={inputValue}
        onChange={setInputValue}
      />
      <SubmitButton disabled={inputValue.trim() === ''} />
    </Form>
  );
}

function NameInput({ value, onChange }: NameInputProps) {
  const inputRef = useAutoFocus();

  return (
    <input
      {...props(styles.input)}
      ref={inputRef}
      type='text'
      id='name'
      name='name'
      value={value}
      onChange={(e) => onChange(e.target.value)}
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

function SubmitButton({ disabled }: { disabled: boolean }) {
  const createDistribu = useDistribuCreationCallback();

  function handleSubmit(e: PressEvent) {
    const form = e.target.closest('form');
    if (!form) return;

    const formData = new FormData(form);
    const newDistribuName = formData.get('name') as string;
    if (!newDistribuName) return;

    try {
      const distribuId = createDistribu(newDistribuName);
      if (!distribuId) {
        throw new Error('Failed to create distribu');
      }
      // Let the form submit naturally to trigger clientAction
    } catch (error) {
      // Prevent form submission if TinyBase operation fails
      if (form) {
        form.onsubmit = (e) => e.preventDefault();
      }
      console.error(error);
    }
  }

  function testFunction() {
    console.log('testFunction');
  }

  return (
    <PrimaryButton
      styling={styles.button}
      type='submit'
      isDisabled={disabled}
      onPress={testFunction}
    >
      Let's go!
    </PrimaryButton>
  );
}

type NameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const styles = create({
  input: {
    width: '100%',
    marginBottom: dynamicSizes.m1,
    padding: `${dynamicSizes.s1} 0`,
    borderBottom: `1px solid ${colors.gray4}`,
    fontSize: fontSizes.l,
    ':focus': {
      outline: 'none',
    },
    '::placeholder': {
      fontStyle: 'italic',
    },
  },

  button: {
    margin: '0 auto',
    fontSize: fontSizes.l,
  },
});
