//import { useSelector } from "react-redux";
/*import { RootState } from "../application/app/store";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Persist auth across full page reloads (e.g. returning from payment gateways)
  const storedAccessToken = localStorage.getItem("accessToken");

  const allowed = user || isAuthenticated || storedAccessToken;

  return allowed ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;*/
