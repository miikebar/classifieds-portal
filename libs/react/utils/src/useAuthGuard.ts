import { Route } from '@listic/feature/route';
import { useAuth } from '@listic/react/auth/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface UseAuthGuardProps {
  requireAuth: boolean;
}

export const useAuthGuard = (
  { requireAuth = true }: UseAuthGuardProps = { requireAuth: true }
) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated !== requireAuth) {
      router.push(isAuthenticated ? Route.LANDING_PAGE : Route.AUTH.SIGN_IN);
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);
};
