import { Button } from '@/app/components/core/button';
import { create, props } from 'stylex';
import { Form } from 'react-router';

/**
 * React Router form for creating a new distribu
 *
 * @returns Form element for entering distribu name
 */
export function DistribuCreationForm() {
  return (
    <Form
      method='post'
      {...props(styles.form)}
    >
      <h2 {...props(styles.title)}>Create New Distribu</h2>

      <div {...props(styles.inputGroup)}>
        <label
          htmlFor='name'
          {...props(styles.label)}
        >
          Distribu Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          placeholder='Enter distribu name...'
          {...props(styles.input)}
        />
      </div>

      <div {...props(styles.buttonGroup)}>
        <Button
          type='submit'
          styling={styles.submitButton}
          onPress={() => {}}
        >
          Create Distribu
        </Button>
      </div>
    </Form>
  );
}

const styles = create({
  form: {
    padding: '1.5rem',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#111827',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    ':focus': {
      outline: '2px solid #3b82f6',
      outlineOffset: '2px',
      borderColor: '#3b82f6',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  },
});
