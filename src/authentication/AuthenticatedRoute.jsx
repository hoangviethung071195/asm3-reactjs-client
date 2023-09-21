import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
  const ctx = useContext(AuthContext);
  return ctx?.isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
