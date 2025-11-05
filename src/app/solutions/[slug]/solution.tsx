"use client";
import React, { act } from "react";
import {motion} from "framer-motion"
import Image from "next/image";
import { fabricModules } from "@/components/FidasContent";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

import { FaCogs, FaChartLine, FaSearch, FaLink } from "react-icons/fa";
import { CheckCircle, Cpu, LineChart, Layers } from "lucide-react";


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
interface IndustryPageData {
  slug: string
  name: string
  desc: string
  workflow?: { src?: { asset?: { url: string } } }
  objectives?: { icon: string; title: string; desc: string }[]
  software?: { title: string; text: string }[]
  hardware?: { title: string; text: string }[]
  features?: { title: string; text: string }[]
  benefits?: string[]
  image?: { src?: { asset?: { url: string } }; alt?: string }
  ctaText?: string
  ctaLink?: string
  related?: { slug: string; name: string; image?: { asset?: { url: string } } }[]
}

interface SolutionPageProps {
  data: IndustryPageData
}


const featureIcons = [FaCogs, FaChartLine, FaSearch, FaLink,CheckCircle, Cpu, LineChart, Layers];

const floatingVariants = {
  float: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "loop" },
  },
};

export default function SolutionPage({ data }: SolutionPageProps) {

  if (!data) return <p className="py-16 text-center">Solution not found.</p>;

  
   

    const otherSolutions = fabricModules.filter(
      i => i.slug !== (data?.slug || null)
    ).map(i=> ({
      href: i.href,
      name:i.name,
      icon: i.icon
    }))
    

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
     <div
       className="relative h-[80vh] flex items-center justify-center text-center bg-[length:110%] bg-left bg-no-repeat rounded-xl overflow-hidden animate-bg-pan"
     style={{
    backgroundImage: `url(${data?.image?.src?.asset?.url || "/placeholder.jpg"})`,
  }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="sticky top-32 text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            {data.name}
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {data.desc}
          </p>
          {/* <a href={activeIndustry.ctaLink}>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
              {activeIndustry.ctaText}
            </button>
          </a> */}
        </div>
      </div>


      <div className="w-full max-w-7xl mx-auto">

      {data.objectives && (
        <section className="my-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Core Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.objectives.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-3 border-t-4 border-green-500 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.workflow && (
      <section className="my-8 px-2 flex justify-center">
        <div className="relative w-full max-w-7.5xl px-auto py-8">
          {/* Title at top-left */}
          <h2 className=" text-3xl font-bold text-blue-600 px-3 py-1 rounded-md shadow-sm">
            {data.name} Workflow
          </h2>

          {/* Image */}
          <div className="relative w-full h-[14rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
          {data?.workflow?.src?.asset?.url && (
            <Image
              src={data.workflow.src.asset.url}
              alt={data.name || "Industry image"}
              fill
              priority
              className="object-cover rounded-none shadow-lg"
              sizes="(max-width: 640px) 100vw,
                    (max-width: 1024px) 100vw,
                    80vw"
            />
          )}
        </div>

        </div>
      </section>
    )}



      {data.software && data.hardware && (
        <div>
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Software for {data.name}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.software.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      

      <section className="py-16 px-4 md:px-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Hardware for {data.name}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.hardware.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
      )}

<section className="py-16   bg-gradient-to-r from-gray-50 to-gray-100">
  <h2 className="text-4xl font-bold text-start text-blue-700 mb-12">
    Features
  </h2>
  <div className="grid md:grid-cols-2 gap-8">
    {(data?.features ?? []).map((feature, idx) => (
      <motion.div
        key={idx}
        className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, delay: idx * 0.1 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
        <p className="text-gray-700 text-lg">{feature.text}</p>
      </motion.div>
    ))}
  </div>
</section>


        
      <section className="py-16  bg-gradient-to-br from-gray-50 to-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-start text-blue-700 mb-12">
          Benefits
        </h2>

        <motion.div
        className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {(data.benefits ?? []).map((benefit, idx) => (
          <motion.div
        key={idx}
        className="relative bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, delay: idx * 0.1 }}
      >

            <p className="text-gray-800 text-lg leading-relaxed font-medium z-10">{benefit}</p>
          </motion.div>
        ))}
      </motion.div>

      </section>

    
    {data.related && ( 
      <OtherSolutionsSection solutions={data?.related} />
    )}
    
      
    </div>
    <AppGridSection title="Explore Other Solutions" items={otherSolutions.slice(0,7)} />

      <motion.div
      className=" bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-500 animate-gradient-x
         text-white py-12 px-6 shadow-lg text-center  bg-white/20 backdrop-blur-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us for Your {data.name} Inspection Requirements
      </motion.h2>

      <motion.p
        className="mb-6 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Our experts are ready to help you optimize inspection and ensure quality.
      </motion.p>

      <motion.a
        href={'/contact'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="inline-block relative group"
      >
        {/* Outer animated glow */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-teal-400 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>

        {/* Button Core */}
        <button className="relative z-10 bg-white hover:bg-gradient-to-r from-white via-gray-50 to-white text-blue-700 font-bold px-10 py-4 rounded-lg shadow-lg tracking-wide transition-all duration-300 group-hover:text-white group-hover:from-blue-600 group-hover:to-teal-500 group-hover:shadow-2xl">
          <span className="inline-flex items-center gap-2">
            {data.ctaText}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl"
            >
              →
            </motion.span>
          </span>
        </button>
      </motion.a>

    </motion.div>


        <style jsx>{`
  @keyframes bg-pan {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-bg-pan {
    animation: bg-pan 30s linear infinite;
  }
`}</style>
    </div>
    
  );
}


import Link from "next/link";

interface SolutionCard {
  slug: string;
  name: string;
  image?: {
    asset?: { url: string }
  }
  // img : { src?: { asset?: { url: string } }; alt?: string };
}

interface OtherSolutionsProps {
  solutions: SolutionCard[];
}

  export const  OtherSolutionsSection: React.FC<OtherSolutionsProps> = ({ solutions}) => {
  return (
    <section className="py-8 px-4 md:px-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-start text-blue-700 mb-12">
        Related Solutions
      </h2>

      <motion.div
        className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {solutions.map((sol, idx) => (
          <motion.div
            key={sol.slug}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0,
                 transition: { duration: 0.5 } },
            }}
          >
            <Link href={`/solutions/${sol.slug}`} legacyBehavior>
              <a className="block">
                <div className="relative h-[10rem] w-full">
                  <img
                     src={sol.image?.asset?.url || "/fallback.jpg"}
                    alt={sol.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-500">
                    {sol.name}
                  </h3>
                </div>
              </a>
            </Link>
          </motion.div>
        ))}
      </motion.div>

    
    </section>
  );
}



interface AppGridSectionProps {
  title: string;
  items: {
    href: string;
    name: string;
    icon: string;
  }[];
}

export const  AppGridSection: React.FC<AppGridSectionProps> = ({ title, items }) => {


  return (
//     <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
//       <div className="max-w-7.5xl mx-auto px-6 text-center">
//         {/* Section Title */}
//         <h2 className="text-3xl md:text-3xl font-bold text-blue-700 mb-10">
//           {title}
//         </h2>

//         {/* Grid Layout */}
//        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//         <motion.div
//             className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 order-2 md:order-1"
//             style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
//             variants={staggerChildren}

//           >
//             {items.map((industry, index) => (
//             <ScrollAnimationWrapper key={index}>
//               <Link href={industry.href} legacyBehavior>
//               <motion.div
//                 className="bg-white bg-opacity-50 h-40 backdrop-filter backdrop-blur-lg rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-opacity-70 flex flex-col items-center justify-center py-6"
//                 variants={fadeInUp}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {/* Icon */}
//                 <motion.div
//                   className="text-5xl mb-3 text-blue-600"
//                   animate={floatingAnimation}
//                 >
//                   {industry.icon}
//                 </motion.div>

//                 {/* Name */}
//                 <h4 className="text-sm sm:text-base font-semibold text-slate-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
//                   {industry.name}
//                 </h4>
                
//               </motion.div>
//               </Link>
//             </ScrollAnimationWrapper>
//           ))}
//         </motion.div>
// </div>

//       </div>
//     </section>

    <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Section Title */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-10">
      {title}
    </h2>

    {/* Grid Layout */}
    {/* <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <motion.div
        className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 order-2 md:order-1"
        variants={staggerChildren}
        // style={{
        //   gridTemplateColumns: `repeat(${Math.min(items.length, 5)}, minmax(0, 1fr))`,
        // }}
      >
        {items.map((industry, index) => (
          <ScrollAnimationWrapper key={index}>
            <Link href={industry.href} legacyBehavior>
              <motion.div
                className="bg-white bg-opacity-50 h-36 sm:h-40 backdrop-filter backdrop-blur-lg 
                           rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 
                           hover:scale-105 hover:bg-opacity-70 flex flex-col items-center justify-center py-6"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon 
                <motion.div
                  className="text-4xl sm:text-5xl mb-3 text-blue-600"
                  animate={floatingAnimation}
                >
                  {industry.icon}
                </motion.div>

                {/* Name 
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 text-center 
                               bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                  {industry.name}
                </h4>
              </motion.div>
            </Link>
          </ScrollAnimationWrapper>
        ))}
      </motion.div>
    </div> */}

    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
  <motion.div
    className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 order-2 md:order-1"
    variants={staggerChildren}
  >
    {items.map((industry, index) => (
      <ScrollAnimationWrapper key={index}>
        <Link href={industry.href} legacyBehavior>
          <motion.div
            className="group relative bg-gradient-to-br from-white/80 to-white/40 h-36 sm:h-40 
                       backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden 
                       transition-all duration-500 cursor-pointer
                       hover:shadow-2xl hover:shadow-blue-500/20
                       border border-white/50 hover:border-blue-300/50
                       flex flex-col items-center justify-center p-6"
            variants={fadeInUp}
            whileHover={{ scale: 1.08,  }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-teal-500/0 
                          group-hover:from-blue-500/5 group-hover:to-teal-500/5 
                          transition-all duration-500" />
            
            {/* Icon */}
            <motion.div
              className="relative text-4xl sm:text-5xl mb-3 
                         text-blue-600 group-hover:text-blue-700
                         transition-colors duration-300
                         drop-shadow-sm"
              animate={floatingAnimation}
            >
              {industry.icon}
            </motion.div>

            {/* Name */}
            <h4 className="relative text-sm sm:text-base font-bold text-center 
                           bg-clip-text text-transparent bg-gradient-to-r 
                           from-slate-700 via-slate-800 to-slate-700
                           group-hover:from-blue-600 group-hover:via-blue-700 group-hover:to-teal-500
                           transition-all duration-300
                           leading-tight">
              {industry.name}
            </h4>
          </motion.div>
        </Link>
      </ScrollAnimationWrapper>
    ))}
  </motion.div>
</div>
  </div>
</section>

  );
};


