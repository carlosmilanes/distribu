import { renderHook } from '@testing-library/react';
import { useStableCallback } from '../use-stable-callback';
import { describe, it, expect, vi } from 'vitest';

describe('useStableCallback', () => {
  it('should return a stable function reference across re-renders', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(({ cb }) => useStableCallback(cb), {
      initialProps: { cb: callback },
    });

    const stableCallback = result.current;

    // Re-render with new callback
    const newCallback = vi.fn();
    rerender({ cb: newCallback });

    // Function reference should remain stable
    expect(result.current).toBe(stableCallback);
  });

  it('should call the latest callback version', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(({ cb }) => useStableCallback(cb), {
      initialProps: { cb: callback1 },
    });

    // Call with first callback
    result.current('test-arg');
    expect(callback1).toHaveBeenCalledWith('test-arg');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    // Update to second callback
    rerender({ cb: callback2 });

    // Call should now use second callback
    result.current('new-arg');
    expect(callback2).toHaveBeenCalledWith('new-arg');
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledTimes(1); // Should not be called again
  });

  it('should preserve callback arguments and return value', () => {
    const callback = vi.fn((a: number, b: string) => `${a}-${b}`);

    const { result } = renderHook(() => useStableCallback(callback));

    const returnValue = result.current(42, 'test');

    expect(callback).toHaveBeenCalledWith(42, 'test');
    expect(returnValue).toBe('42-test');
  });

  it('should handle callback without arguments', () => {
    const callback = vi.fn(() => 'no-args');

    const { result } = renderHook(() => useStableCallback(callback));

    const returnValue = result.current();

    expect(callback).toHaveBeenCalledWith();
    expect(returnValue).toBe('no-args');
  });

  it('should handle multiple rapid callback updates', () => {
    const callbacks = [vi.fn(), vi.fn(), vi.fn()];

    const { result, rerender } = renderHook(({ cb }) => useStableCallback(cb), {
      initialProps: { cb: callbacks[0] },
    });

    const stableRef = result.current;

    // Rapidly update callbacks
    rerender({ cb: callbacks[1] });
    rerender({ cb: callbacks[2] });

    // Function reference should still be stable
    expect(result.current).toBe(stableRef);

    // Should call the latest callback
    result.current('final-test');
    expect(callbacks[2]).toHaveBeenCalledWith('final-test');
    expect(callbacks[0]).not.toHaveBeenCalled();
    expect(callbacks[1]).not.toHaveBeenCalled();
  });
});
