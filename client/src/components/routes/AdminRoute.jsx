import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard() {
    const isAdmin = useSelector((state) => state.auth.user?.isAdmin);
    
    if (!isAdmin) {
        return <Navigate to="/404"/>;
    }

    return <Outlet />;
}