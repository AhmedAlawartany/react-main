import { State } from 'router5';
import { RouteNames } from '@/enums/routesEnum';
import useAuthStore from '@/store/authStore';
import { DoneFn } from 'router5/dist/types/base';

const protectRouterMiddleware = () => (toState: State, fromState: State, done: DoneFn) => {
    const authToken: string = useAuthStore.getState().accessToken?.token;

    const publicRoutes: RouteNames[] = [RouteNames.Login, RouteNames.Register];

    if (!authToken && !publicRoutes.includes(toState.name as RouteNames)) {
        done({
            redirect: {
                name: RouteNames.Login,
                params: { redirect: toState.path },
            },
        });
    } else {
        done();
    }

    useAuthStore.getState().forceRenderUpdate();
};

export default protectRouterMiddleware;
