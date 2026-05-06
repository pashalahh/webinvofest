import Button from "../../../component/ui/Button";
import { InputText } from "../../../component/ui/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";


export default function CategoryCreate() {
    type FormData ={
    category: string;
    }
    
    const schema = z.object({
        category: z.string().min(2, "Nama kategori harus diisi")
    })
    
    const onsubmit = (data: FormData) => {
    console.log(data);
    }
    
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
           resolver: zodResolver(schema),
    });
    

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tambah Kategori</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
               <InputText 
               label="Nama" 
               nama="category"
               register={register}
               error={errors.category?.message}
               />

                <div>
                    <Button label="Simpan" variant="primary" className="w-full mt-2" />
                </div>


            </form>
        </div>
    )
}   