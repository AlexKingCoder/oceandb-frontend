import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  if (isTokenExpired()) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;