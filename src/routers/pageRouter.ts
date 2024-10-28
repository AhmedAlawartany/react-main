import { RouteNames } from '@/enums/routesEnum';
import { UserRole } from '@/enums/userEnum';
import LoginPage from '@/pages/login/LoginPage';
import ProductsPage from '@/pages/products/ProductsPage';
import AuthLayout from '@/layout/auth/AuthLayout';
import MainLayout from '@/layout/main/MainLayout';
import PageRoutes from '@/types/routerType';
import RegisterPage from '@/pages/register/RegisterPage';
import { Home } from '@/pages/home';

const pageRoutes: PageRoutes = {
    [RouteNames.Login]: {
        Layout: AuthLayout,
        Page: LoginPage,
        isAuthPage: true,
        allowedRoles: [UserRole.Guest],
    },
    [RouteNames.Register]: {
        Layout: AuthLayout,
        Page: RegisterPage,
        isAuthPage: true,
        allowedRoles: [UserRole.Guest],
    },
    [RouteNames.Products]: {
        Layout: MainLayout,
        Page: ProductsPage,
        isAuthPage: false,
        allowedRoles: [UserRole.Admin, UserRole.User],
    },
    [RouteNames.Home]: {
        Layout: MainLayout,
        Page: Home,
        isAuthPage: true,
        allowedRoles: [UserRole.Admin, UserRole.User],
    },
};

export default pageRoutes;
