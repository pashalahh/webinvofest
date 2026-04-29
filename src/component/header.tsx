import { Home, Users, Trophy, Monitor, Mic, UserCircle } from 'lucide-react'; // Import Ikon 
import { NavLink } from 'react-router-dom';
 
export const Header = () => { 
  // Simulasi penentuan halaman aktif (biasanya menggunakan Library Router) 
  const currentPath = "/"; // Ganti dengan logika penentuan path saat ini
 
  const menuItems = [ 
    { label: 'Beranda', href: '/', icon: <Home size={18} /> }, 
    { label: 'Competition', href: '/competition', icon: <Trophy size={18} /> }, 
    { label: 'Seminar', href: '/seminar', icon: <Users size={18} /> }, 
    { label: 'Workshop', href: '/workshop', icon: <Monitor size={18} /> }, 
    { label: 'Talkshow', href: '/talkshow', icon: <Mic size={18} /> }, 
  ]; 

  const activeStyle = "text-pink-800 "; 
  const defaultStyle = "text-slate-600 hover:text-pink-800"; 
 
  return ( 
    <header className=" bg-white shadow-sm px-6 py-2"> 
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" // Pastikan path logo benar
            alt="Invofest Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 md:gap-4"> 
            {menuItems.map((item) => ( 
              <NavLink            
                to={item.href}  
                className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 font-medium
                transition-all duration-200
                ${isActive ? activeStyle : defaultStyle}`} >

                {/* Render Ikon jika ada */} 
                {item.icon && <span className="w-5 h-5">{item.icon}</span>} 

                <span>{item.label}</span> 
              </NavLink> 
            ))} 

              <NavLink            
                to="/login"  
                className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 font-medium
                transition-all duration-200
                ${isActive ? activeStyle : defaultStyle}`} >

                <span>
                  <UserCircle size={18} />
                </span> 
              </NavLink>
          </div> 
        </div> 
      </div>
    </header> 
  ); 
}; 

export default Header;