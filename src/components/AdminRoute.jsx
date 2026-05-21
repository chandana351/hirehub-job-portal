import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const AdminRoute = ({ user, userRole, loading, children }) => {
  if (loading) return <LoadingSpinner label="Checking admin access" />;
  if (!user) return <Navigate to="/login" replace />;
  if (userRole !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
};

export default AdminRoute;
