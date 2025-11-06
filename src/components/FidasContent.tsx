"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView,  useMotionValue, useAnimationFrame} from 'framer-motion';
import { useSpring, animated, config } from 'react-spring';
import Image from 'next/image';
import { CheckCircle, Search, Users, Sparkles, History, CircuitBoard, ArrowRight, Plus, Minus, Star } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { FaFileExcel,FaFileCsv,FaServer } from "react-icons/fa";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, TimedAccordion } from "@/components/ui/accordion"; // Add Accordion imports
import confetti from 'canvas-confetti';
import AboutSection from './about';
import FactsSlideCarousel from './reason';
import { FaChess } from "react-icons/fa";

import HardwareSection from './hardware';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    y: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const numberAnimation = {
  scale: [1, 1.2, 1],
  color: ['#3B82F6', '#60A5FA', '#3B82F6'],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};


const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0 }
};

const starAnimation = {
  rotate: 360,
  scale: [1, 1.2, 1],
  transition: {
    rotate: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    },
    scale: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ScrollAnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

// Update the Celebration component
function Celebration({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const triggerConfetti = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementY = rect.top;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: elementCenterX / window.innerWidth,
          y: elementY / window.innerHeight
        },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#4169E1', '#32CD32'],
        gravity: 1.5,
        scalar: 0.7,
        drift: 0,
        ticks: 200
      });
    }
  }, []); // No dependencies needed as it only uses ref

  useEffect(() => {
    const currentRef = elementRef.current; // Store ref in a variable
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            triggerConfetti();
            setHasTriggered(true);
            
            setTimeout(() => {
              setHasTriggered(false);
            }, 4000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) { // Use stored ref value
        observer.unobserve(currentRef);
      }
    };
  }, [hasTriggered, triggerConfetti]); // Add triggerConfetti to dependencies

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
}
const nodes = [
  { label: "SAP S/4 HANA", icon: "/images/icons/sap.png" },
  { label: "WHATSAPP", icon: "/images/icons/whatsapp.png" },
  { label: "AUTOMATED EMAIL", icon: "/images/icons/email.png" },
  { label: "CUSTOMER SCM CLOUD", icon: "/images/icons/cloud.png" },
  { label: "ANALYTICS", icon: "/images/icons/analytics.png" },
  { label: "VENDOR INCOMING DATA", icon: "/images/icons/vendor.png" },
  { label: "YOUR OWN PORTAL", icon: "/images/icons/portal.png" },
  { label: "AUTO SMS", icon: "/images/icons/sms.png" },
];

 


// Update the NumberCounter component
function NumberCounter({ n, suffix = '', duration = 3000 }: { n: string | number; suffix?: string; duration?: number }) {
  const [isInView, setIsInView] = useState(false);
  const targetNumber = typeof n === 'string' ? parseInt(n.replace(/,/g, '')) : n;
  
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: isInView ? targetNumber : 0 },
    config: {
      duration: duration
    },
    reset: false // Prevent reset on re-render
  });

  return (
    <motion.div
    className='inline-flex'
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.5 }}
    >
      <animated.span>
        {number.to((n) => `${Math.floor(n)}${suffix}`)}
      </animated.span>
    </motion.div>
  );
}

interface FidasContentData {
  trustedByTitle: string;
  trustedCompanies: Array<{
    asset: { url: string };
    alt: string;
  }>;
  expertiseTitle: string;
  videoUrl: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  testimonial: {
    quote: string;
    name: string;
    position: string;
    company: string;
  };
  whyChooseTitle: string;
  whyChoosePoints: Array<{
    title: string;
    description: string;
  }>;
  industryVerticalsTitle: string;
  industryVerticals: Array<{
    icon: string;
    name: string;
    description: string;
  }>;
  industryVerticalsIframeSrc: string;
  whyChooseFidas: Array<{
    title: string;
    description: string;
  }>;
  aboutFidas: {
    title: string;
    video: {
      asset: {
        url: string;
      };
    };
    points: Array<{
      pointTitle: string;
      description: string;
    }>;
  };
  twentyReasons: {
    sectionTitle: string;
    reasons: Array<{
      title: string;
      points: string[];
      image: {
        asset: {
          url: string;
        };
        alt: string;
      };
    }>;
  };
  optimizeSection: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      image: {
        asset: {
          _ref: string;
        };
        alt: string;
      };
    }>;
  };
  learnSection: {
    title: string;
    image: {
      asset: {
        _ref: string;
      };
      alt: string;
    };
    steps: string[];
  };
  interfaceSection: {
    title: string;
    devices: Array<{
      title: string;
      description: string;
      image: {
        asset: {
          _ref: string;
        };
        alt: string;
      };
      link: string;
    }>;
  };
  softwareProducts: {
    title: string;
    products: Array<{
      title: string;
      description: string;
      image: {
        asset: {
          _ref: string;
        };
        alt: string;
      };
      link: string;
    }>;
  };
  testimonials: {
    sectionTitle: string;
    testimonialsList: Array<{
      quote: string;
      author: string;
      position: string;
      company: string;
      image?: {
        asset: {
          _ref: string;
        };
      };
    }>;
  };
  statistics: {
    title: string;
    topStat: {
      value: string;
      label: string;
    };
    middleStats: Array<{
      value: string;
      label: string;
    }>;
    bottomStats: Array<{
      value: string;
      label: string;
      suffix?: string;
    }>;
    expertise: {
      value: string;
      label: string;
    };
  };
}






type Point = {
  title: string;
  description: string;
  fullContent: string;
};

interface ScrollSectionProps {
  image: string;
  points: Point[];
  reverse?: boolean; // to flip sides
}



export interface Fact {
  title: string
  points: string[]
  image: string
  conclusion: string
}

export interface FactsSectionData {
  heading: string
  Prefix?: string
  facts: Fact[]
}

export async function getFacts(): Promise<FactsSectionData | null> {
  const getfactsdata = await client.fetch(`*[_type == "factsSection"][0]{
  heading,
    Prefix,
  facts[] {
    title,
    points,
    "image": image.asset->url,
    conclusion
  }
}`)
  return getfactsdata
}


 interface StatisticItem {
  value: string
  label: string
}

interface BottomStat {
  value1: string
  value2?: string
  label: string
  suffix?: string
}

 interface StatisticsSectionData {
  title: string
  topStat: StatisticItem
  middleStats: StatisticItem[]
  bottomStats: BottomStat[]
  expertise: StatisticItem
}

 async function getStatistics(): Promise<StatisticsSectionData | null> {
  const data = await client.fetch(`*[_type == "statisticsSection"][0]{
    title,
    topStat { value, label },
    middleStats[] { value, label },
    bottomStats[] { value1, value2, label, suffix },
    expertise { value, label }
  }`)
  return data
}


async function getFidasContentData(): Promise<FidasContentData> {
  const fidasContentData = await client.fetch(`*[_type == "fidasContentPage"][0]{
    statistics{
      title,
      topStat,
      middleStats,
      bottomStats,
      expertise
    },
    trustedByTitle,
    trustedCompanies,
    aboutFidas{
      title,
      video{
        asset->{
          url
        }
      },
      points
    },
    expertiseTitle,
    videoUrl,
    features,
    testimonial,
    whyChooseFidas,
    whyChoosePoints,
    industryVerticalsTitle,
    industryVerticals,
    industryVerticalsIframeSrc,
    twentyReasons{
      sectionTitle,
      reasons[] {
        title,
        points,
        image{
          asset->{
            url
          },
          alt
        }
      }
    },
    optimizeSection{
      title,
      subtitle,
      features[] {
        title,
        image{
          asset->,
          alt
        }
      }
    },
    learnSection{
      title,
      image{
        asset->,
        alt
      },
      steps
    },
    interfaceSection{
      title,
      devices[] {
        title,
        description,
        image{
          asset->,
          alt
        },
        link
      }
    },
    softwareProducts{
      title,
      products[] {
        title,
        description,
        image{
          asset->,
          alt
        },
        link
      }
    },
    testimonials{
      sectionTitle,
      testimonialsList[] {
        quote,
        author,
        position,
        company,
        image{
          asset->
        }
      }
    }
  }`);
  
  return fidasContentData;
}

const colorClasses = [
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-teal-500'
];

export const fabricModules = [
  {
    slug: 'greige',
    _key: '23e9abdc51f3',
    name: 'Greige Fabric',
    description: 'Greige Fabric Inspection Software',
    icon: '🧵',
    href:"/solutions/greige"
  },
  {
    slug: "knitted",
    _key: '419708624844',
    name: 'Knitted Fabric',
    description: 'Knitted Fabric Inspection Software',
    icon: '🪡',
    href:"/solutions/knitted"
  },
  {
    slug: "processed-fabric-inspection-software",
    _key: 'c9d2fae184b5',
    name: 'Processed Fabric',
    description: 'Processed Fabric Inspection Software',
    icon: '⚙️',
    href: "/solutions/processed-fabric-inspection-software"
  },
  {
    slug: "denim",
    _key: 'd705d55d285c',
    name: 'Denim Fabric',
    description: 'Cut Optimization Module',
    icon: '👖',
    href:"/solutions/denim"
  },
  {
    slug: "measurement-alerting-system",
    _key: '703943684519',
    name: 'Automotive Fabric',
    description: 'Seating Fabric Inspection Solutions',
    icon: '🏷️', // changed — represents labeling, barcode, traceability
    href: "/solutions/measurement-alerting-system",
  },
  {
    slug: "home-textiles",
    _key: 'd72042400807',
    name: 'Home Textiles',
    description: 'Specifically Developed to Suit Industry Needs',
    icon: '🏠',
    href:"/solutions/home-textiles"
  },
  // {
  //   slug:"",
  //   _key: 'd72042400807',
  //   name: 'Technical Textiles',
  //   description: 'Specifically Developed to technical Industry Needs',
  //   icon: '🧰',
  //   href:"/solutions/technical-textiles"
  // },
  {
    slug: "apparel",
    _key: 'a1cdd02af114',
    name: 'Apparel Manufacturing',
    description: 'Fabric Inspection for Readymade Garmenting',
    icon: '👕',
    href:"/solutions/apparel"
  },
  {
    slug:"",
    _key: 'b4e8cda372f9',
    name: 'Shirting & Suiting (Than Management)',
    description: 'Shirting and Suiting Fabric Inspection Software',
    icon: '👔',
    href: "/solutions/shirting-suiting"
  }
];


const components = [
  "Electronic Length Measurement Counter",
  "Fabric Width Measurement Sensor",
  "Permanent Roll Printer – Grey Fab",
  "Digital X, Y Coordinate Locator",
  "Defect Camera for Sewing Defect",
  "Real-time GSM Measurement",
  "Weighing Scale Integration",
  "Electronic EPI / PPI Counter",
  "Auto Defect Label Applicator",
  "Computer Integrated Colorimeter",
  "Multi-Touch Touchscreen Monitor",
  "Roll Face Side Marking System",
  "Industrial PC",
  "Interactive Voice Speakers",
  "Roll Auto Packing",
  "Roll Number Barcode / QR Printing",
  "Roll Barcode / QR Scanner",
  "Automated Storage & Retrieval System",
];



export default function FidasContent() {
   
      const [pageData, setPageData] = React.useState<FidasContentData | null>(null);
      const [factsData, setFactsData] = React.useState<FactsSectionData | null>(null);
      const [statisticsData, setStatisticsData] = React.useState<StatisticsSectionData | null>(null)

      

  React.useEffect(() => {
    getFidasContentData().then(data => setPageData(data));
    getFacts().then(data=> setFactsData(data));
    getStatistics().then(data => setStatisticsData(data));
  }, []);

  // Simplify video logic
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Simple autoplay when video is ready
    video.play().catch((error) => {
      console.log("Video autoplay failed:", error);
    });

  },
   []);


  if (!pageData && !factsData) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
      <Image
        src="/images/loading.gif"
        alt="Loading..."
        width={100}
        height={100}
        style={{ height: "auto" }}
        className="object-contain"
      />
    </div>
    ) 
  }



  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <div className=" pt-0">
        
        {/* Trusted By Section */}
        <section className="p-12 w-full  w-max-6xl">
          <ScrollAnimationWrapper>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center 
                        pb-2 sm:pb-3 mb-8 sm:mb-10 md:mb-12 
                        bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            >
              {pageData?.trustedByTitle}
            </h2>

          </ScrollAnimationWrapper>
          
          <div className="relative w-full  w-max-6xl mx-auto  overflow-hidden">
            <div className="flex">
              <div
              className="flex space-x-12 whitespace-nowrap animate-marquee "
                style={{ willChange: 'transform' }}
              >
                {/* First set of images */}
                {pageData?.trustedCompanies.map((company, index) => (
                  <div 
                    key={`first-${index}`} 
                    className="flex-shrink-0 flex items-center justify-center min-w-[200px]"
                  >
                    <Image
                      src={urlForImage(company.asset)?.url() || ''}
                      alt={company.alt || 'Trusted Company'}
                      width={150}
                      height={60}
                      className="object-contain"
                      style={{ height: "auto" }}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {pageData?.trustedCompanies.map((company, index) => (
                  <div 
                    key={`second-${index}`} 
                    className="flex-shrink-0 flex items-center justify-center min-w-[200px]"
                  >
                    <Image
                      src={urlForImage(company.asset)?.url() || ''}
                      alt={company.alt || 'Trusted Company'}
                      width={150}
                      height={60}
                      className="object-contain"
                      style={{ height: "auto" }}
                    />
                  </div>
                ))}
                </div>
              
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-8 sm:py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Title */}
              <ScrollAnimationWrapper>
                <h2 className="text-2xl sm:text-3xl md:text-[3.5rem] py-4  font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                  { statisticsData?.title }
                </h2>
              </ScrollAnimationWrapper>

              <div className="flex flex-col gap-2 items-center space-y-3">
                {/* First Row - 1 item */}
                <div className="grid grid-cols-1 gap-3 w-full max-w-md sm:max-w-md">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                  >
                    <motion.div className="text-2xl sm:text-3xl md:text-[2.9rem] font-bold text-blue-600">
                      {statisticsData?.topStat.value}
                    </motion.div>
                    <span className="text-sm sm:text-base md:text-lg text-gray-600 mt-1 font-medium">
                      { statisticsData?.topStat.label || 'Fidas is No. 10 Fabric Inspection Software Globally'}
                    </span>
                  </motion.div>
                </div>

                {/* Second Row - 2 items */}
                <div className="grid  grid-cols-2 gap-6 sm:gap-10 w-full max-w-5xl">
                  {statisticsData?.middleStats.map((data,index) =>(
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                  >
                    <motion.div className="text-2xl sm:text-3xl md:text-[2.9rem] font-bold text-blue-600">
                      <NumberCounter n={data.value} duration={3000} />
                    </motion.div>
                    <span className="text-sm sm:text-base md:text-lg text-gray-600 mt-1 font-medium">
                      {data.label}
                    </span>
                  </motion.div>
                  ))}
                </div>

                {/* Third Row - 3 items */}
                <div className="grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-9xl">
                  {statisticsData?.bottomStats.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * (i + 4) }}
                      className="flex flex-col items-center justify-center text-center p-3 sm:p-4 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300"
                    >
                      <motion.div className="text-xl sm:text-2xl md:text-3xl lg:text-[2.9rem] font-bold text-blue-600">
                        {item?.value1 && item?.value2 ? (
                          <>
                            <NumberCounter n={Number(item.value1)} duration={3000} />.
                            <NumberCounter n={Number(item.value2)} duration={3000} /> {item?.suffix}
                          </>
                        ) : (
                          
                             <NumberCounter n={item.value1} duration={3000} />
                           
                        )}
                      </motion.div>
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mt-1 font-medium">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                  </div>


                {/* Bottom Row - Years of Expertise */}
                <Celebration>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 8px 30px rgba(59,130,246,0.7)",
                    }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg w-full max-w-4xl relative overflow-hidden mt-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                      <motion.div className="text-3xl sm:text-4xl md:text-5xl font-bold inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent px-2 sm:px-4">
                        <NumberCounter n={statisticsData?.expertise.value || 20} duration={2500} />
                      </motion.div>
                      <span className="text-lg sm:text-2xl md:text-3xl font-medium whitespace-nowrap">
                        {statisticsData?.expertise.label}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-800/50 backdrop-blur-sm" />
                  </motion.div>
                </Celebration>
              </div>
            </div>
        </section>
                  
        <AboutSection />

          
        {/* Features Grid Section */}
        <div className=' py-8 mb-10'>
        <section id="Features"  className="relative  w-full  mx-auto px-10  shadow:lg  ">
          
           
          <div className=' my-5  z-50 rounded-2xl px-4'>
            {/* <ScrollAnimationWrapper> */}
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-center mb-1 bg-clip-text text-slate-900 bg-gradient-to-r from-blue-600 to-teal-400 flex flex-wrap justify-center items-center gap-2 relative">
              {/* {pageData.twentyReasons?.sectionTitle || "FIDAS is the right choice for computerization of Fabric Inspection: 20 Reasons"}   */}
               <span className='text-blue-700'>{factsData?.Prefix}</span>{" "}
               - {factsData?.heading} 
               {/* <FaChess className="w-20 h-20 text-blue-700 pl-5 relative" /> */}
            </h2>
          {/* </ScrollAnimationWrapper> */}
          </div>

          <FactsSlideCarousel facts={factsData?.facts ?? []} />
        </section>

        </div>
        




        <section className="py-16 bg-gray-50">
          <HardwareSection />

          <div className="max-w-7xl mx-auto px-4 text-center">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
    Software Integrations
  </h2>

  <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-2xl mx-auto">
    FIDAS seamlessly integrates with leading ERP and production management systems,
    enabling automatic data exchange for inspection results, fabric roll tracking,
    and quality reports. This ensures smooth workflow automation, real-time visibility,
    and accurate updates across your entire production process.
  </p>

  <div className="relative flex items-center justify-center w-full h-[400px] sm:h-[450px] md:h-[500px]">
    {/* Center Circle */}
    <div className="absolute flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border border-teal-400/40 rounded-full shadow-lg group">
      <Image
        src="/images/icons/fidas-software.png"
        alt="FIDAS Software"
        width={90}
        height={90}
        className="object-contain pointer-events-none"
        priority
      />
      <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
        FIDAS Software
      </span>
    </div>

    {/* Rotating Orbit */}
    <motion.div
      className="absolute rounded-full border border-teal-400/40 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {nodes.map((node, i) => {
        // 🔹 Responsive radius based on screen size
        const radius = typeof window !== "undefined"
          ? window.innerWidth < 640
            ? 110
            : window.innerWidth < 1024
            ? 145
            : 180
          : 180;

        const angle = (i / nodes.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-md backdrop-blur-sm group"
            style={{
              top: `calc(50% + ${y}px - 40px)`,
              left: `calc(50% + ${x}px - 40px)`,
            }}
            whileHover={{ scale: 1.15 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            <Image
              src={node.icon}
              alt={node.label}
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="absolute bottom-[-1.8rem] left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-30">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
</div>

        </section>




        <section className="py-4 w-full max-w-7xl mx-auto relative">
            <h2 className="sticky top-0 md:top-[4.5rem] z-20 py-3 mb-6 text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 bg-white/70 backdrop-blur-md">
              {pageData?.industryVerticalsTitle}
            </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 order-2 md:order-1"
              variants={staggerChildren}
            >
              {fabricModules.map((industry, index) => (
                <ScrollAnimationWrapper key={index}>
                  <motion.div
                    className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-opacity-70 h-full"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="px-4 py-2 h-full flex flex-col justify-between">
                      <motion.div className="text-4xl mb-2" animate={floatingAnimation}>
                        {industry.icon}
                      </motion.div>

                      <div>
                        <h4 className="text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                          {industry.name}
                        </h4>
                        <p className="text-sm text-gray-600">{industry.description}</p>
                      </div>

                      {/* ✅ Link Section */}
                      <div className="px-4 pb-4 flex justify-end">
                        <Link
                          href={industry.href}
                          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Read More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </ScrollAnimationWrapper>
              ))}
            </motion.div>
          </div>
        </section>


        
             

        {/* Testimonials Section */}
        <section className="py-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl px-4">
            <ScrollAnimationWrapper>
              <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                {pageData?.testimonials?.sectionTitle || 'What Our Clients Say'}
              </h2>
            </ScrollAnimationWrapper>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData?.testimonials?.testimonialsList?.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-6 text-blue-500 bg-white rounded-full p-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="mb-6 text-gray-700 italic pt-6">
                    &lsquo;{testimonial.quote}&rsquo;
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={urlForImage(testimonial.image)?.url() || '/fallback-avatar.jpg'}
                          alt={testimonial.author}
                          style={{ height: "auto" }}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-blue-600">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.position} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* ...rest of section... */}
          </div>
        </section>

      </div>
    </div>
  );
}

function getIconForIndex(index: number) {
  const icons = [
    <Search className="w-8 h-8 text-blue-500" key="search" />,
    <Users className="w-8 h-8 text-blue-500" key="users" />,
    <Sparkles className="w-8 h-8 text-blue-500" key="sparkles" />,
    <History className="w-8 h-8 text-blue-500" key="history" />,
    <CircuitBoard className="w-8 h-8 text-blue-500" key="circuit" />
  ];
  return icons[index % icons.length];
}