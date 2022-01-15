import { AuthSignInForm } from '@listic/feature/auth';
import { getAuthLayout, PageWithLayout } from '@listic/feature/layout';
import { useAuthGuard } from '@listic/react/utils';
import { NextSeo } from 'next-seo';

const SignUpPage: PageWithLayout = () => {
  useAuthGuard({ requireAuth: false });
  return (
    <>
      <NextSeo title="Logowanie" />
      <AuthSignInForm />
    </>
  );
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
