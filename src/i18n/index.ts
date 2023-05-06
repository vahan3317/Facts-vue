import { createI18n } from 'vue-i18n';
import enLocale from '../../locales/en.json';
import ruLocale from '../../locales/ru.json';

const messages = {
  en: enLocale,
  ru: ruLocale
};

const i18n = createI18n({
  legacy: false,
  locale: 'en', // Set the default locale to 'ru'
  fallbackLocale: 'en',
  messages
});

export default i18n;
