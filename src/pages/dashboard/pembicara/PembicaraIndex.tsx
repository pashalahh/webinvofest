import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../../api/axiosInstance";

interface PembicaraData {
  id: number;
  nama: string; 
  name?: string; 
  role: string;
  image?: string; 
  foto?: string; 
}

export default function PembicaraIndex() {
  const [speakers, setSpeakers] = useState<PembicaraData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk melacak ID pembicara yang sedang diedit di layar
  const [editingId, setEditingId] = useState<number | null>(null);

  // State temporary untuk form input edit pembicara
  const [editForm, setEditForm] = useState({
    nama: "",
    role: "",
    image: ""
  });

  // Ambal data pembicara dari API backend
  useEffect(() => {
    api.get("/pembicara")
      .then((res) => {
        setSpeakers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data pembicara:", err);
        setError("Gagal memuat data pembicara.");
        setLoading(false);
      });
  }, []);

  // Pemicu saat tombol Edit diklik (Mengubah Card menjadi Form inline)
  const startEdit = (speaker: PembicaraData) => {
    setEditingId(speaker.id);
    setEditForm({
      nama: speaker.nama || speaker.name || "",
      role: speaker.role || "",
      image: speaker.image || speaker.foto || ""
    });
  };

  // Batalkan proses edit
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Eksekusi submit perubahan ke backend dengan payload ganda (antisipasi mismatch key)
  const handleUpdateSubmit = async (id: number) => {
    if (!editForm.nama.trim() || !editForm.role.trim() || !editForm.image.trim()) {
      return alert("Semua field pembicara wajib diisi!");
    }

    try {
      const payload = {
        nama: editForm.nama,
        name: editForm.nama, // Safe fallback
        role: editForm.role,
        image: editForm.image,
        foto: editForm.image // Safe fallback
      };

      await api.put(`/pembicara/${id}`, payload);
      alert("Data pembicara berhasil diperbarui!");
      
      setEditingId(null);
      window.location.reload(); // Sinkronisasi ulang data state ter-update dari DB
    } catch (err) {
      console.error("Gagal memperbarui pembicara:", err);
      alert("Terjadi kesalahan server saat memperbarui data pembicara.");
    }
  };

  // Eksekusi hapus data pembicara
  const handleDelete = async (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data pembicara ini?")) {
      try {
        await api.delete(`/pembicara/${id}`);
        setSpeakers(speakers.filter((s) => s.id !== id));
        alert("Pembicara berhasil dihapus!");
      } catch (err) {
        console.error("Gagal menghapus pembicara:", err);
        alert("Gagal menghapus data pembicara.");
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header Panel */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pembicara</h1>
          <p className="text-gray-500 text-sm">Manajemen data pembicara acara Invofest</p>
        </div>
        <Link 
          to="/dashboard/pembicara/create" 
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition text-sm font-semibold shadow cursor-pointer"
        >
          Tambah Pembicara
        </Link>
      </div>

      <hr className="mb-8 border-gray-200" />

      {loading && <p className="text-center text-gray-500 animate-pulse py-4">Memuat data pembicara...</p>}
      {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

      {/* Grid List Pembicara */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-4">Belum ada data pembicara.</p>
          ) : (
            speakers.map((speaker) => {
              const isEditing = editingId === speaker.id;
              // Mengambil url gambar dari properti image atau foto yang disediakan backend
              const imageUrl = speaker.image || speaker.foto; 
              // Mengambil teks nama
              const speakerName = speaker.nama || speaker.name || "Tanpa Nama";

              return (
                <div 
                  key={speaker.id} 
                  className={`bg-white p-6 rounded-3xl shadow-lg border transition duration-300 ${
                    isEditing ? "border-pink-500 ring-2 ring-pink-100" : "border-gray-100"
                  }`}
                >
                  {isEditing ? (
                    /* 📝 WUJUD INLINE FORM EDIT DI DALAM CARD PEMBICARA */
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-pink-800 mb-2">Edit Data Pembicara</h4>
                      
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Nama Lengkap</label>
                        <input 
                          type="text"
                          value={editForm.nama}
                          onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">Role / Profesi</label>
                        <input 
                          type="text"
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-0.5">URL Link Foto</label>
                        <input 
                          type="text"
                          value={editForm.image}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          className="w-full border p-1.5 text-xs rounded-md focus:outline-pink-500"
                        />
                      </div>

                      {/* Aksi Simpan / Batal Inline */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleUpdateSubmit(speaker.id)}
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
                    /* 👤 WUJUD TAMPILAN VIEW CARD PEMBICARA BIASA */
                    <div className="flex gap-6 items-center">
                      {/* Box Foto Pembicara */}
                      <div className="w-20 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={speakerName} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Jika link mati/rusak, muncul text No Photo yang rapi
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) parent.innerHTML = '<span class="text-xs text-gray-400 font-bold">No Photo</span>';
                            }}
                          />
                        ) : (
                          <span className="text-xs text-gray-400 font-bold">No Photo</span>
                        )}
                      </div>

                      {/* Deskripsi Teks & Tombol Aksi */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate mb-0.5">{speakerName}</h3>
                        <p className="text-xs font-semibold text-pink-700 bg-pink-50 inline-block px-2 py-0.5 rounded-md mb-4">
                          {speaker.role || "Professional"}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(speaker)}
                            className="text-xs bg-blue-50 px-3 py-1.5 rounded-md text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(speaker.id)}
                            className="text-xs bg-red-50 px-3 py-1.5 rounded-md text-red-600 font-semibold hover:bg-red-600 hover:text-white transition cursor-pointer"
                          >
                            Delete
                          </button>
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