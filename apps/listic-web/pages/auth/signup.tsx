import { getAuthLayout, PageWithLayout } from '@listic/feature/layout';
import { AuthSignUpForm } from '@listic/feature/auth';

const SignUpPage: PageWithLayout = () => {
  return <AuthSignUpForm />;
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
