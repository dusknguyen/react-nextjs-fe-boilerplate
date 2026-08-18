'use client';

import { useCallback, useState } from 'react';

/** Options for a value that can be controlled by props or owned internally. */
export interface ControllableStateOptions<Value> {
  value?: Value;
  defaultValue: Value;
  onChange?: (value: Value) => void;
}

/** Implements the controlled/uncontrolled state contract used by library inputs. */
export function useControllableState<Value>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<Value>): readonly [Value, (next: Value) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : internalValue;

  const setValue = useCallback((next: Value) => {
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  }, [controlled, onChange]);

  return [current, setValue] as const;
}
