import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import FullpageSpinner from "../../ui/common/loaders/FullPageSpinner";
import { useUser } from "./useUser";

type ProtectedRouteProps = {
  children: ReactNode;
};
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) return <FullpageSpinner />;

  if (!isLoading && !isAuthenticated) return <Navigate to="/login" />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
