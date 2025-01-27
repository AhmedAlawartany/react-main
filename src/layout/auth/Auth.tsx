import styled from 'styled-components';
import { Header, Footer } from '../components';
import Views from 'pages';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 360px;
`;

const Content = styled('div')`
    z-index: 1;
    width: 100%;
    flex-grow: 1;
    max-width: 1280px;
    margin: 0 auto;
`;

const AuthLayout = () => {
    return (
        <Main>
            <Header />

            <Content className="flex justify-center items-center">
                <Views />
            </Content>
            <Footer />
        </Main>
    );
};

export default AuthLayout;
