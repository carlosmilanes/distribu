import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchField, Input } from 'react-aria-components';
import { Button } from './core/button';
import { create, props as style, type StyleXStyles } from 'stylex';
import {
  colors,
  borderRadius,
  fixedSizes,
  dynamicSizes,
} from '@/app/styles/vars.stylex';

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
    height: dynamicSizes.m2,
    alignItems: 'center',
    gap: fixedSizes.s2,
    borderRadius: borderRadius.m,
    backgroundColor: colors.secondaryBackground,
    padding: `0 ${fixedSizes.s2}`,
  },
  icon: {
    width: dynamicSizes.s4,
    height: dynamicSizes.s4,
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
    width: dynamicSizes.s4,
    height: dynamicSizes.s4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray,
    padding: 0,
    flexShrink: 0,
  },
  clearIcon: {
    width: dynamicSizes.s3,
    height: dynamicSizes.s3,
    strokeWidth: '2',
    color: colors.background,
  },
});
