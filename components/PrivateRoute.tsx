import React, { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import LoadingCircularProgress from '@/components/commons/loading';

interface PrivateRouteProps {
  children: React.ReactNode;
  accessibleUser: 'authorized' | 'unauthorized';
}

/**
 * @props children - render view component
 * @props accessibleUser - page restrictions based on accessibleUser
 */
const PrivateRoute = ({ children, accessibleUser }: PrivateRouteProps) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // authorized user redirect
    if (accessibleUser === 'unauthorized' && !isLoading && isAuthenticated) {
      router.replace('/');
    }

    // unauthorized user redirect
    if (accessibleUser === 'authorized' && !isLoading && !isAuthenticated) {
      router.replace('/');
    }
  }, [router, accessibleUser, isLoading, isAuthenticated]);

  if (accessibleUser === 'unauthorized' && (isLoading || isAuthenticated)) {
    return <LoadingCircularProgress />;
  }

  if (accessibleUser === 'authorized' && (isLoading || !isAuthenticated)) {
    return <LoadingCircularProgress />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
