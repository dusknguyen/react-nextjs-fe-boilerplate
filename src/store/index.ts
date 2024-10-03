// path: /store/sidebarStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageState, SidebarState } from '../types/store';

// Zustand store with persistence using localStorage
export const useSidebarStore = create(
  persist<SidebarState>(
    (set) => ({
      components: false,
      utilities: false,
      pages: false,
      toggleSection: (section) =>
        set((state) => ({
          ...state,
          [section]: !state[section],
        })),
    }),
    {
      name: 'sidebarOpenState', // Name of the key in localStorage
    },
  ),
);

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en', // default language
      setLanguage: (lng: string) => set({ language: lng }),
    }),
    {
      name: 'i18nextLng', // key to use in localStorage
    },
  ),
);
