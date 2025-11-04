"use client";

import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";        
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export interface SolutionItem {
  name: string;
  desc: string;
  imageUrl: string;
  href: string;
}

export interface CTASection {
  title: string;
  desc: string;
  url: string;
  btn: string;
}

export interface SolutionRootPageData {
  title: string;
  subtitle: string;
  overviewTitle: string;
  overviewDesc: string;
  solutions: SolutionItem[];
  otherSolutions: SolutionItem[];
  ctaSection: CTASection;
}
export async function getSolutionRootPage(): Promise<SolutionRootPageData | null> {
  const query = `
    *[_type == "solutionRootPage"][0]{
      title,
      subtitle,
      overviewTitle,
      overviewDesc,
      solutions[]{
        name,
        desc,
        "imageUrl": image.asset->url,
        href
      },
      otherSolutions[]{
        name,
        desc,
        "imageUrl": image.asset->url,
        href
      },
      ctaSection {
        title,
        desc,
        url,
        btn
      }
    }
  `;

    const data = await client.fetch(query);
    return data;
}


export const solutions = [
  // Fabric-Based Solutions
  {
    name: "Greige Fabric",
    desc: "Roll tracking & inspection mapping from raw fabrics.",
    image: "/images/solutions/fidas-software-greige.jpg",
    href: "/solutions/greige",
    category: "Fabric",
  },
  {
    name: "Knitted Fabric",
    desc: "Quality analysis, defect detection, and reporting.",
    image: "/images/solutions/fidas-software-knitts.jpg",
    href: "/solutions/knitted",
    category: "Fabric",
  },
  {
    name: "Processed Fabric",
    desc: "Processed Fabric Inspection Software",
    image: "/images/solutions/FIDAS-processed-fabric.png",
    href: "/solutions/processed-fabric-inspection-software",
    category: "Fabric",
  },
  {
    name: "Denim Fabric",
    desc: "In-roll optimization and intelligent analytics.",
    image: "/images/solutions/FIDAS-software-denim.jpg",
    href: "/solutions/denim",
    category: "Fabric",
  },
  {
    name: "Home Textiles",
    desc: "Grade & style-based fabric processing.",
    image: "/images/solutions/fidas-software-home-textile.jpg",
    href: "/solutions/home-textiles",
    category: "Fabric",
  },
  {
    name: "Apparel Manufacturing",
    desc: "ERP-integrated inspection for garment fabrics.",
    image: "/images/solutions/fidas-process-apparel-software.jpg",
    href: "/solutions/apparel",
    category: "Fabric",
  },

  // Functional / Process Solutions
  {
    name: "Loom Planning Software",
    desc: "Beam & doff planning and resource mapping.",
    image: "/images/solutions/fidas-software-loom-planning.png",
    href: "/solutions/loom-planning-software",
    category: "Process",
  },
  {
    name: "Loom Roll Doffing Software",
    desc: "Automatic tagging & allocation of rolls.",
    image: "/images/solutions/fidas-software-roll-doffing.png",
    href: "/solutions/loom-roll-doffing-software",
    category: "Process",
  },
  
  {
    name: "Process Houses",
    desc: "Realtime Width Measurement Solutions",
    image: "/images/products/fidas-process-woven-inspection-software.jpg",
    href: "/solutions/realtime-width-measurement-solution",
    category: "Process",
  },
  {
    name: "Fabric Roll Sorting",
    desc: "Fabric roll sorting & palletizing",
    image: "/images/solutions/FIDAS-fabric-roll-software.png",
    href: "/solutions/fabric-roll-sorting-software",
    category: "Process",
  },
  {
    name: "Automotive Fabric",
    desc: "Length, width, thickness realtime measurement alerting system",
    image: "/images/solutions/fidas-process-asrs-software.jpg",
    href: "/solutions/measurement-alerting-system",
    category: "Process",
  },
  {
    name: "Automotive Panel",
    desc: "Automotive Panel Traceability & Packaging System",
    image: "/images/solutions/FIdas-automotive-panel-software.jpg",
    href: "/solutions/automotive-panel-traceability-packaging-system",
    category: "Process",
  },
  {
    name: "ASRS",
    desc: "Automated storage and Retrieval System.",
    image: "/images/products/FIDAS-ASRS.png",
    href: "/solutions/automated-storage-retrieval-system",
    category: "Process",
  },
  {
    name: "Yarn Inventory",
    desc: "Yarn Inventory Management System",
    image: "/images/solutions/fidas_yarn_inventory_management_software.png",
    href: "/solutions/yarn-inventory-management-software",
    category: "Process",
  },
  {
    name: "Yarn Packing",
    desc: "Yarn Packing Management System",
    image: "/images/solutions/fidas-yarn-packing-software.png",
    href: "/solutions/yarn-packing-software",
    category: "Process",
  },
];

export default  function IndustrySolutionsPage() {
  const [solutionPageData,setSolutionPageData] = React.useState<SolutionRootPageData | null>(null);
  const fabricSolutions = solutions.filter((s) => s.category === "Fabric");
  const processSolutions = solutions.filter((s) => s.category === "Process");

React.useEffect(()=> {
  getSolutionRootPage().then(data => setSolutionPageData(data))
})

  return (
    <div className="min-h-screen flex flex-col">
    <HeroSlideshow />

      {/* Overview */}
      <section className="py-16 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {solutionPageData?.overviewTitle }
          </h2>
          <p className="text-gray-600 text-lg">
            {solutionPageData?.overviewDesc}
            {/* FIDAS ensures precision, traceability, and quality compliance across every stage of textile production — from raw fabrics to finished goods. */}
          </p>
        </div>
      </section>

      {/* Fabric-Based Solutions */}
      <section  id="industries" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionPageData?.solutions.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl shadow-md  overflow-hidden bg-white hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="h-60 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 h-36">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                    </div>
                  
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Functional Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-start">
           Other Solutions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionPageData?.otherSolutions.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl   shadow-md overflow-hidden bg-white hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 h-36">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            {solutionPageData?.ctaSection.title}
          {/* Ready to Automate Your Fabric Inspection Line? */}
        </h2>
        <p className="text-lg mb-8">
          {solutionPageData?.ctaSection.desc}
          {/* Let’s optimize your inspection workflow with smart, data-driven insights. */}
        </p>
        <Link href={`${solutionPageData?.ctaSection.url}`}>
        <Button className="bg-white text-blue-600 hover:bg-blue-100 font-medium text-lg rounded-full px-8 py-3">
          {/* Contact Us */}
          {solutionPageData?.ctaSection.btn}
        </Button>
        </Link>
      </section>
    </div>
  );
}



const images = [
  "/images/products/fidas-denim-fabric-1.jpg",
  "/images/products/knitted-fabric-bg-2.jpg",
  "/images/products/knitted-fabric-bg-3.png",
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  // Cycle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-white py-20 text-center h-[500px] sm:h-[600px] overflow-hidden">
      {/* Image slideshow */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[current]})` }}
        />
      </AnimatePresence>

      {/* Optional overlay for contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-3xl mx-auto px-4 flex flex-col justify-center h-full"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Smart Fabric Inspection for Every Industry
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          FIDAS adapts to the unique inspection needs of every fabric — from greige to denim, apparel to automotive.
        </p>
        <Button
          onClick={() =>
            document.getElementById("industries")?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-blue-500 text-white hover:bg-blue-700 hover:scale-105 font-medium text-lg rounded-full px-8 py-3 self-center"
        >
          Explore Solutions
        </Button>
      </motion.div>
    </section>
  );
}
