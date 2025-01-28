import authRoute from './authRoute';

import appsRoute from './appsRoute';
import pagesRoute from './pagesRoute';

import type { Routes } from 'types/routes';

export const publicRoutes: Routes = [...authRoute];

export const protectedRoutes: Routes = [...appsRoute, ...pagesRoute];
