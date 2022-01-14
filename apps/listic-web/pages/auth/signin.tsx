import { AuthSignInForm } from '@listic/feature/auth';
import { getAuthLayout, PageWithLayout } from '@listic/feature/layout';
import { useAuthGuard } from '@listic/react/utils';

const SignUpPage: PageWithLayout = () => {
  useAuthGuard({ requireAuth: false });
  return <AuthSignInForm />;
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
