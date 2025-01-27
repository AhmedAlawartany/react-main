import { useMemo, lazy, Suspense } from 'react';

import useAuth from 'hooks/useAuth';
import { LAYOUT_TYPE_BLANK, LAYOUT_TYPE_MODERN } from 'constants/theme.constant';

const layouts = {
    [LAYOUT_TYPE_MODERN]: lazy(() => import('layout/ModernLayout')),
    [LAYOUT_TYPE_BLANK]: lazy(() => import('layout/auth/Auth')),
};

const Layout = () => {
    // const layoutType = useAppSelector((state) => state.theme.layout.type);
    const layoutType = 'modern';
    const { authenticated } = useAuth();

    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType];
        }
        return lazy(() => import('./auth/Auth'));
    }, [authenticated]);

    return (
        <Suspense fallback={<div className="flex flex-auto flex-col h-[100vh]">Loading...</div>}>
            <AppLayout />
        </Suspense>
    );
};

export default Layout;
