import { Link } from "react-router";

export default function CategoryIndex() {
    return (
        <div>
            <h1>Category</h1>
            <p>Selamat datang di halaman category!</p>

            <Link to="/dashboard/category/create" className="p-2 bg-green-800 text-white rounded block text-center hover:bg-green-400 cursor-pointer ">
                Tambah Category
            </Link>
        </div>

        
    )
}