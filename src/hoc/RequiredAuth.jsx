import { Navigate } from "react-router";

import { useAuth } from "../hook/useAuth";

const RequiredAuth = ({ children }) => {
  const { isLogin } = useAuth();


  return isLogin ? children : <Navigate to="/" />;
};

export default RequiredAuth;
