import { FallbackScreen } from '@client/components/pages/auth/FallbackScreen';
import { useAuth } from '@client/hooks';
import { authApi } from '@client/store/services/auth';
import { Navigate, Outlet, useLocation } from 'react-router';

export const UnProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, token } = useAuth();
  const { isLoading: isFetchingRefreshToken } = authApi.useRefreshQuery({
    resetOnFailure: false,
  });

  return isFetchingRefreshToken ? (
    <FallbackScreen />
  ) : isAuthenticated && token ? (
    <Navigate to={'/'} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
