import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../model/AuthProvider";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};