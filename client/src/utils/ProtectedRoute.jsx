import { Navigate, Outlet } from "react-router-dom"
import { useUserStore } from "../zustand/userStore"

const ProtectedRoute = () => {
    const {user} = useUserStore()

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoute