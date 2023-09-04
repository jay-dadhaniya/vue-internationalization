import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

function checkDefaultLanguage() {
  let matched = null;
  let languages = Object.getOwnPropertyNames(loadLocaleMessages());
  languages.forEach((lang) => {
    if (lang === navigator.language) {
      matched = lang;
    }
  });
  if (!matched) {
    languages.forEach((lang) => {
      let languagePartials = navigator.language.split("-")[0];
      if (lang === languagePartials) {
        matched = lang;
      }
    });
  }
  if (!matched) {
    languages.forEach((lang) => {
      let languagePartials = navigator.language.split("-")[0];
      if (lang.split("-")[0] === languagePartials) {
        matched = lang;
      }
    });
  }
  console.log("matched", matched);
  return matched;
}

export const selectedLocale = checkDefaultLanguage();

export const languages = Object.getOwnPropertyNames(loadLocaleMessages());

const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency',
      currency: 'USD'
    }
  },
  'ja-JP': {
    currency: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol'
    }
  }
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'hi',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'hi',
  messages: loadLocaleMessages(),
  dateTimeFormats,
  numberFormats
})
