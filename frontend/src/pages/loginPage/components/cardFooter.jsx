import { routes } from "../../../utils";

export const CardFooter = () => (
  <div className="card-footer p-4">
    <div className="text-center">
      <span>Нет аккаунта?</span>
      {' '}
      <a href={routes.signup}>Регистрация</a>
    </div>
  </div>
);