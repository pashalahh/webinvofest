import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; 
import { Button } from "../../../component/ui/Button";
import { InputText } from "../../../component/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import api from "../../../api/axiosInstance";

type FormData = {
  nama: string;
  role: string;
  image: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama pembicara harus diisi"),
  role: z.string().min(1, "Role pembicara harus diisi"),
  image: z.string().min(1, "Foto pembicara harus diisi berupa URL gambar"),
});

export default function PembicaraCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch, // Memantau URL foto secara real-time
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // Pantau input field bernama "image" secara live untuk box preview
  const imageValue = watch("image");

  // Fungsi submit data ke backend
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {

    const payload = {
      // Antisipasi kolom Nama
      name: data.nama,  
      nama: data.nama, 

      // Antisipasi kolom Role
      role: data.role,

      // Antisipasi kolom Foto/Gambar
      image: data.image, 
      foto: data.image,  
    };

    // Cetak di console inspect browser untuk memastikan data tidak kosong sebelum dikirim
    console.log("Data yang dikirim ke backend:", payload);

    // Kirim objek payload yang sudah lengkap ke backend
    await api.post("/pembicara", payload);
    
    alert("Pembicara baru berhasil ditambahkan!");
    navigate("/dashboard/pembicara"); 
  } catch (error: any) {
    console.error("Gagal menyimpan data pembicara:", error);
    alert(error.response?.data?.message || "Terjadi kesalahan pada server saat menyimpan data.");
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tambah Pembicara Baru</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <InputText 
          label="Nama Lengkap" 
          nama="nama" 
          register={register}
          error={errors.nama?.message}
        />

        {/* Input Role */}
        <InputText 
          label="Role / Profesi" 
          nama="role"
          register={register}
          error={errors.role?.message}
        />

        {/* Input Foto (URL String) */}
        <InputText 
          label="URL / Link Foto Pembicara" 
          nama="image" 
          register={register}
          error={errors.image?.message}
        />

        {/* 📸 Live Preview Foto Box */}
        <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-gray-200">
            <img 
              src={imageValue || "https://placeholder.co/100x120?text=No+Image"} 
              alt="Pratinjau" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placeholder.co/100x120?text=Invalid+URL";
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-700">Pratinjau Foto</p>
            <p className="text-[11px] text-gray-400 truncate">
              {imageValue ? imageValue : "Masukkan link gambar untuk melihat pratinjau"}
            </p>
          </div>
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/pembicara")}
            className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            Batal
          </button>
          <Button 
            label={isSubmitting ? "Menyimpan..." : "Simpan"} 
            variant="primary" 
            className="flex-1 mt-0 cursor-pointer disabled:bg-gray-400" 
            disabled={isSubmitting}
          />
        </div>

      </form>
    </div>
  );
}