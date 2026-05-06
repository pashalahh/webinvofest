import { Link } from "react-router";

export default function PembicaraIndex() {
    return (
        <div>
            <h1>Pembicara</h1>
            <p>Selamat datang di halaman pembicara!</p>

            <Link to="/dashboard/pembicara/create" className="p-2 bg-green-800 text-white rounded block text-center hover:bg-green-400 cursor-pointer ">
                Tambah Pembicara
            </Link>
        </div>
    )
}