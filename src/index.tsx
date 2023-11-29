import React from 'react';
import { RouterProvider } from 'react-router5';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from 'app/App';
import { store, persistor, router } from 'app/store';
import { I18nProvider } from './locales';
import 'theme/theme.scss';
// import { apiSlice } from 'app/api/apiSlice';

// store.dispatch(apiSlice.endpoints.getUsers.initiate());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router}>
                    <I18nProvider>
                        <App />
                    </I18nProvider>
                </RouterProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
