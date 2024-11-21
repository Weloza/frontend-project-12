import LoginImage from '../../../images/login.jpg';
import { AuthForm } from "./authForm";

export const CardBody = () => (
  <div className="card-body row p-5">
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <img src={LoginImage} className="rounded-circle" alt="Войти" />
    </div>
    <AuthForm />
  </div>
);