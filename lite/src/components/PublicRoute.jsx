import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./Loading";

export default function PublicRoute({ children }) {
    const isAuthenticated = useSelector(state => state.user.is_authenticated);
    const isLoading = useSelector(state => state.user.is_loading);

    if(isLoading) {
        return <LoadingSpinner />;
    }
    console.log(isAuthenticated);
  return isAuthenticated ? <Navigate to="/companies" replace /> : children;
}