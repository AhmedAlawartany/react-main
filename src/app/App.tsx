import ErrorBoundary from '@/components/errorBoundary/ErrorBoundaryComponent';
import { usePageStructure } from '@/hooks/usePageStructure';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
    const { Layout, Page } = usePageStructure();
    const queryClient = new QueryClient();

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <Layout>
                        <Page />
                    </Layout>
                </HelmetProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default App;
