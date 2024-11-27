import SignupImage from '../../../images/signup.jpg';
import { SignupForm } from "./signupForm";

export const CardBody = () => (
  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
    <div>
      <img src={SignupImage} className="rounded-circle" alt="Регистрация" />
    </div>
    <SignupForm />
  </div>
);