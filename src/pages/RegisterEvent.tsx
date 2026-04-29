import { useForm } from "react-hook-form"; 
import { InputText } from "../component/ui/InputText";
import { Textarea } from "../component/ui/TextArea"; 
import { Select } from "../component/ui/Select"; 
import Button from "../component/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";

 

type FormData ={
    nama: string;
    email: string;
    event: string;
    bio: string;
}

const schema = z.object({
    nama: z.string().min(1, "Nama harus diisi"),
    email: z.string().min(1, "Email harus diisi"),
    event: z.string().min(1, "Pilih salah satu event"),
    bio: z.string().min(1,"Biodata harus diisi"),
})

export default function RegisterForm() { 
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  }); 
 
  const onSubmit = (data: FormData) => { 
    console.log("Data Pendaftaran:", data); 
    alert("Pendaftaran Berhasil!");
  };
 
  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registrasi Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4"> 
        
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

        <Select 
          label="Pilih Event" 
          nama="event" 
          register={register} 
          options={[ 
            { label: "IT Competition", value: "comp" }, 
            { label: "IT Seminar", value: "semi" }, 
            { label: "IT Talkshow", value: "talk" }, 
            { label: "IT Workshop", value: "work" } 
          ]} 
          error={errors.event?.message} 
        /> 
  
        <Textarea 
          label="Biodata Singkat" 
          nama="bio" 
          register={register} 
          error={errors.bio?.message} 
        /> 
  
  
          <Button  label="Daftar" variant="primary" className="w-full mt-2" /> 

      </form> 
    </div>
  ); 
} 