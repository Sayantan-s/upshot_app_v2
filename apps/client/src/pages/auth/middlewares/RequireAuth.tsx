import { FallbackScreen } from '@client/components/pages/auth/FallbackScreen';
import { useAuth } from '@client/hooks';
import { authApi } from '@client/store/services/auth';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

export const RequireAuth = () => {
  const { isAuthenticated, token, tokenMetaData, user } = useAuth();
  const effectRan = useRef(false);
  const [refresh, { isFetching }] = authApi.useLazyRefreshQuery();

  const { isLoading } = authApi.useUserQuery(
    {
      userId: tokenMetaData?.id,
    },
    {
      skip: !isAuthenticated || !!!tokenMetaData?.id,
    }
  );

  useEffect(() => {
    if (effectRan.current || !import.meta.env.DEV)
      (async () => await refresh({ resetOnFailure: true }).unwrap())();
    return () => {
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    if (token && !isAuthenticated) {
      (async () => await refresh({ resetOnFailure: true }).unwrap())();
    }
  }, [isAuthenticated, token]);

  return (
    <AnimatePresence initial={false}>
      {isFetching || (isLoading && !user) ? <FallbackScreen /> : <Outlet />}
    </AnimatePresence>
  );
};
