
interface ButtonProps { 
  label: string; 
  variant?: 'primary' | 'outline'; 
  className?: string; 
} 
 
export const Button = ({ label, variant = 'primary', className }: 
ButtonProps) => { 
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-300"; 
  const variants = { 
    primary: "bg-pink-800 text-white hover:bg-pink-600 shadow-lg", 
    outline: "border-2 border-pink-800 text-pink-800 hover:bg-pink-800 hover:text-white shadow-md" 
  }; 
 
  return ( 
    <button className={`${baseStyle} ${variants[variant]} 
${className}`}> 
      {label} 
    </button> 
  ); 
}; 

export default Button;