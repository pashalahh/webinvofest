import { type ReactNode } from 'react'; 
import { Link, NavLink } from 'react-router-dom';

interface NavLinkProps { 
label: string; 
href: string; 
icon?: ReactNode; // Menerima komponen ikon (misal dari Lucide) 
isActive?: boolean; // Prop untuk menentukan status aktif 
} 

export const NavbarLink = ({ label, href, icon, isActive = false }: 
NavLinkProps) => { 
// Logic Styling: Membedakan Active vs Default 
    const activeStyle = "text-pink-800 "; 
    const defaultStyle = "text-slate-600 hover:text-pink-800"; 

    return ( 
        <NavLink
        to={href}  
        className={({ isActive }) => 
        `flex items-center gap-2 px-4 py-2 font-medium
        transition-all duration-200
        ${isActive ? activeStyle : defaultStyle}`} >

        {/* Render Ikon jika ada */} 
        {icon && <span className="w-5 h-5">{icon}</span>} 

        <span>{label}</span> 
        </NavLink> 
    ); 
}; 

