interface TextareaProps { 
  label: string; 
  nama: string; 
  register: any; 
  error?: string; 
  placeholder?: string; 
} 
 
export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  nama, 
  register, 
  error, 
  placeholder 
}) => { 
  return ( 
    <div className="flex flex-col gap-1"> 
      <label>{label}</label> 
 
      <textarea 
        {...register(nama)} 
        placeholder={placeholder} 
        className="border rounded px-3 py-2 min-h-25" 
      /> 
 
      {error && <p className="text-red-500 text-sm">{error}</p>} 
    </div> 
  ); 
}; 