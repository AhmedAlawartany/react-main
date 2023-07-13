import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { Header, Footer } from '../components';
import { ErrorBoundary } from 'react-error-boundary';

interface AuthLayoutProps {
    children: ReactNode;
}

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

export const AuthLayout = memo(({ children }: AuthLayoutProps) => {
    return (
        <Main>
            <Header />
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <Content className="flex justify-center items-center">{children}</Content>
            </ErrorBoundary>
            <Footer />
        </Main>
    );
});
