import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import tr from './tr.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  en: en,
  tr: tr,
};
const initI18n = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('persist:app');
    if (storedLanguage) {
      const parsed = JSON.parse(storedLanguage);
      const selectedLanguage = parsed.selectedLanguage
        ? JSON.parse(parsed.selectedLanguage)
        : 'tr';
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources,
        lng: selectedLanguage || 'tr',
        interpolation: {
          escapeValue: false,
        },
        fallbackLng: 'tr',
      });

      return i18n;
    } else {
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'tr',
        interpolation: {
          escapeValue: false,
        },
        fallbackLng: 'tr',
      });
      return i18n;
    }
  } catch (error) {
    console.error('Error initializing i18n:', error);
  }
};
export type Resource = keyof typeof tr | keyof typeof en;
export const getLanguage = () => i18n.language;

export const getResourceByKey = (key: Resource) => {
  let language = getLanguage();
  let res = resources as any;
  return res[language][key];
};
export default initI18n;
