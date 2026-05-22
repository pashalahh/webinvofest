import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../../api/axiosInstance";

interface Category {
  id: number;
  name: string;
}

interface Pembicara {
  id: number;
  name: string;
}

interface EventData {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description: string;
  categoryId: number;
  pembicaraId: number | null;
  category: Category;
  pembicara: Pembicara | null;
}

export default function EventIndex() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [speakers, setSpeakers] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State utama untuk menyimpan ID event yang sedang diedit di layar
  const [editingId, setEditingId] = useState<number | null>(null);

  // State temporary untuk menampung input form perubahan data lama
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    dateEvent: "",
    description: "",
    categoryId: "",
    pembicaraId: ""
  });

  useEffect(() => {
    Promise.all([
      api.get("/events"),
      api.get("/categories"),
      api.get("/pembicara")
    ])
      .then(([resEvent, resCategory, resPembicara]) => {
        setEvents(resEvent.data);
        setCategories(resCategory.data);
        setSpeakers(resPembicara.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data event.");
        setLoading(false);
      });
  }, []);

  // Fungsi saat tombol Edit diklik (Mengubah Card jadi Form)
  const startEdit = (event: EventData) => {
    setEditingId(event.id);
    
    // Format datetime-local membutuhkan string format: YYYY-MM-DDTHH:mm
    const formattedDate = event.dateEvent ? new Date(event.dateEvent).toISOString().slice(0, 16) : "";

    setEditForm({
      name: event.name,
      location: event.location,
      dateEvent: formattedDate,
      description: event.description,
      categoryId: String(event.categoryId),
      pembicaraId: event.pembicaraId ? String(event.pembicaraId) : ""
    });
  };

  // Fungsi membatalkan edit
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Fungsi Submit Update data ke Backend
  const handleUpdateSubmit = async (id: number) => {
    if (!editForm.name.trim() || !editForm.location.trim() || !editForm.categoryId || !editForm.dateEvent) {
      return alert("Semua field wajib (kecuali pembicara) harus diisi!");
    }

    try {
      const payload = {
        name: editForm.name,
        location: editForm.location,
        dateEvent: editForm.dateEvent,
        description: editForm.description,
        categoryId: Number(editForm.categoryId),
        pembicaraId: editForm.pembicaraId ? Number(editForm.pembicaraId) : null
      };

      await api.put(`/events/${id}`, payload);
      alert("Event berhasil diperbarui!");
      
      setEditingId(null);
      window.location.reload(); // Refresh data relasi database utuh agar nama category berganti di layar
    } catch (err) {
      console.error("Gagal update event:", err);
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  };

  // Fungsi Delete Data
  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus event ini?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(e => e.id !== id));
        alert("Event berhasil dihapus!");
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus event.");
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header Dashboard */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Event</h1>
          <p className="text-gray-500 text-sm">Daftar schedule pelaksanaan kegiatan Invofest</p>
        </div>
        <Link 
          to="/dashboard/event/create" 
          className="px-4 py-2 bg-pink-800 text-white rounded-lg hover:bg-pink-700 transition text-sm font-semibold shadow cursor-pointer"
        >
          Tambah Event Baru
        </Link>
      </div>

      <hr className="mb-8 border-gray-200" />

      {loading && <p className="text-center text-gray-500 animate-pulse py-4">Memuat data event...</p>}
      {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {events.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-4">Belum ada jadwal event.</p>
          ) : (
            events.map((event) => {
              const isEditing = editingId === event.id; // Cek apakah card ini yang sedang di-edit

              return (
                <div 
                  key={event.id} 
                  className={`bg-white p-6 rounded-3xl shadow-lg border transition duration-300 ${
                    isEditing ? "border-pink-500 ring-2 ring-pink-100" : "border-gray-100"
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-pink-800 mb-2">Edit Informasi Event</h4>
                      
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Nama Event</label>
                        <input 
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Kategori</label>
                        <select
                          value={editForm.categoryId}
                          onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md bg-white focus:outline-pink-500"
                        >
                          <option value="">-- Pilih Kategori --</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Pembicara</label>
                        <select
                          value={editForm.pembicaraId}
                          onChange={(e) => setEditForm({ ...editForm, pembicaraId: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md bg-white focus:outline-pink-500"
                        >
                          <option value="">-- Tanpa Pembicara --</option>
                          {speakers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Lokasi</label>
                        <input 
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Waktu Pelaksanaan</label>
                        <input 
                          type="datetime-local"
                          value={editForm.dateEvent}
                          onChange={(e) => setEditForm({ ...editForm, dateEvent: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Deskripsi</label>
                        <textarea 
                          rows={2}
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      {/* Tombol Simpan & Batal Inline */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleUpdateSubmit(event.id)}
                          className="flex-1 text-xs bg-green-700 text-white font-bold py-1.5 rounded-md hover:bg-green-600 cursor-pointer"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 text-xs bg-gray-500 text-white font-bold py-1.5 rounded-md hover:bg-gray-400 cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-6 relative">
                      {/* Sisi Kiri: Kalender/Waktu */}
                      <div className="w-24 h-28 bg-gray-100 rounded-2xl overflow-hidden shrink-0 flex flex-col justify-between border border-gray-200">
                        <div className="w-full h-full bg-pink-100 flex items-center justify-center border-b border-gray-200">
                          <span className="text-4xl">📅</span>
                        </div>
                        <div className="w-full bg-white p-2 text-center border-t border-gray-100">
                          <p className="text-xs font-bold text-gray-800">
                            {new Date(event.dateEvent).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <p className="text-[10px] text-gray-400">WIB</p>
                        </div>
                      </div>

                      {/* Sisi Kanan: Detail Informasi */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between relative">
                        <span className="absolute top-0 right-0 inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {event.category?.name || "Uncategorized"}
                        </span>

                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{event.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 font-medium flex items-center gap-1.5">
                            📍 <span className="truncate">{event.location}</span>
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Pembicara Utama & Tombol Menu Biasa */}
                        <div className="border-t border-gray-100 pt-3 mt-1">
                          <div className="flex justify-between items-center gap-3">
                            <div className="min-w-0">
                              <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">Pembicara Utama</p>
                              <p className="text-xs font-semibold text-gray-700 truncate">
                                👤 {event.pembicara?.name || "Tidak ada pembicara"}
                              </p>
                            </div>

                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => startEdit(event)}
                                className="text-xs bg-blue-50 px-2.5 py-1.5 rounded-md text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(event.id)}
                                className="text-xs bg-red-50 px-2.5 py-1.5 rounded-md text-red-600 font-semibold hover:bg-red-600 hover:text-white transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}