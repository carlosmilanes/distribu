"use client";
import { useEffect, useRef } from "react";

export function DeletionHelper({
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
    const element = ref.current;
    if (!element) return;

    // Handle right-click
    function handleContextMenu(event: MouseEvent) {
      event.preventDefault();
      fn();
    }

    // Detect swipe start
    function handleTouchStart(event: TouchEvent) {
      if (ref.current) {
        ref.current.dataset.startX = event.touches[0].clientX.toString();
      }
    }

    // Detect swipe to the left
    function handleTouchMove(event: TouchEvent) {
      if (ref.current) {
        const startX = parseFloat(ref.current.dataset.startX || "0");
        const endX = event.touches[0].clientX;

        if (startX - endX > 50) {
          fn();
        }
      }
    }

    // Add event listeners for right-click, swipe, focus, and blur
    element.addEventListener("contextmenu", handleContextMenu);
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);

    // Clean up event listeners on unmount
    return () => {
      element.removeEventListener("contextmenu", handleContextMenu);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
    };
  }, [fn]);

  return (
    <div ref={ref} tabIndex={0} className={className}>
      {children}
    </div>
  );
}
