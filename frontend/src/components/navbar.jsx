import { useDispatch, useSelector } from "react-redux";
import { deleteAuthorization } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";

export const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const handleClick = () => {
    dispatch(deleteAuthorization());
    redirect(routes.login);
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Slack-chat</a>
        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleClick()}
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};