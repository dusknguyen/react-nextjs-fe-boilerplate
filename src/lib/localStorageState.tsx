import { useEffect, useState } from 'react';

/**
 *
 */
export default function localStorageState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const localStorageValue = localStorage.getItem(key);

    if (localStorageValue !== null) {
      setValue(JSON.parse(localStorageValue) as T);
    }
    setIsInitialized(true);
  }, [key]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isInitialized, key, value]);

  return [value, setValue] as const;
}
