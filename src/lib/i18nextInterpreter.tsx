'use client';
import i18next from 'i18next';
import commonEn from './locales/en/common.json';
import commonVi from './locales/vi/common.json';
import { useLanguageStore } from '@/store';

export const defaultNS = 'common';

export const resources = {
  en: {
    common: commonEn,
  },
  vi: {
    common: commonVi,
  },
};

// Synchronous i18next initialization to avoid delay
i18next.init({
  resources,
  lng: 'en', // default language
  defaultNS,
  debug: false,
});

/**
 *
 */
export default function i18nextInterpreter() {
  const { language, setLanguage } = useLanguageStore();
  // Initialize language in i18next when the component mounts
  i18next.changeLanguage(language);
  // Function to change the language
  const changeLanguage = (lng: string) => {
    if (language !== lng) {
      i18next.changeLanguage(lng);
      setLanguage(lng);
    }
  };

  return { language, changeLanguage, resources, translate: i18next.t };
}
