import { Home, Users, HelpCircle, Trophy, Monitor, Mic } from 'lucide-react'; // Import Ikon 
import { NavLink } from './ui/NavLink'; 
 
export const Header = () => { 
  // Simulasi penentuan halaman aktif (biasanya menggunakan Library Router) 
  const currentPath = "#";  
 
  const menuItems = [ 
    { label: 'Beranda', href: '#', icon: <Home size={18} /> }, 
    { label: 'Competition', href: '#competition', icon: <Trophy size={18} /> }, 
    { label: 'Seminar', href: '#seminar', icon: <Users size={18} /> }, 
    { label: 'Workshop', href: '#workshop', icon: <Monitor size={18} /> }, 
    { label: 'Talkshow', href: '#talkshow', icon: <Mic size={18} /> }, 
    { label: 'FAQ', href: '#faq', icon: <HelpCircle size={18} /> }, 
  ]; 
 
  return ( 
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 px-6 py-2"> 
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
              key={item.label} 
              label={item.label} 
              href={item.href} 
              icon={item.icon} 
              // Logika: Jika href sama dengan path saat ini, maka Active 
              isActive={item.href === currentPath}  
              /> 
            ))} 
          </div> 
        </div> 
      </div>
    </header> 
  ); 
}; 

export default Header;