import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/UseAuthStore";

export default function DashboardLayout(){
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    // Fungsi Logout
    const handleLogout = () => {
        logout(); // Memanggil fungsi logout dari store

        // Redirect ke halaman login
        navigate("/login");
    }

    return (
        <div className="flex w-full min-h-screen">
            {/* kiri */}
            <div className="bg-pink-100 w-64 flex flex-col justify-between p-4">
                {/* atas */}
                <div>
                    <h1 className="text-2xl font-bold text-center text-pink-800 ">INVOFEST</h1>
                </div>

                {/* tengah */}
                <div>
                    <ul className="flex flex-col gap-6 w-full">
                        <li>
                            <Link to="/dashboard" className="p-4 bg-pink-700 text-white rounded block text-center hover:bg-pink-400 cursor-pointer ">
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/category" className="p-4 bg-pink-700 text-white rounded block text-center hover:bg-pink-400 cursor-pointer ">
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/event" className="p-4 bg-pink-700 text-white rounded block text-center hover:bg-pink-400 cursor-pointer ">
                                Event
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/pembicara" className="p-4 bg-pink-700 text-white rounded block text-center hover:bg-pink-400 cursor-pointer ">
                                Pembicara
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/biodata" className="p-4 bg-pink-700 text-white rounded block text-center hover:bg-pink-400 cursor-pointer ">
                                Biodata
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* bawah */}
                <div>
                    <button type="button" 
                    onClick={handleLogout}
                    className="w-full p-4 bg-red-700 text-white rounded-2xl cursor-pointer hover:bg-red-400 ">Logout</button>
                </div>
            </div>

            {/* kanan */}
            <div className="p-4">
                <Outlet/>
            </div>
        </div>
        
    )   
}