import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) return <LoadingSpinner label="Checking session" />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
