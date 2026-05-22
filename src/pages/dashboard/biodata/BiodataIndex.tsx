import aku from "../../../assets/saya.jpeg";

export default function Biodata() {
  // Data biodata statis kamu (silakan sesuaikan isinya)
  const dataMahasiswa = {
    nama: "Ramdani Ardhin Pasha",
    nim: "24090070", // Contoh NIM
    prodi: "D4 Teknik Informatika",
    semester: "Semester 4",
    kampus: "Universitas Harkat Negeri Tegal",
    email: "ramdinpasha@gmail.com",
    keahlian: ["Python","JavaScript", "React.js", "TypeScript", "Tailwind CSS", "Node.js"]
  };

  return (
    <div className="p-6">
      {/* Header  */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Biodata Mahasiswa</h1>
        <p className="text-gray-500 text-sm">Informasi lengkap pengembang sistem Dashboard Invofest</p>
      </div>

      <hr className="mb-8 border-gray-200" />

      {/* Main Layout Card */}
      <div className="max-w-4xl bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-3">
        
        {/* 📸 SISI KIRI: Foto Profil */}
        <div className="bg-linear-to-b from-pink-900 to-maroon-900 p-8 flex flex-col items-center justify-center text-white border-b md:border-b-0 md:border-r border-gray-100">
          <div className="w-40 h-48 bg-white/10 rounded-2xl overflow-hidden border-2 border-white/20 shadow-inner flex items-center justify-center mb-4">
            {/* Ganti src dengan path foto formal kamu (misal: /foto-kamu.jpg) */}
            <img 
              src={aku} 
              alt="Foto Mahasiswa" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/300x400?text=No+Image";
              }}
            />
          </div>
          <h3 className="text-lg text-shadow-2xs font-bold text-center truncate w-full">{dataMahasiswa.nama}</h3>
          <p className="text-xs text-pink-800 font-semibold tracking-wider uppercase mt-1">{dataMahasiswa.nim}</p>
        </div>

        {/* 📝 SISI KANAN: Detail Informasi Biodata */}
        <div className="col-span-2 p-8 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              Informasi Akademik
            </h2>
            
            {/* Grid Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Program Studi</p>
                <p className="font-semibold text-gray-700 mt-0.5">{dataMahasiswa.prodi}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tingkat / Semester</p>
                <p className="font-semibold text-gray-700 mt-0.5">{dataMahasiswa.semester}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Perguruan Tinggi</p>
                <p className="font-semibold text-gray-700 mt-0.5">{dataMahasiswa.kampus}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kontak Email</p>
                <p className="font-semibold text-pink-800 mt-0.5">{dataMahasiswa.email}</p>
              </div>
            </div>
          </div>

          {/* Bagian Bawah Card: Tech Stack / Keahlian Project */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Keahlian
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dataMahasiswa.keahlian.map((tech, index) => (
                <span 
                  key={index} 
                  className="text-xs font-semibold px-2.5 py-1 bg-pink-50 text-pink-800 rounded-md border border-pink-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )};