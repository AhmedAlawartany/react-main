import { lazy } from 'react';
// import type { Routes } from '@/@types/routes';

const authRoute = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('pages/signin')),
        authority: [],
    },
];

export default authRoute;
