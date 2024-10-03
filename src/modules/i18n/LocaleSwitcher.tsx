'use client';
import i18nextInterpreter from '@/lib/i18nextInterpreter';
import { Dropdown } from 'react-bootstrap';

/**
 *
 */
export default function LocaleSwitcher() {
  const { language, changeLanguage, resources } = i18nextInterpreter();

  // Get available locales from resources
  const availableLocales = Object.keys(resources);

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {language}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {availableLocales.map((locale) => (
          <Dropdown.Item key={locale} onClick={() => handleLanguageChange(locale)}>
            {locale.toUpperCase()} {/* Display the language code */}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
