import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import App from 'app/App';

import 'theme/theme.scss';
// import { apiSlice } from 'app/api/apiSlice';

// store.dispatch(apiSlice.endpoints.getUsers.initiate());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
