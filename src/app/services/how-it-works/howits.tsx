"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { client } from '@/lib/sanity'


interface Section {
  title: string;
  text: string;
  imgurl: string;
}

async function getData(): Promise<{ title: string; sections: Section[] }> {
  const query = `
    *[_type == "howFIDASWorks"][0]{
      title,
      sections[]{
        title,
        text,
        "img": img.asset->url
      }
    }
  `;
  return await client.fetch(query);
}

// Section type
// interface Section {
//   title: string;
//   text: string;
//   img?: {
//     asset?: {
//       url?: string;
//     };
//   };
// }


// Media query hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// ------------------------
// Static version (mobile)
// ------------------------
function StaticSections({ sections }: { sections: Section[] }) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-12">
      <h1 className="text-center text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
        How FIDAS Works
      </h1>

      {sections.map((sec, i) => (
        <div key={i} className="flex flex-col items-center gap-6">
        <Image src={sec.imgurl} alt={sec.title} width={800} height={600} className="rounded-lg shadow-md object-cover" />

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-2">
              {sec.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">{sec.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ------------------------
// Animated version (desktop/tablet)
// ------------------------

function AnimatedSectionItem({
  sec,
  i,
  total,
  scrollYProgress,
}: {
  sec: Section;
  i: number;
  total: number;
  scrollYProgress: any;
}) {
  const start = i / total;
  const end = (i + 1) / total;

  const opacity = useTransform(scrollYProgress,[start, end],i === total - 1 ? [0, 1.5] : [1.8, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="sticky top-30 h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 p-10"
    >
      {i % 2 === 0 ? (
        <>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">
              {sec.title}
            </h2>
            <p className="text-gray-600 text-lg">{sec.text}</p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[5/3]">
              <Image
                src={sec?.imgurl}
                alt={sec.title}
                fill
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex justify-center">
             <div className="relative w-full max-w-[500px] aspect-[5/3]">
                <Image
                  src={sec?.imgurl}
                  alt={sec.title}
                  fill
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
            
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600">
              {sec.title}
            </h2>
            <p className="text-gray-600 text-lg">{sec.text}</p>
          </div>
        </>
      )}
    </motion.div>
  );
}

function AnimatedSections({ sections }: { sections: Section[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto h-[700vh]"
    >
      {/* Sticky title */}
      <motion.div
        className="sticky top-[4.3rem] bg-blue-50 py-4 px-4 z-30"
        style={{ opacity: titleOpacity }}
      >
        <motion.h1
          style={{ opacity: titleOpacity }}
          className="sticky top-20 left-0 w-full text-center text-6xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 drop-shadow-lg z-30"
        >
          How FIDAS Works
        </motion.h1>
      </motion.div>

      {/* Sections */}
      <div className="relative">
        {sections.map((sec, i) => (
          <AnimatedSectionItem
            key={i}
            sec={sec}
            i={i}
            total={sections.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}


// ------------------------
// Main Component
// ------------------------
export  default function HowFidasWorks({ data }: { data: Section[] }){
  const isMobile = useMediaQuery("(max-width: 768px)");

 

  
  // Early return ensures hooks are never skipped
  if (isMobile) {
    return <StaticSections sections={data} />;
  }

  return <AnimatedSections sections={data} />;
}
