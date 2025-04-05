import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchField, Input } from 'react-aria-components';
import { Button } from '@/components/core/button';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../stylex/vars.stylex';

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function SearchBar({
  query,
  onQueryChange,
  ...otherProps
}: SearchBarProps) {
  return (
    <SearchField
      value={query}
      onChange={onQueryChange}
      {...props(SearchBarStyles.base)}
      {...otherProps}
    >
      <MagnifyingGlassIcon {...props(SearchBarStyles.icon)} />
      <Input
        placeholder='Buscar'
        {...props(SearchBarStyles.input)}
      />
      {query && (
        <Button
          onPress={() => onQueryChange('')}
          {...props(SearchBarStyles.clearButton)}
        >
          <XMarkIcon {...props(SearchBarStyles.clearIcon)} />
        </Button>
      )}
    </SearchField>
  );
}

const SearchBarStyles = create({
  base: {
    display: 'flex',
    height: '36px',
    alignItems: 'center',
    gap: '8px',
    borderRadius: borderRadius.medium,
    backgroundColor: colors.secondaryBackground,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  icon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    color: colors.gray,
  },
  input: {
    width: '100%',
    fontSize: '18px',
    outline: 'none',
    '::-webkit-search-cancel-button': {
      appearance: 'none',
    },
  },
  clearButton: {
    display: 'flex',
    width: '18px',
    height: '18px',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray,
    padding: '2px',
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      backgroundColor: 'rgba(142, 142, 147, 0.4)',
    },
    ':active': {
      backgroundColor: 'rgba(142, 142, 147, 0.5)',
    },
  },
  clearIcon: {
    width: '100%',
    height: '100%',
    strokeWidth: '2',
    color: colors.background,
  },
});
