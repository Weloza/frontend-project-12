import { PageContainer } from "../../components";
import { Navbar } from "../../components";
import { CardContainer } from '../../components';
import { SignupCard } from "./components";

export const SignupPage = () => (
  <PageContainer>
    <Navbar />
    <CardContainer>
      <SignupCard />
    </CardContainer>
  </PageContainer>
);