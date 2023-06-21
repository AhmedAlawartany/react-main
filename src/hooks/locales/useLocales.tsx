import { store } from 'app/store';
import { useTranslation, Trans } from 'react-i18next';

import 'moment/locale/ar';
import 'moment/locale/fr';
import moment from 'moment';

const langSelector = (state: any) => state.auth?.entities?.payload?.user_setting?.language;
const dateFormatSelector = (state: any) => state.auth?.entities?.payload?.user_setting?.dateFormat;

const getSetting = () => {
    return {
        lang: langSelector(store?.getState?.()),
        dateFormat: dateFormatSelector(store?.getState?.()),
    };
};

export function formatDate(value: any, fmt: any) {
    const { lang, dateFormat } = getSetting();

    moment.locale(lang || 'he');
    return moment(value).format(fmt || dateFormat);
}

export const useLocales = () => {
    const { t, i18n } = useTranslation();

    return { formatDate, trans: t, Trans, i18n };
};
