import { useDispatch, useSelector } from "react-redux";
import { deleteAuthorization } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
import { useTranslation } from "react-i18next";
import { getToken } from "../slices/selectors";

export const Navbar = () => {
  const { t } = useTranslation();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const handleClick = () => {
    dispatch(deleteAuthorization());
    redirect(routes.login);
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navbar.chatName')}</a>
        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleClick()}>
            {t('navbar.exit')}
          </button>
        )}
      </div>
    </nav>
  );
};
