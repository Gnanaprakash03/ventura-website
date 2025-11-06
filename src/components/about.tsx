
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { FaCheckCircle, FaClock, FaDollarSign, FaUsers ,FaChartLine,FaCloud,FaCogs,FaShieldAlt} from "react-icons/fa";
import { FaRulerCombined,FaClipboardCheck,FaUserCheck,FaChartPie,FaFileAlt,FaPalette,FaProjectDiagram} from "react-icons/fa";
import {FaChalkboardTeacher,FaServer,FaBarcode,FaSortAmountDown,FaWarehouse,FaTruck} from 'react-icons/fa';

import { client } from "@/sanity/lib/client";

interface AboutImage {
  _key: string
  alt?: string
  asset: {
    url: string
  }
}

interface Benefit {
  _key: string
  title: string
  description: string
  icon?: string
}

export interface AboutData {
  title: string
  description: string
  images: AboutImage[]
  Benefit: Benefit[] // <-- Capital B to match Sanity field
}
interface AutoImageSliderProps {
  images: AboutImage[]
}

export async function getAboutData(): Promise<AboutData | null> {
  const data = await client.fetch(`*[_type == "aboutsection"][0]{
    title,
    description,
    "images": images[]{
      _key,
      alt,
      "asset": asset->{ _id, url }
    },
    Benefit[]{
      _key,
      icon,
      title,
      description
    }
  }`)
  // console.log('🧩 About data from Sanity:', data)
  return data
}






const benefits = [
  { icon: FaCheckCircle, title: "What is FIDAS ?", description: "FIDAS is computer assisted fabric inspection software for all types of fabrics and can be retrofitted on any type of inspection machines" },
  { icon: FaClock, title: "Scope of FIDAS", description: "Right from doffing the fabric from the loom, greige fabric inspection, barcoding,  processed fabric inspection, packing & sorting of rolls" },
  { icon: FaDollarSign, title: "FIDAS Caters to", description: "Woven / Knits Greige Fabric Producers, Processing units, Automotive Fabric, Denim Fabrics, Apparel manufacturing companies" },
  { icon: FaUsers, title: "Integration With Your ERP",description: "FIDAS is specialized plug-in software, it collects raw data from ERP, adds inspection details to fabric & updates ERP for pack list creation" },

  { icon: FaChartLine, title: "Forward & Backward Integrations", description: "FIDAS is designed to integrate with PLC's for Auto packing, Roll sorting & ASRS." },
  { icon: FaCloud, title: "Customization of Software", description: "We are subject matter experts in Fabric Inspection & we consult to provide best solutions." },
  { icon: FaCogs, title: "Automatic Fabric Gradation", description: "FIDAS automatically grades fabric rolls based on ASTM 4-point system according to every customer needs & based on shade / GSM." },
  { icon: FaShieldAlt, title: "Roll Optimization & Cut-plan",description: "Our intelligent algorithms provide optimize cut & joining plan ensures max fresh realization and minimum wastages, adheres to quality specs." },

  { icon: FaRulerCombined, title: "Roll Traceability & Barcoding",description: "FIDAS assigns unique number to each inspected roll & prints barcode, link to inspection data, for traceability from production to dispatch." },
  { icon: FaClipboardCheck, title: "WIP Stock Maintenance", description: "FIDAS maintains real-time WIP stocks based on Un-Inspected, Under Inspection, Inspected & On hold, Under Mending, Inspected & Not packed." },
  { icon: FaUserCheck, title: "WhatsApp & SMS Integration", description: "We provide critical alerts or updates using these 3rd party interfaces." },
  { icon: FaChartPie, title: "Cloud & On-Premises Database", description: "Based on your business needs we can provide either On-Premises or Cloud solutions." },

  { icon: FaFileAlt, title: "Real-time Shade Verification",description: "Using our colorimeter, shade can verified during inspection for CSV or RLD or based on swatch provided. It avoids last minute rejections." },
  { icon: FaShieldAlt, title: "Real-Time Length Measurement", description: "Our Digital Length measurement can measure & communicate length info to PC on real-time basis to record linear defect location." },
  { icon: FaPalette, title: "Width Measurement Sensor", description: "Our patented width sensor provides real-time fabric width info to PC and provides required width alert in case of major deviation." },
  { icon: FaProjectDiagram, title: "EPI & PPI Counter", description: "FIDAS integrated with EPI/PPI counter which measures ends & picks and provides alerts in case of deviation compared to requirements." },


  { icon: FaChalkboardTeacher, title: "Defect Stickering Machine", description: "On entry of major defects in fabric a sticker is automatically pasted near the selvedge of the fabric for easy verification of major defects." },
  { icon: FaServer, title: "Defect Location Logging", description: "Other than logging linear defect location, our patented horizontal defect logging system ensures exact location of defect in X axis." },
  { icon: FaBarcode, title: "Weighing Scale Integration", description: "FIDAS is designed to integrate with any type of weighing scale attach to inspection machines." },
  { icon: FaSortAmountDown, title: "Reports & Analytics", description: "Securely access data, customized reports, analytics anywhere & anytime." },

  // { icon: FaWarehouse, title: "Warehouse Automation", description: "Integrates with ASRS for smooth roll handling." },
  // { icon: FaCloud, title: "Cloud Access", description: "Securely access data, reports, and analytics anywhere." },
  // { icon: FaCogs, title: "Future-Proof", description: "Modular, AI-ready, and scalable for evolving needs." },
  // { icon: FaTruck, title: "Automated Handling", description: "Connects with conveyors and trolleys to reduce manual work." },
];

const act_benefits: Benefits[] = [...benefits];


type Benefits = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
interface BenefitsShowcaseProps {
  benefits: Benefit[];
}


function AutoImageSliders({ images }: AutoImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full h-80 lg:h-[400px]">
      <Image
        src={images[currentIndex].asset.url}
        alt={images[currentIndex].alt || 'FIDAS Fabric Inspection'}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover rounded-2xl shadow-lg transition-all duration-500"
      />
    </div>
  )
}

import { ChevronLeft, ChevronRight } from "lucide-react";


function BenefitsShowcase({ benefits }: { benefits: any[] }) {
  
  const [startIndex, setStartIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const BATCH_SIZE = 4;
  const totalBatches = Math.ceil(benefits.length / BATCH_SIZE);

  // Auto-slide
  
const startAutoSlide = useCallback(() => {
  if (intervalRef.current) clearInterval(intervalRef.current);
  intervalRef.current = setInterval(() => {
    setStartIndex((prev) => (prev + BATCH_SIZE) % benefits.length);
  }, 7000);
}, [benefits.length, BATCH_SIZE, setStartIndex]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoSlide]);

    const goToNext = useCallback(() => {
    setStartIndex((prev) => (prev + BATCH_SIZE) % benefits.length);
    startAutoSlide();
  }, [benefits.length, startAutoSlide]);

  const goToPrev = useCallback(() => {
    setStartIndex((prev) =>
      prev - BATCH_SIZE < 0
        ? benefits.length - BATCH_SIZE
        : (prev - BATCH_SIZE) % benefits.length
    );
    startAutoSlide();
  }, [benefits.length, startAutoSlide]);

  const goToBatch = useCallback(
    (batchIndex: number) => {
      setStartIndex(batchIndex * BATCH_SIZE);
      startAutoSlide();
    },
    [startAutoSlide]
  );

  // Visible batch
  const visible = benefits.slice(startIndex, startIndex + BATCH_SIZE);
  const displayed =
    visible.length < BATCH_SIZE
      ? [...visible, ...benefits.slice(0, BATCH_SIZE - visible.length)]
      : visible;

  const ICONS_MAP: Record<string, any> = {
  FaCheckCircle, FaClock, FaDollarSign, FaUsers ,FaChartLine,FaCloud,FaCogs,FaShieldAlt,
  FaRulerCombined,FaClipboardCheck,FaUserCheck,FaChartPie,FaFileAlt,FaPalette,FaProjectDiagram,
  FaChalkboardTeacher,FaServer,FaBarcode,FaSortAmountDown
}

  return (
    <div className="relative w-full group">
      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        className="hidden md:flex absolute -left-6 lg:-left-10 top-[45%] -translate-y-1/2  bg-white/80 hover:bg-white text-blue-600 p-2 rounded-fullshadow-md hover:shadow-lg transition-all duration-300 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Benefits Grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {displayed.map((benefit, i) => { 
          const Icon = ICONS_MAP[benefit.icon] 
          return (
          <div
            key={i}
            className={`flex items-start gap-2 space-x-4 lg:h-28 bg-white p-4 my-1 rounded-xl shadow overflow-hidden hover:shadow-lg transition-all duration-700 ease-out transform
              opacity-0 translate-y-6 animate-slide-in`}
            style={{
              animationDelay: `${i * 150}ms`,
              animationFillMode: "forwards",
            }}
          >
             <div className="w-4 ">
              {Icon && <Icon className="text-blue-600 text-3xl mt-1" />}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm text-justify">
                {benefit.description}
              </p>
            </div>
          </div>
        )})}
      </div>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="hidden md:flex absolute -right-6 lg:-right-10 top-[45%] -translate-y-1/2  bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md hover:shadow-lg transition-all  group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalBatches }).map((_, i) => (
          <span
            key={i}
            onClick={() => goToBatch(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === Math.floor(startIndex / BATCH_SIZE)
                ? "bg-blue-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></span>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

// function BenefitsShowcase({ benefits }: { benefits: any[] }) {
//   const [startIndex, setStartIndex] = useState(0);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const BATCH_SIZE = 4;
//   const totalBatches = Math.ceil(benefits.length / BATCH_SIZE);

//   const startAutoSlide = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setStartIndex((prev) => (prev + BATCH_SIZE) % benefits.length);
//     }, 7000);
//   }, [benefits.length]);

//   useEffect(() => {
//     startAutoSlide();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [startAutoSlide]);

//   const goToNext = useCallback(() => {
//     setStartIndex((prev) => (prev + BATCH_SIZE) % benefits.length);
//     startAutoSlide();
//   }, [benefits.length, startAutoSlide]);

//   const goToPrev = useCallback(() => {
//     setStartIndex((prev) =>
//       prev - BATCH_SIZE < 0
//         ? benefits.length - BATCH_SIZE
//         : (prev - BATCH_SIZE) % benefits.length
//     );
//     startAutoSlide();
//   }, [benefits.length, startAutoSlide]);

//   const goToBatch = useCallback(
//     (batchIndex: number) => {
//       setStartIndex(batchIndex * BATCH_SIZE);
//       startAutoSlide();
//     },
//     [startAutoSlide]
//   );

//   const visible = benefits.slice(startIndex, startIndex + BATCH_SIZE);
//   const displayed =
//     visible.length < BATCH_SIZE
//       ? [...visible, ...benefits.slice(0, BATCH_SIZE - visible.length)]
//       : visible;

//   const ICONS_MAP: Record<string, any> = {
//     FaCheckCircle,
//     FaClock,
//     FaDollarSign,
//     FaUsers,
//     FaChartLine,
//     FaCloud,
//     FaCogs,
//     FaShieldAlt,
//     FaRulerCombined,
//     FaClipboardCheck,
//     FaUserCheck,
//     FaChartPie,
//     FaFileAlt,
//     FaPalette,
//     FaProjectDiagram,
//     FaChalkboardTeacher,
//     FaServer,
//     FaBarcode,
//     FaSortAmountDown,
//   };

//   return (
//     <div className="relative w-full group px-3 sm:px-4 md:px-6 lg:px-8">
//       {/* Left Arrow */}
//       <button
//         onClick={goToPrev}
//         className="hidden md:flex absolute -left-6 lg:-left-10 top-[45%] -translate-y-1/2 
//                    bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full 
//                    shadow-md hover:shadow-lg transition-all duration-300 group-hover:opacity-100"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>

//       {/* Benefits Grid */}
//       <div
//         className="
//           grid 
//           grid-cols-1 
//           sm:grid-cols-2 
//           lg:grid-cols-2 
//           xl:grid-cols-2 
//           gap-4 sm:gap-6 md:gap-8
//         "
//       >
//         {displayed.map((benefit, i) => {
//           const Icon = ICONS_MAP[benefit.icon];
//           return (
//             <div
//               key={i}
//               className={`flex items-start gap-3 sm:gap-4 lg:gap-6 
//                           bg-white p-4 sm:p-5  rounded-xl shadow-md 
//                           hover:shadow-lg transition-all duration-700 ease-out 
//                           opacity-0 translate-y-6 animate-slide-in`}
//               style={{
//                 animationDelay: `${i * 150}ms`,
//                 animationFillMode: "forwards",
//               }}
//             >
//               <div className="flex-shrink-0">
//                 {Icon && (
//                   <Icon className="text-blue-600 text-2xl sm:text-3xl lg:text-4xl mt-1" />
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-900">
//                   {benefit.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-base text-justify leading-relaxed">
//                   {benefit.description}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={goToNext}
//         className="hidden md:flex absolute -right-6 lg:-right-10 top-[45%] -translate-y-1/2 
//                    bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full 
//                    shadow-md hover:shadow-lg transition-all duration-300 group-hover:opacity-100"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>

//       {/* Pagination Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalBatches }).map((_, i) => (
//           <span
//             key={i}
//             onClick={() => goToBatch(i)}
//             className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all 
//               ${
//                 i === Math.floor(startIndex / BATCH_SIZE)
//                   ? "bg-blue-600 scale-110"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//           ></span>
//         ))}
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes slide-in {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }


const AboutSection = () => {

  const [about, setAbout] = useState<AboutData | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getAboutData()
      setAbout(data)
    }
    
    fetchData()
  }, [])
 

  if (!about) return 

  return (
    <section className="bg-gray-50  px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 justify-between items-center py-5">
        {/* Text Column */}
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 mb-4">{about?.title}</h2>
          <p className="text-lg text-gray-700 mb-8 text-justify">
            {about?.description}
            {/* FIDAS is not just inspection software; it is industry-leading Quality Intelligence Platform that integrates micro-level fabric quality details into macro-level business strategy and ensures highest standard of quality is maintained across your business value chain. */}
          </p>

          {/* Benefits Grid */}
          <div className="w-full">
          <BenefitsShowcase benefits = {about.Benefit}/>
          </div>
          
        </div>

        {/* Image Column */}
        <div className="w-full relative aspect-[4/3] lg:h-[400px] rounded-2xl overflow-hidden">
        <AutoImageSliders images={about.images} />
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;
