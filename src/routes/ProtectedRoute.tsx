import { useAuthStore } from "../store/UseAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Jika isAuthenticated bernilai false, maka pengguna akan diarahkan ke halaman login
    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;