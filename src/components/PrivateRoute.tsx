import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useAuthentication();

    console.log(isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;

};

export default PrivateRoute