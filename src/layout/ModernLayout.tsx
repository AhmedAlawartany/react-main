import Views from 'pages';

import { ReactNode } from 'react';
import { CommonProps } from 'components/PageContainer';
import { HEADER_HEIGHT_CLASS } from 'constants/theme.constant';

const HeaderActionsStart = () => {
    return (
        <>
            <div>SideNavToggle</div>
        </>
    );
};

const HeaderActionsEnd = () => {
    return (
        <>
            <div>SidePanel</div>
        </>
    );
};

export const ModernLayout = () => {
    return (
        <div className="app-layout-modern flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                SideNav
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                    <Header
                        className="border-b border-gray-200 "
                        headerEnd={<HeaderActionsEnd />}
                        headerStart={<HeaderActionsStart />}
                    />
                    <Views />
                </div>
            </div>
        </div>
    );
};

export default ModernLayout;

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode;
    headerEnd?: ReactNode;
    headerMiddle?: ReactNode;
    container?: boolean;
}

const Header = (props: HeaderProps) => {
    const { headerStart, headerEnd, headerMiddle, className, container } = props;

    return (
        <header className={'header'}>
            <div
                className={`header-wrapper ${className} ${HEADER_HEIGHT_CLASS} ${
                    container ? 'container mx-auto' : ''
                }`}
            >
                <div className="header-action header-action-start">{headerStart}</div>
                {headerMiddle && (
                    <div className="header-action header-action-middle">{headerMiddle}</div>
                )}
                <div className="header-action header-action-end">{headerEnd}</div>
            </div>
        </header>
    );
};
