import type { StateStorage } from 'zustand/middleware';

// SSR, tests, and unsupported runtimes use an isolated in-memory store.
const values = new Map<string, string>();

const stateStorage: StateStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => {
    values.set(key, value);
  },
  removeItem: (key) => {
    values.delete(key);
  },
};

export default stateStorage;
