const fs = require('fs');
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;

const enTranslations = require('./en.json');
const targetLocales = ['hi', 'fr', 'es']; // Add more locales as needed
const googleApiKey = 'AIzaSyC9EGVsz0QF9d_412LIilFmJHsI2WwL7wY'; // Replace with your API key

const translate = new Translate({ key: googleApiKey });

const generateTranslations = async () => {
  for (const locale of targetLocales) {
    const translatedData = await translateData(enTranslations, locale);

    const targetPath = path.join(__dirname, `${locale}.json`);
    fs.writeFileSync(targetPath, JSON.stringify(translatedData, null, 2));
    console.log(`Generated ${locale}.json`);
  }
};

const translateData = async (data, targetLocale) => {
  const translatedData = {};

  for (const key in data) {
    if (typeof data[key] === 'string') {
      translatedData[key] = await translateText(data[key], targetLocale);
    } else if (typeof data[key] === 'object') {
      translatedData[key] = await translateData(data[key], targetLocale);
    }
  }

  return translatedData;
};

const translateText = async (text, targetLocale) => {
  try {
    // Extract text within curly braces and words starting with "@" and replace them with placeholders
    const placeholders = [];
    const textWithPlaceholders = text.replace(/(\{[^}]*\}|@[^ ]+)/g, (_, placeholder) => {
      placeholders.push(placeholder);
      return `{${placeholders.length - 1}}`;
    });

    // Translate the text without placeholders
    const [translation] = await translate.translate(textWithPlaceholders, targetLocale);
    // Replace the placeholders with the extracted text
    const translatedText = translation.replace(/\{(\d+)\}/g, (_, index) => `${placeholders[index]}`);

    return translatedText;
  } catch (error) {
    console.error(`Translation failed: ${error.toString()}`);
    return text; // Fallback to the original text
  }
};

console.log('Translations Generator Started');

generateTranslations();



