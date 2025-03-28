'use client';
import { twMerge } from 'tailwind-merge';

export function Switch({
  active,
  onChange,
  className,
}: {
  active: boolean;
  onChange: (active: boolean) => void;
  className?: string;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={active}
      onClick={(e) => {
        e.preventDefault();
        onChange(!active);
      }}
      className={twMerge(
        'relative h-6 w-10 rounded-full transition-colors duration-200 ease-in-out',
        active ? 'bg-success-500' : 'bg-primary-200',
        className
      )}
    >
      <span
        className={twMerge(
          'absolute top-1 block h-4 w-4 rounded-full bg-primary-50 shadow-md transition-transform duration-200 ease-in-out',
          active ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  );
}
