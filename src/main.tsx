import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { RouterProvider } from 'react-router5';
import router from './routers/routerRouter';
import { I18nProvider } from './locales';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nProvider>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </I18nProvider>
    </React.StrictMode>,
);
