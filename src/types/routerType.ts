import { RouteNames } from '@/enums/routesEnum';
import { UserRole } from '@/enums/userEnum';
import { FunctionComponent, ReactNode } from 'react';

interface PageRoute {
    Layout: FunctionComponent<{ children: ReactNode }>;
    Page: FunctionComponent;
    isAuthPage: boolean;
    allowedRoles: UserRole[];
}

type PageRoutes = {
    [key in RouteNames]: PageRoute;
};

export default PageRoutes;
