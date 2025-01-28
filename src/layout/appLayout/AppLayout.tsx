import ClipLoader from 'react-spinners/ClipLoader';
import { Outlet } from 'react-router-dom';
import { Box, LayoutBody, LayoutChild } from './LayoutTheme';
import Container from './Container';

function AppLayout({ isLoading, ...rest }: Readonly<{ [key: string]: any }>) {
    if (isLoading)
        return (
            <Box>
                <ClipLoader size={75} />
            </Box>
        );
    return (
        <LayoutBody>
            <Container {...rest}>
                <LayoutChild id="LayoutChild">
                    <Outlet />
                </LayoutChild>
            </Container>
        </LayoutBody>
    );
}
export default AppLayout;
