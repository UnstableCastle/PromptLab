import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import storage from "../utils/storage";

export default function ProtectedRoute({ children }) {
  const stateToken = useSelector((state) => state.auth.accessToken);
  const storageToken = storage.getToken("accessToken");

  // console.log(stateToken, "s=s=s=s=s");
  // console.log(storageToken, "s=s=s=s=s");
  if (!stateToken && !storageToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
