import { getNavbarLayout, PageWithLayout } from '@listic/feature/layout';

const LandingPage: PageWithLayout = () => {
  return <div>Landing page</div>;
};

LandingPage.getLayout = getNavbarLayout;

export default LandingPage;
