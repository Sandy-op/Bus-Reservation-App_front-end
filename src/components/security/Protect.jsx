import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Protect = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null represents loading state
  const location = useLocation();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("Admin");
    const userLoggedIn = localStorage.getItem("User");

    // Check authentication based on role
    if (role === "admin" && adminLoggedIn) {
      setIsAuthenticated(true);
    } else if (role === "user" && userLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [role]);

  // If still loading, don't render anything yet
  if (isAuthenticated === null) {
    return null; // You can show a loading spinner here if needed
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    const redirectTo = role === "admin" ? '/adminAuth' : '/userAuth';
    return <Navigate to={redirectTo} state={{ from: location.pathname, busDetails: location.state?.busDetails }} replace />;
  }

  // If authenticated, render the protected children
  return children;
};

export default Protect;
