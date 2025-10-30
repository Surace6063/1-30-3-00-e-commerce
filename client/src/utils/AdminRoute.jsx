import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/userStore";

const AdminRoute = () => {
  const { user } = useUserStore();

  // ⛔ If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in but not admin, redirect to home
  if (!user.admin) {
    return <Navigate to="/" replace />;
  }

  // ✅ Otherwise, show the protected route
  return <Outlet />;
};

export default AdminRoute;
