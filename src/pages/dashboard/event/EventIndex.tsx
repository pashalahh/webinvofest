import { Link } from "react-router";

export default function EventIndex() {
    return (
        <div>
            <h1>Event</h1>
            <p>Selamat datang di halaman event!</p>

            <Link to="/dashboard/event/create" className="p-2 bg-green-800 text-white rounded block text-center hover:bg-green-400 cursor-pointer ">
                Tambah Event
            </Link>
        </div>
    )
}