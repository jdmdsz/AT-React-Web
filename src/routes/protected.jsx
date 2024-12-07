import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authentication";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
