'use client';
import { cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';

export function ToggleOptionButton({
  children,
  active,
  activeColor = 'primary-900',
  onClick,
  className,
}: {
  children: React.ReactElement;
  active: boolean;
  activeColor?: string;
  onClick: (active: boolean) => void;
  className?: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(!active);
      }}
      className={twMerge(
        'size-9 rounded-lg p-1 hover:bg-primary-100',
        active && 'bg-primary-100',
        className
      )}
    >
      {cloneElement(children, {
        className: twMerge(
          'text-primary-600 transition duration-200',
          active && `stroke-${activeColor}`,
          (children.props as { className?: string }).className
        ),
      } as React.HTMLAttributes<HTMLElement>)}
    </button>
  );
}
