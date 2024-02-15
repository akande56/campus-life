import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Store/User/AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();
  
    if (!auth.isAuthenticated) {
  
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
  
    return children;
  }