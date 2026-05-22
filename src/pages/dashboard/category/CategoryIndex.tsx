import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import api from "../../../api/axiosInstance";

interface Category {
  id: number | string; 
  name: string;        
}

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mencatat ID card mana yang sedang diedit (null jika sedang tidak mengedit apa pun)
  const [editingId, setEditingId] = useState<number | string | null>(null);
  // Menyimpan ketikan nama baru sementara saat mengedit
  const [editName, setEditName] = useState<string>("");
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  // Ambil data kategori dari backend saat halaman dibuka
  useEffect(() => {
    api.get("/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Gagal memuat data kategori.");
        setLoading(false);
      });
  }, []);

  // Fungsi memicu mode edit di card tertentu
  const startEdit = (category: Category) => {
    setEditingId(category.id); // tandai ID card yang diklik
    setEditName(category.name); // masukkan nama lama ke inputan sementara
  };

  // Fungsi membatalkan edit inline
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  // Fungsi simpan perubahan ke database (PUT /categories/:id)
  const handleSaveEdit = async (id: number | string) => {
    if (!editName.trim()) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }

    setSaveLoading(true);
    try {
      // 1. Tembak API PUT ke backend untuk update database
      await api.put(`/categories/${id}`, { name: editName });

      // 2. Perbarui data di state frontend agar tampilan langsung berubah
      setCategories(
        categories.map((cat) => (cat.id === id ? { ...cat, name: editName } : cat))
      );

      // 3. Matikan mode edit
      setEditingId(null);
      setEditName("");
      alert("Kategori berhasil diperbarui!");
    } catch (err) {
      console.error("Gagal mengupdate kategori:", err);
      alert("Gagal menyimpan perubahan ke server.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Fungsi menghapus kategori (DELETE /categories/:id)
  const handleDelete = async (id: number | string) => {
    if (confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
      try {
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
        alert("Kategori berhasil dihapus!");
      } catch (err) {
        console.error("Gagal menghapus kategori:", err);
        alert("Gagal menghapus kategori dari server.");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Category</h1>
          <p className="text-gray-600 text-sm">Selamat datang di halaman category!</p>
        </div>
        
        <Link 
          to="/dashboard/category/create" 
          className="p-2 bg-green-800 text-white rounded hover:bg-green-700 transition cursor-pointer text-sm font-semibold shadow"
        >
          Tambah Category
        </Link>
      </div>

      <hr className="mb-6 border-gray-200" />

      {loading && <p className="text-center text-gray-500 animate-pulse">Sedang memuat data...</p>}
      {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const isEditing = editingId === category.id;

            return (
              <div 
                key={category.id} 
                className={`bg-white p-5 rounded-xl shadow-md border flex flex-col justify-between transition duration-200 ${
                  isEditing ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-100 hover:shadow-lg"
                }`}
              >
                {/* --- KONDISI JIKA SEDANG DIEDIT --- */}
                {isEditing ? (
                  <>
                    <div className="mb-4">
                      <label className="text-xs font-bold text-gray-500 block mb-1">Nama Kategori Baru:</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:border-pink-500 text-gray-800"
                        disabled={saveLoading}
                      />
                    </div>

                    <div className="flex gap-2 border-t border-gray-100 pt-3">
                      <button
                        onClick={() => handleSaveEdit(category.id)}
                        disabled={saveLoading}
                        className="flex-1 py-1.5 px-3 bg-green-700 text-white text-xs font-semibold rounded hover:bg-green-800 transition cursor-pointer text-center disabled:bg-gray-300"
                      >
                        {saveLoading ? "..." : "Simpan"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={saveLoading}
                        className="flex-1 py-1.5 px-3 bg-gray-500 text-white text-xs font-semibold rounded hover:bg-gray-600 transition cursor-pointer text-center disabled:bg-gray-300"
                      >
                        Batal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 wrap-break-words">{category.name}</h3>
                    </div>

                    <div className="flex gap-2 border-t border-gray-100 pt-3">
                      <button
                        onClick={() => startEdit(category)}
                        className="flex-1 py-1.5 px-3 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition text-center cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="flex-1 py-1.5 px-3 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition text-center cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}