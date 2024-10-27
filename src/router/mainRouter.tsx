import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import AppLayout from 'layout/appLayout/Applayout';
// import AuthLayout from 'layout/auth';
import { useSelector } from 'react-redux';

const ErrorPage = lazy(() => import('pages/ErrorPage'));
const Signin = lazy(() => import('pages/signin'));
const Home = lazy(() => import('pages/home'));

const MainRouter = () => {
    const navigateTo = useNavigate();
    const accessRoutes = [
        {
            name: 'dashboard',
            path: '/',
            element: <Home />,
        },
    ];

    const noAccessRoutes = [
        {
            name: 'signin',
            path: '/signin',
            element: <Signin />,
        },
        {
            name: 'test',
            path: '/test',
            element: (
                <div>
                    public test page{' '}
                    <button
                        onClick={() => {
                            navigateTo('/dashboard');
                        }}
                    >
                        dashboard
                    </button>
                </div>
            ),
        },
        {
            name: 'dashboard',
            path: '/dashboard',
            element: (
                <div>
                    public dashboard page
                    <button
                        onClick={() => {
                            navigateTo('/signin');
                        }}
                    >
                        back to signin
                    </button>
                </div>
            ),
        },
    ];

    const auth = useSelector((state) => state.auth) || {};
    const access = auth.auth?.entities?.token;

    return (
        <Routes>
            {access ? (
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    {accessRoutes.map(({ path, element }, i) => (
                        <Route
                            key={`${i}-access-route`}
                            path={path}
                            element={
                                <ErrorBoundary
                                    fallback={<ErrorPage />}
                                    onError={(err) => console.log('Error boundary', err)}
                                >
                                    <Suspense fallback={null}>{element}</Suspense>
                                </ErrorBoundary>
                            }
                        />
                    ))}

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            ) : (
                <>
                    {noAccessRoutes.map(({ path, element }, i) => (
                        <Route
                            key={`${i}-no-access-route`}
                            path={path}
                            element={
                                <ErrorBoundary
                                    fallback={<ErrorPage />}
                                    onError={(err) => console.log('Error boundary', err)}
                                >
                                    <Suspense fallback={null}>{element}</Suspense>
                                </ErrorBoundary>
                            }
                        />
                    ))}
                    <Route path="*" element={<Navigate to="/signin" replace />} />
                </>
            )}
        </Routes>
    );
};

export default MainRouter;
