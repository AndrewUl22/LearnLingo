import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return null;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
