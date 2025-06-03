import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEnglish from '../Language/en/translation.json'
import translationsInArabic from '../Language/ar/translation.json'

const resources = {
    en: {
        translation: translationsInEnglish
    },
    ar: {
        translation: translationsInArabic
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("lang"),
    fallbackLng: "ar",
    interpolation: {
        escapeValue: false
    },
    ns: "translation",
    defaultNS: "translation"
});

export default i18n;