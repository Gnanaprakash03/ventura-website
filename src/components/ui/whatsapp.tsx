
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
  className={`fixed bottom-24 right-5 sm:bottom-28 sm:right-7 md:bottom-28 md:right-9 lg:bottom-32 lg:right-12 z-50 ${className}`}
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
      w-12
      h-12
      sm:w-14
      sm:h-14
      md:w-16
      md:h-16
      bg-green-500
      text-white
      rounded-full
      shadow-lg
      hover:scale-110
      transition-transform
      duration-300
    "
  >
    <FaWhatsapp
      size={size || 28}
      className="sm:size-[32px] md:size-[36px] lg:size-[40px]"
    />
  </a>
</div>

  );
};

export default FlyingWhatsApp;
