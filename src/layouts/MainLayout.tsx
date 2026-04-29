import { Outlet } from "react-router-dom";
import Header from "../component/header";

export default function MainLayout(){
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header />

            <main className="max-w-7xl mx-auto py-6">
                <Outlet />
            </main>

            <footer className="bg-pink-200 text-center p-4">
                &copy; 2026 Invofest Universitas Harkat Negeri
            </footer>
        </div>
    )
}