import { type ReactNode } from 'react'; 

interface NavLinkProps { 
label: string; 
href: string; 
icon?: ReactNode; // Menerima komponen ikon (misal dari Lucide) 
isActive?: boolean; // Prop untuk menentukan status aktif 
} 

export const NavLink = ({ label, href, icon, isActive = false }: 
NavLinkProps) => { 
// Logic Styling: Membedakan Active vs Default 
    const activeStyle = "text-pink-800 bg-pink-50 border-b-2 border-pink-600"; 
    const defaultStyle = "text-slate-600 hover:text-pink-800 hover:bg-slate-50 border-b-2 border-transparent"; 

    return ( 
        <a href={href}  
        className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${isActive ? activeStyle : defaultStyle}`} >

        {/* Render Ikon jika ada */} 
        {icon && <span className="w-5 h-5">{icon}</span>} 

        <span>{label}</span> 
        </a> 
    ); 
}; 

export default NavLink;