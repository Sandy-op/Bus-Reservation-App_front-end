import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Protect = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("Admin");
    const userLoggedIn = localStorage.getItem("User");

    if (role === "admin" && adminLoggedIn) {
      setIsAuthenticated(true);
    } else if (role === "user" && userLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [role]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    const redirectTo = role === "admin" ? '/adminAuth' : '/userAuth';
    return <Navigate to={redirectTo} state={{ from: location.pathname, busDetails: location.state?.busDetails }} replace />;
  }
  return children;
};

export default Protect;
