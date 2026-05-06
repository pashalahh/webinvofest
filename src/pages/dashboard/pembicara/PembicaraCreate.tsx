import { useForm } from "react-hook-form";
import { Button } from "../../../component/ui/Button";
import { InputText } from "../../../component/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type FormData = {
    nama: string;
    role: string;
    foto: string;
}
const schema = z.object({
    nama: z.string().min(1, "Nama pembicara harus diisi"),
    role: z.string().min(1, "Role pembicara harus diisi"),
    foto: z.string().min(1, "Foto pembicara harus diisi"),
  
})


export default function PembicaraCreate() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tambah Pembicara</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputText 
                label="Nama" 
                nama="nama"
                register={register}
                error={errors.nama?.message}
              />
              <InputText 
                label="Role" 
                nama="role"
                register={register}
                error={errors.role?.message}
              />
              <InputText 
                label="Foto" 
                nama="foto"
                register={register}
                error={errors.foto?.message}
              />
       
                <div>
                   <Button label="Simpan" variant="primary" className="w-full mt-2" />
                </div>
       
       
            </form>
        </div>
    )
}   