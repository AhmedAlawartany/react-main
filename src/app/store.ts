import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import reducers from './reducers';
import { apiSlice } from './api/apiSlice';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';
import { isEmpty } from 'lodash';
import routes from './routers/routes.json';
import authenticationMiddleware from './routers/middlewares/authenticationMiddleware';

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(logger)
            .concat(apiSlice.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

const router = createRouter(routes, {
    allowNotFound: false,
    autoCleanUp: true,
    defaultRoute: 'dashboard',
});

router.usePlugin(browserPlugin());

if (import.meta.env.ENABLE_ROUTER_LOGS === 'true') {
    router.usePlugin(loggerPlugin);
}

router.useMiddleware(authenticationMiddleware);
router.setDependency('store', store);

if (!isEmpty(import.meta.env.ROUTER_ROOT)) {
    router.setRootPath(import.meta.env.ROUTER_ROOT || '');
}

router.start();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor, router };

router.start();
