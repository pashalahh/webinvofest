import { useForm } from "react-hook-form";
import { InputText } from "../component/ui/InputText";
import { InputPassword } from "../component/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import Button from "../component/ui/Button";
import { Link } from "react-router-dom";


type FormData ={
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 karakter")
})

export default function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onsubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
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

                <div>
                    <Button label="Login" variant="primary" className="w-full mt-2" />
                </div>

                <div className="mt-6">
                    Belum punya akun? <Link to="/register" className="text-pink-800">Daftar disini</Link>
                </div>

                <div><button className="bg-pink-800 hover:bg-pink-600">oyy</button></div>
            </form>
        </div>
    );
}