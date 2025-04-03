import { useEffect, useRef } from 'react';

export function EscapeHelper({
  fn,
  children,
  className,
}: {
  fn: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (
        ref.current &&
        e.composedPath() &&
        !e.composedPath().includes(ref.current)
      ) {
        fn();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        fn();
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [fn]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}
