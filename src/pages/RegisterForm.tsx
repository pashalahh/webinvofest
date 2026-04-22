import { useForm } from "react-hook-form";
import { InputText } from "../component/ui/InputText";
import { InputPassword } from "../component/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import Button from "../component/ui/Button";


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
        <div>
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
                    <Button label="Register" variant="primary"/>
                </div>
            </form>
        </div>
    );
}