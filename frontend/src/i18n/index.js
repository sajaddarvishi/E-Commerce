import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';  // English translations
import fa from './fa';  // Persian translations

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
    },
    lng: 'fa',    // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
