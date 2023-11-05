import { Navigate, Outlet } from "react-router-dom"
import { isLoggedIn } from "../services/AuthService"


export const PrivateRoutes = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
}