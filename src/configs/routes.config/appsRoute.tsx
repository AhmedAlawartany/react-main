import { ADMIN, USER } from 'constants/roles.constant';
import { lazy } from 'react';

import type { Routes } from 'types/routes';

export const appsRoute: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('pages/home')),
        authority: [ADMIN, USER],
    },
    /** Example purpose only, please remove */
];
export default appsRoute;
