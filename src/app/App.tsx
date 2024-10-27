import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { pageStructure } from 'utilities';
import MainRouter from 'router/mainRouter';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HelmetProvider>
                    <MainRouter />
                </HelmetProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;
