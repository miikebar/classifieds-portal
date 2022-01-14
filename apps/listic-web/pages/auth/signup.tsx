import { getAuthLayout, PageWithLayout } from '@listic/feature/layout';
import { AuthSignUpForm } from '@listic/feature/auth';
import { useAuthGuard } from '@listic/react/utils';

const SignUpPage: PageWithLayout = () => {
  useAuthGuard({ requireAuth: false });
  return <AuthSignUpForm />;
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
