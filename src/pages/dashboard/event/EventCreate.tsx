import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../../../component/ui/Button";
import { InputText } from "../../../component/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import api from "../../../api/axiosInstance";

interface CategoryOption {
  id: number;
  name: string;
}

interface PembicaraOption {
  id: number;
  name: string;
}

type FormData = {
  name: string;
  categoryId: string;   
  pembicaraId?: string;  
  location: string;
  dateEvent: string;    
  description: string;
};

// Validasi Zod disesuaikan dengan struktur backend
const schema = z.object({
  name: z.string().min(1, "Nama Event harus diisi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  pembicaraId: z.string().optional(),
  location: z.string().min(1, "Lokasi event harus diisi"),
  dateEvent: z.string().min(1, "Tanggal & waktu event harus diisi"),
  description: z.string().min(1, "Deskripsi event harus diisi"),
});

export default function EventCreate() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [speakers, setSpeakers] = useState<PembicaraOption[]>([]);
  const [loadingDropdown, setLoadingDropdown] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pembicaraId: "" 
    }
  });

  // Ambil data Kategori dan Pembicara sekaligus dari backend untuk dropdown dinamis
  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/pembicara") 
    ])
      .then(([resCategory, resPembicara]) => {
        setCategories(resCategory.data);
        setSpeakers(resPembicara.data);
        setLoadingDropdown(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data dropdown:", err);
        alert("Gagal mengambil data master kategori/pembicara.");
        setLoadingDropdown(false);
      });
  }, []);

  // Eksekusi kirim data ke API backend
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Bungkus data ke format yang diminta backend controller
      const payload = {
        name: data.name,
        location: data.location,
        dateEvent: data.dateEvent, 
        description: data.description,
        categoryId: Number(data.categoryId),
        pembicaraId: data.pembicaraId ? Number(data.pembicaraId) : null, 
      };

      await api.post("/events", payload); // Tembak API createEvent backend
      alert("Event berhasil ditambahkan!");
      navigate("/dashboard/event"); 
    } catch (error: any) {
      console.error("Gagal simpan event:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan server saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tambah Event Baru</h2>
      
      {loadingDropdown ? (
        <p className="text-center text-gray-500 animate-pulse py-4">Menyiapkan form dan data master...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Input Nama Event */}
          <InputText 
            label="Nama Event" 
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          {/* DROPDOWN DINAMIS: Kategori */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Kategori Event</label>
            <select
              {...register("categoryId")}
              className={`w-full p-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 ${
                errors.categoryId ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-pink-200 focus:border-pink-500"
              }`}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-xs text-red-500 mt-0.5">{errors.categoryId.message}</p>}
          </div>

          {/* DROPDOWN DINAMIS: Pembicara */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Pembicara (Opsional)</label>
            <select
              {...register("pembicaraId")}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
            >
              <option value="">-- Tanpa Pembicara / Menyusul --</option>
              {speakers.map((spk) => (
                <option key={spk.id} value={spk.id}>{spk.name}</option>
              ))}
            </select>
          </div>

          {/* Input Lokasi */}
          <InputText 
            label="Lokasi Tempat" 
            nama="location"
            register={register}
            error={errors.location?.message}
          />

          {/* Input Tanggal & Jam Waktu (Menggunakan tipe datetime-local agar user bisa pilih kalender & jam sekaligus) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Tanggal & Waktu Pelaksanaan</label>
            <input 
              type="datetime-local"
              {...register("dateEvent")}
              className={`w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.dateEvent ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-pink-200"
              }`}
            />
            {errors.dateEvent && <p className="text-xs text-red-500 mt-0.5">{errors.dateEvent.message}</p>}
          </div>

          {/* Input Deskripsi (Menggunakan textarea agar muat panjang) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Deskripsi Event</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Tulis detail acara di sini..."
              className={`w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.description ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-pink-200 focus:border-pink-500"
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-0.5">{errors.description.message}</p>}
          </div>

          {/* Tombol Simpan */}
          <div className="pt-2">
            <Button 
              label={isSubmitting ? "Menyimpan..." : "Simpan Event"} 
              variant="primary" 
              className="w-full mt-2 cursor-pointer disabled:bg-gray-400" 
              disabled={isSubmitting}
            />
          </div>

        </form>
      )}
    </div>
  );
}