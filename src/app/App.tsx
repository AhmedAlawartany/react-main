import { useRouteNode } from 'react-router5';
import { pageStructure } from 'utilities';

function App() {
    const { route } = useRouteNode('');
    const { Layout, Page } = pageStructure(route);

    return (
        <div className="App">
            <Layout>
                <Page />
            </Layout>
        </div>
    );
}
export default App;
