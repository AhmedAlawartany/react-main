import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import catalog from './catalog';

interface I18nProviderProps {
    children: React.ReactNode;
}

i18n.use(initReactI18next).init({
    resources: catalog,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

const I18nProvider = ({ children }: I18nProviderProps) => {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
