import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store, persistor } from 'app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { I18nProvider } from 'locales';
import Layout from 'layout/Layouts';

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <I18nProvider>
                    <BrowserRouter>
                        <HelmetProvider>
                            <Layout />
                        </HelmetProvider>
                    </BrowserRouter>
                </I18nProvider>
            </PersistGate>
        </Provider>
    );
}
export default App;
