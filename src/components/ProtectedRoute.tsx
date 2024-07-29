import { Navigate } from "react-router-dom";
import { APP_TOKEN_KEY } from "../common/constants";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem(APP_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/" />
  }
  return children;
}
