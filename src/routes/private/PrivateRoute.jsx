import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  const currentTime = Date.now() / 1000; // in seconds
  if (decoded.exp < currentTime) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRoute;
