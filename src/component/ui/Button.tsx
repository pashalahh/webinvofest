
interface ButtonProps { 
  label: string; 
  variant?: 'primary' | 'outline'; 
  className?: string; 
  onClick?: () => void;
} 
 
export const Button : React.FC<ButtonProps> = ({ label, variant = 'primary', className = '', onClick }) => { 
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-200 cursor-pointer text-center inline-block"; 
  const variants = { 
    primary: "bg-pink-800 text-white hover:bg-pink-600 shadow-lg", 
    outline: "border-2 border-pink-800 text-pink-800 hover:bg-pink-800 hover:text-white shadow-md" 
  }; 
 
  return ( 
    <button 
    onClick={onClick}
    className={`${baseStyle} ${variants[variant].trim()} 
    ${className}`}> 
    {label} 
    </button> 
  ); 
}; 

export default Button;