import { getAuthLayout, PageWithLayout } from '@listic/feature/layout';
import { AuthSignUpForm } from '@listic/feature/auth';
import { useAuthGuard } from '@listic/react/utils';
import { NextSeo } from 'next-seo';

const SignUpPage: PageWithLayout = () => {
  useAuthGuard({ requireAuth: false });
  return (
    <>
      <NextSeo title="Rejestracja" />
      <AuthSignUpForm />
    </>
  );
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
