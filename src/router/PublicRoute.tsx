import appConfig from 'configs/app.config';
import useAuth from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
    const { authenticated } = useAuth();

    return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />;
};

export default PublicRoute;
