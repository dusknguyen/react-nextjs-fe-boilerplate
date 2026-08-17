import type { StateStorage } from 'zustand/middleware';

const memory = new Map<string, string>();

function getWebStorage(): Storage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

const stateStorage: StateStorage = {
  getItem: (key) => getWebStorage()?.getItem(key) ?? memory.get(key) ?? null,
  setItem: (key, value) => {
    const storage = getWebStorage();
    if (storage) storage.setItem(key, value);
    else memory.set(key, value);
  },
  removeItem: (key) => {
    getWebStorage()?.removeItem(key);
    memory.delete(key);
  },
};

export default stateStorage;
