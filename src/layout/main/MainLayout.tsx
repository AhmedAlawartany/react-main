import Footer from '@/components/footer/FooterComponent';
import Header from '@/components/header/HeaderComponent';
import React, { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex w-full h-full flex-col">
            <Header />
            <main className="flex w-full h-full flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
