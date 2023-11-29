import { persistor, store } from 'app/store';
import { PUBLIC_ROUTES } from 'constants';
import get from 'lodash/get';

const authenticationMiddleware = () => (toState: any, fromState: any, done: any) => {
    const authAction = () => {
        const nextState = get(toState, 'name', null);
        const hasAccessToken = store.getState().auth?.entities?.token;
        const auth = store.getState().auth;
        const isPublicRoute = PUBLIC_ROUTES.includes(nextState);

        const isPrivatePage = !isPublicRoute && hasAccessToken;
        const isPublicPage = isPublicRoute && !hasAccessToken;
        console.log(auth, 'hasAccessTokenhasAccessToken');
        if (isPrivatePage || isPublicPage) {
            done();
            return;
        }

        if (hasAccessToken) {
            if (nextState === 'dashboard') {
                done();
                return;
            }

            done({
                redirect: {
                    name: 'dashboard',
                    path: '/',
                    meta: { options: { replace: true }, redirected: true },
                },
            });
            return;
        }
        if (nextState === 'signin') {
            done();
            return;
        }
        done({
            redirect: {
                name: 'signin',
                path: '/signin',
                meta: { options: { replace: true }, redirected: true },
            },
        });
        return;
    };

    if (persistor.getState().bootstrapped) authAction();
    persistor.subscribe(authAction);
};

export default authenticationMiddleware;
