import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const middleware = [apiSlice.middleware];

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            // .concat(logger)
            .concat(middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
