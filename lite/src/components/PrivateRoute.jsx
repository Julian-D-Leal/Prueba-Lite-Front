import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(state => state.user.is_authenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
}