import { useForm } from "react-hook-form";
import { InputText } from "../component/ui/InputText";
import { InputPassword } from "../component/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import Button from "../component/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/UseAuthStore";


type FormData ={
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().min(1, "EMAIL : 24090070"),
    password: z.string().min(8, "Password : 24090070"),
})

export default function LoginForm() {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onsubmit = (data: FormData) => {
        console.log(data);
        if(data.email == "24090070" && data.password == "24090070"){
            alert("Login berhasil");
            login(data.email); // Memanggil fungsi login dari store

            // Redirect ke halaman dashboard
            navigate("/dashboard");
        } else {
            alert("Email atau password salah");
        }
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

            </form>
        </div>
    );
}