import { useContext } from "react";
import AuthContext from "../store/context/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  const ctx = useContext(AuthContext);
  return ctx?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
