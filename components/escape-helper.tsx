import { useEffect, useRef } from 'react';
import { create, props } from 'stylex';

export function EscapeHelper({
  fn,
  children,
  ...otherProps
}: {
  fn: () => void;
  children: React.ReactNode;
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
      {...props(EscapeHelperStyles.base)}
      {...otherProps}
    >
      {children}
    </div>
  );
}

const EscapeHelperStyles = create({
  base: {
    // Base styles can be added here if needed
  },
});
