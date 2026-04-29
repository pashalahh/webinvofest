import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    image?: string; 
}

export const Card = ({ children, className = "", image }: CardProps) => {
    return (
        <div
        className={`bg-white shadow-lg rounded-2rem overflow-hidden border-l-12px border-pink-700 
            flex flex-col min-h-100 w-full max-w-87.5 mx-auto 
            transition-all duration-300 hover:shadow-2xl ${className}`}>
        {image && image.trim() !== "" && (
            <div className="w-full h-full object-cover object-center">
                <img 
                    src={image} 
                    alt="Card Header" 
                    className="w-full h-full object-cover" 
                />
            </div>
        )}

            <div className="p-6 flex-1 flex flex-col">
                {children}
            </div>
            
        </div>
        
    );
};



