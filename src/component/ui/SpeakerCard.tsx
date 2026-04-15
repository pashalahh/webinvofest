import { Button } from "./Button";

interface SpeakerProps { 
  name: string; 
  role: string; 
  imageUrl: string; 
} 
 
export const SpeakerCard = ({ name, role, imageUrl }: SpeakerProps) => { 
  return ( 
    <div className="bg-white p-6 rounded-2xl shadow-md text-center 
border border-gray-100 hover:shadow-xl transition-shadow"> 
      <img  
        src={imageUrl}  
        alt={name}  
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover 
border-4 border-blue-50" 
      /> 
      <h3 className="text-xl font-bold text-pink-800">{name}</h3> 
      <p className="text-black font-medium text-sm mb-4">{role}</p> 
      <Button label="Lihat Profil" variant="outline" className="text-xs py-2" /> 
    </div> 
  ); 
}; 

export default SpeakerCard;