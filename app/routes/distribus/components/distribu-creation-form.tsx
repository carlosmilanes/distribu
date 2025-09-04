import { PrimaryButton } from '@/app/components/buttons/primary-button';
import { type PressEvent } from 'react-aria-components';
import { create, props, type StyleXStyles } from 'stylex';
import { useFetcher, useNavigate } from 'react-router';
import { colors, dynamicSizes, fontSizes } from '@/app/styles/vars.stylex';
import { useRef, useEffect, useState } from 'react';
import { createSlug } from '@/app/utils/slug';
import { Form } from 'react-router';
import { createDistribu } from '@/data/database/mutations/distribus';

/**
 * React Router form for creating a new distribu
 *
 * @returns Form element for entering distribu name
 */
export function DistribuCreationForm({
  styleProps,
}: {
  styleProps?: StyleXStyles;
}) {
  const fetcher = useFetcher();
  const [inputValue, setInputValue] = useState('');

  return (
    <fetcher.Form
      {...props(styleProps)}
      method='post'
    >
      <NameInput
        value={inputValue}
        onChange={setInputValue}
      />
      <SubmitButton disabled={inputValue.trim() === ''} />
    </fetcher.Form>
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
  return (
    <PrimaryButton
      styleProps={styles.button}
      type='submit'
      isDisabled={disabled}
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
    // borderBottom: `1px solid ${colors.gray4}`,
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
