
import { FaWhatsapp } from "react-icons/fa";

interface FlyingWhatsAppProps {
  phoneNumber: string;
  size?: number;
  className?: string;
}

const FlyingWhatsApp: React.FC<FlyingWhatsAppProps> = ({
  phoneNumber,
  size = 32,
  className = "",
}) => {
  return (
    <div
      className={`fixed bottom-32 right-9 z-50 ${className}`}
      aria-label="WhatsApp Chat Button"
    >
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex
          items-center
          justify-center
          w-14
          h-14
          bg-green-500
          text-white
          rounded-full
          shadow-lg
          hover:scale-110
          transition-transform
          
        "
      >
        <FaWhatsapp size={size} />
      </a>
    </div>
  );
};

export default FlyingWhatsApp;
