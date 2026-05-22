
interface ButtonProps { 
  label: string; 
  variant?: 'primary' | 'outline'; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
} 
 
export const Button : React.FC<ButtonProps> = ({ label, variant = 'primary', className = '', onClick, disabled = false }) => { 
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-200 cursor-pointer text-center inline-block"; 
  const variants = { 
    primary: disabled 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" 
      : "bg-pink-800 text-white hover:bg-pink-600 shadow-lg cursor-pointer", 
    
    outline: disabled
      ? "border-2 border-gray-300 text-gray-400 cursor-not-allowed shadow-none"
      : "border-2 border-pink-800 text-pink-800 hover:bg-pink-800 hover:text-white shadow-md cursor-pointer"
  }; 
 
  return ( 
    <button 
    onClick={onClick}
    disabled={disabled}
    className={`${baseStyle} ${variants[variant].trim()} 
    ${className}`}> 
    {label} 
    </button> 
  ); 
}; 

export default Button;