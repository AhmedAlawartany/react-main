import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from 'app/App';
import { store, persistor } from 'app/store';
import { I18nProvider } from './locales';
import 'theme/theme.scss';
// import { apiSlice } from 'app/api/apiSlice';

// store.dispatch(apiSlice.endpoints.getUsers.initiate());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <I18nProvider>
                    <App />
                </I18nProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
);
