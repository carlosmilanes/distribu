import { PrimaryButton } from '@/app/components/buttons/primary-button';
import { create, props as style, type StyleXStyles } from 'stylex';
import { useFetcher } from 'react-router';
import { dynamicSizes, fontSizes } from '@/app/styles/vars.stylex';
import { useRef, useEffect, useState } from 'react';

/**
React Router form for creating a new distribu: a name input and a submit button.
The button is disabled while the name is blank.
*/
export function DistribuCreationForm({
  styleProps,
}: DistribuCreationFormProps) {
  const fetcher = useFetcher();
  const [inputValue, setInputValue] = useState('');

  return (
    <fetcher.Form method="post" {...style(styleProps)}>
      <NameInput value={inputValue} onChange={setInputValue} />
      <SubmitButton disabled={inputValue.trim() === ''} />
    </fetcher.Form>
  );
}

/**
Controlled text input for the distribu name. Focuses itself on mount.
*/
function NameInput({ value, onChange }: NameInputProps) {
  const inputRef = useAutoFocus();

  return (
    <input
      ref={inputRef}
      type="text"
      id="name"
      name="name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      placeholder="Pick a name..."
      aria-label="New distribu name"
      {...style(styles.input)}
    />
  );
}

/**
Focuses the input it's attached to when the component mounts.
Returns the ref to attach to the input.
*/
function useAutoFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return inputRef;
}

/**
Submit button of the form, labeled "Let's go!".
*/
function SubmitButton({ disabled }: SubmitButtonProps) {
  return (
    <PrimaryButton
      type="submit"
      isDisabled={disabled}
      styleProps={styles.button}
    >
      Let's go!
    </PrimaryButton>
  );
}

type DistribuCreationFormProps = {
  /** Styles applied to the form element */
  styleProps?: StyleXStyles;
};

type NameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

type SubmitButtonProps = {
  disabled: boolean;
};

const styles = create({
  input: {
    // size
    width: '100%',

    // content
    fontSize: fontSizes.l,
    '::placeholder': {
      fontStyle: 'italic',
    },

    // box
    paddingBlock: dynamicSizes.s1,
    paddingInline: 0,
    marginBottom: dynamicSizes.m1,
    outlineStyle: {
      default: null,
      ':focus': 'none',
    },
  },

  button: {
    // content
    fontSize: fontSizes.l,

    // box
    marginBlock: 0,
    marginInline: 'auto',
  },
});
