import { AuthSignInForm } from '@listic/feature/auth';
import { getAuthLayout, PageWithLayout } from '@listic/feature/layout';

const SignUpPage: PageWithLayout = () => {
  return <AuthSignInForm />;
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
