import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchField, Input } from 'react-aria-components';
import { Button } from '@/components/core/button';
import { create, props as style, type StyleXStyles } from 'stylex';
import { colors, borderRadius } from '@/stylex/vars.stylex';

export function SearchBar({ query, onQueryChange, styling }: SearchBarProps) {
  return (
    <SearchField
      {...style(styles.base, styling)}
      value={query}
      onChange={onQueryChange}
    >
      <MagnifyingGlassIcon {...style(styles.icon)} />
      <Input
        {...style(styles.input)}
        placeholder='Buscar'
      />
      {query && (
        <Button
          styling={styles.clearButton}
          onPress={() => onQueryChange('')}
        >
          <XMarkIcon {...style(styles.clearIcon)} />
        </Button>
      )}
    </SearchField>
  );
}

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  styling?: StyleXStyles;
};

const styles = create({
  base: {
    display: 'flex',
    height: '2.25rem',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: borderRadius.small,
    backgroundColor: colors.secondaryBackground,
    padding: '0 8px',
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
    flexShrink: 0,
    color: colors.gray,
  },
  input: {
    width: '100%',
    outline: 'none',
    '::-webkit-search-cancel-button': {
      appearance: 'none',
    },
  },
  clearButton: {
    width: '1.25rem',
    height: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray,
    padding: 0,
    flexShrink: 0,
  },
  clearIcon: {
    width: '0.75rem',
    height: '0.75rem',
    strokeWidth: '2',
    color: colors.background,
  },
});
