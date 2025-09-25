import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import your translation files
import en from './locales/en.json';
import hi from './locales/hi.json';

// Your translations
const resources = {
  en: en,
  hi: hi,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Localization.locale.split('-')[0], // detect user's language
    fallbackLng: 'en', // use English if the detected language is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;