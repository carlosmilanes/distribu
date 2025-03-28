import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchField, Input } from 'react-aria-components';
import { Button } from '@/components/Button';

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  className?: string;
};

export function SearchBar({ query, onQueryChange, className }: SearchBarProps) {
  return (
    <SearchField
      value={query}
      onChange={onQueryChange}
      className={`flex h-9 items-center space-x-2 rounded-lg bg-secondary-background px-2 ${className}`}
    >
      <MagnifyingGlassIcon className="size-5 shrink-0 text-gray" />
      <Input
        placeholder="Buscar"
        className="w-full text-lg focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
      {query && (
        <Button
          onPress={() => onQueryChange("")}
          className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-gray p-0.5 transition-colors hover:bg-gray/40 active:bg-gray/50"
        >
          <XMarkIcon className="size-full stroke-2 text-white" />
        </Button>
      )}
    </SearchField>
  );
}
