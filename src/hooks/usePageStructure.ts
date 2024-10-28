import { RouteNames } from '@/enums/routesEnum';
import AuthLayout from '@/layout/auth/AuthLayout';
import ForbiddenPage from '@/pages/forbidden/ForbiddenPage';
import LoaderPage from '@/pages/loader/LoaderPage';
import pageRoutes from '@/routers/pageRouter';
import router from '@/routers/routerRouter';
import useAuthStore from '@/store/authStore';

export const usePageStructure = () => {
    const _ = useAuthStore((state) => state.forceRender);
    const result = router.getState();

    if (!result?.name) {
        return { Layout: AuthLayout, Page: LoaderPage };
    }

    const routeName = result.name as RouteNames;

    const pageRoute = pageRoutes[routeName];

    if (!pageRoute) {
        return { Layout: AuthLayout, Page: ForbiddenPage };
    }

    if (pageRoute.isAuthPage) {
        return { Layout: AuthLayout, Page: pageRoute.Page };
    }

    return pageRoute;
};
