import { Routes } from 'types/routes';
import { ADMIN, USER } from 'constants/roles.constant';
import { lazy } from 'react';

const pagesRoute: Routes = [
    {
        key: 'pages.accessDenied',
        path: '/access-denied',
        component: lazy(() => import('pages/AccessDenied')),
        authority: [ADMIN, USER],
    },
];

export default pagesRoute;
