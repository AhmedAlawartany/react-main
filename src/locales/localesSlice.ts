import { createSlice } from '@reduxjs/toolkit';
import { lowerCase } from 'lodash';
import { getI18n } from 'react-i18next';

const initialState = {
    lang: 'en',
    isRTL: false,
};

const langRTL = ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];

export const localesSlice = createSlice({
    name: 'locales',
    initialState,
    reducers: {
        setLang: (state: any, { payload }: any) => {
            const i18n = getI18n();

            i18n.changeLanguage(payload);
            state.lang = payload;
            state.isRTL = langRTL?.includes(lowerCase(payload));

            return state;
        },
    },
});

export const { setLang } = localesSlice.actions;

export default localesSlice.reducer;
