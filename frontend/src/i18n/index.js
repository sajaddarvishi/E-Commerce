import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './fa';  // Persian translations

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
    },
    lng: 'fa',    // Set Persian as the only language
    fallbackLng: 'fa',  // No fallback, always Farsi
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
