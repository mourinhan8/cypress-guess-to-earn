import { Navigate } from "react-router-dom";
import { useAuthContext } from "../library/AppAuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
