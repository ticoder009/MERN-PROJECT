import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
  // Add debugging to track authentication state in ProtectedRoute
  useEffect(() => {
    console.log("ProtectedRoute - Auth State:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log(
      "ProtectedRoute - Redirecting to /admin because not authenticated"
    );
    return <Navigate to="/admin" replace />;
  }

  console.log("ProtectedRoute - Rendering protected content");
  return children;
};

export default ProtectedRoute;
