import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { protectedRoutes, publicRoutes } from 'configs/routes.config';
import appConfig from 'configs/app.config';
import ProtectedRoute from 'router/ProtectedRoute';
import AuthorityGuard from 'router/AuthorityGuard';
import AppRoute from 'router/AppRoute';
import PublicRoute from 'router/PublicRoute';
import PageContainer from 'components/PageContainer';
// import PageContainer from 'components/template/PageContainer'

// import type { LayoutType } from '@types/theme'

type LayoutType = 'blank' | 'classic' | 'modern' | 'simple' | 'decked' | 'stackedSide';

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained';
    layout?: LayoutType;
}

type AllRoutesProps = ViewsProps;

const { authenticatedEntryPath } = appConfig;

const AllRoutes = (props: AllRoutesProps) => {
    // const userAuthority = useSelector((state) => state.auth.user.authority);

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate replace to={authenticatedEntryPath} />} />
                {protectedRoutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <AuthorityGuard userAuthority={['user']} authority={route.authority}>
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>
        </Routes>
    );
};

const Views = (props: ViewsProps) => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <AllRoutes {...props} />
        </Suspense>
    );
};

export default Views;
