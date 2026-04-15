import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsProps {
  title: string;
  description: string;
}

const Collapse: React.FC<CollapsProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-pink-500 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-pink-800 flex justify-between hover:bg-pink-700 transition-colors w-full"
      >
        <div className="p-2 bg-gray-100">
          <ChevronDown
            size={20}
            className={`text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
      </button>
      {isOpen && <div className="p-4 bg-gray-200">{description}</div>}
    </div>
  );
};

export default Collapse;