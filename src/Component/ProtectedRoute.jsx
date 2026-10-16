// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCurrentToken } from "../services/authApi";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const token = getCurrentToken();
  const location = useLocation();

  // Check both context user and localStorage token
  if (!user && (!token || token === "expired_token")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;