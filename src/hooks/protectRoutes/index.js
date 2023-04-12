import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

export const ProtectRoutes = ({ roles, element }) => {
  const { cookies } = useAuth();
  const userRoles = cookies.roles || [];

  if (!cookies.token) {
    return <Navigate to='/login' exact />;
  }

  if (roles && roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
    // User does not have any of the required roles
    return <Navigate to='/unauthorized' />;
  }

  return element ? element : <Outlet />;
};
