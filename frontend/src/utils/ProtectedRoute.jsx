import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./routes";

export const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to={routes.login} replace />;
};
