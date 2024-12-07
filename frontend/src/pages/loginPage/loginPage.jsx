import PageContainer from '../../components/pageContainer';
import Navbar from '../../components/navbar';
import CardContainer from '../../components/cardContainer';
import CardBody from '../signupPage/components/cardBody';
import CardFooter from '../signupPage/components/cardBody';

const LoginPage = () => (
  <PageContainer>
    <Navbar />
    <CardContainer>
      <CardBody />
      <CardFooter />
    </CardContainer>
  </PageContainer>
);

export default LoginPage;