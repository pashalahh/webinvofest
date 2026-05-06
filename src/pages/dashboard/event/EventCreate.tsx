import { useForm } from "react-hook-form";
import { Button } from "../../../component/ui/Button";
import { InputText } from "../../../component/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type FormData = {
    nama: string;
    pembicara: string;
    tanggal: string;
    jam: string;
   
}
const schema = z.object({
    nama: z.string().min(1, "Nama Event harus diisi"),
    pembicara: z.string().min(1, "Pembicara harus diisi"),
    tanggal: z.string().min(1, "Tanggal harus diisi"),
    jam: z.string().min(1, "Jam harus diisi"),
  
})


export default function EventCreate() {
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
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tambah Event</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputText 
                label="Nama Event" 
                nama="nama"
                register={register}
                error={errors.nama?.message}
              />
              <InputText 
                label="Pembicara" 
                nama="pembicara"
                register={register}
                error={errors.pembicara?.message}
              />
              <InputText 
                label="Tanggal" 
                nama="tanggal"
                register={register}
                error={errors.tanggal?.message}
              />
              <InputText 
                label="Jam" 
                nama="jam"
                register={register}
                error={errors.jam?.message}
              />
       
                <div>
                   <Button label="Simpan" variant="primary" className="w-full mt-2" />
                </div>
       
       
            </form>
        </div>
    )
}   