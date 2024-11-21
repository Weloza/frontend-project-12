import { PageContainer } from "../../components";
import { Navbar } from "../../components";
import { CardContainer } from "./components";
import { LoginCard } from "./components";

export const LoginPage = () => (
  <PageContainer>
    <Navbar />
    <CardContainer>
      <LoginCard />
    </CardContainer>
  </PageContainer>
);
