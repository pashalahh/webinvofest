import { useForm } from "react-hook-form";
import { InputText } from "../component/ui/InputText";
import { InputPassword } from "../component/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import Button from "../component/ui/Button";
import { Link } from "react-router-dom";


type FormData ={
    nama: string;
    email: string;
    password: string;
    password_confirm: string;
}

const schema = z.object({
    nama: z.string().min(1, "Nama harus diisi"),
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    password_confirm: z.string().min(8, "Password minimal 8 karakter"),

})

export default function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onsubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Form Registrasi</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
               <InputText 
               label="Nama" 
               nama="nama"
               register={register}
               error={errors.nama?.message}
               />
               
               <InputText 
               label="Email" 
               nama="email"
               register={register}
               error={errors.email?.message}
               />

                <InputPassword 
                label="Password"
                nama="password"
                register={register}
                error={errors.password?.message}
                />

                <InputPassword 
                label="Konfirmasi Password"
                nama="password_confirm"
                register={register}
                error={errors.password_confirm?.message}
                />

                <div>
                    <Button label="Register" variant="primary" className="w-full mt-2"/>
                </div>

                <div className="mt-6">
                    Sudah punya akun? <Link to="/login" className="text-pink-800">Login disini</Link>
                </div>
            </form>
        </div>
    );
}