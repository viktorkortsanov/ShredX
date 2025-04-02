import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../locals/en/translation.json'
import bgTranslation from '../locals/bg/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  bg: {
    translation: bgTranslation
  }
};

i18n

  .use(LanguageDetector)
 
  .use(initReactI18next)

  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;