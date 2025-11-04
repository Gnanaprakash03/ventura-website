"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AppGridSection } from "./solution";
import { fabricModules } from "@/components/FidasContent";
import { OtherSolutionsSection } from "./solution";
import { othersolutions } from "@/data/solutions";


interface PageProps {
 data : OtherSolutionPageData
}

 interface OtherSolutionPageData {
  slug: string,
  name: string
  overview?: { desc?: string; src?: { asset?: { url: string } } }
  objectives?: { icon: string; title: string; desc: string }[]
  solutions?: { icon: string; title: string; desc: string }[]
  workflow?: { icon: string; title: string; desc: string }[]
  benefits?: { icon: string; title: string; desc: string }[]
  ctatitle?: string
  ctadesc?: string
  related?: { slug: string; name: string; image?: { asset?: { url: string } } }[]
}


export default function OtherSolutionPage({ data }: PageProps) {
  

      const otherSolutions = fabricModules.filter(
        i => i.name !== (data?.name || null) 
      ).map(i=> ({
        href: i.href,
        name:i.name,
        icon: i.icon
      }))

  return (
    <div className="bg-brand-bg text-gray-800 font-inter leading-relaxed">
      <div className="container mx-auto md:p-10 max-w-7xl relative">
        {/* Header */}
        <header className="sticky top-[4.5rem] z-30 text-center mb-12 bg-gray-50 py-3">
          <h1 className="text-4xl md:text-4xl py-1 font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            {data.name}
          </h1>
        </header>

        {/* Overview */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Solution Overview
              </h2>
              <p className="text-gray-700 text-lg mb-4">{data?.overview?.desc}</p>
            </div>

            <div className="flex-1">
              <img
                src={data?.overview?.src?.asset?.url}
                alt={data.name}
                className="w-full rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.objectives?.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-3 border-t-4 border-red-500 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
           Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.solutions?.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                  {f.title}
                </h3>
                
                
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Workflow */}
        {data.workflow && data.workflow.length > 0 && (

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-start">
            System Workflow
          </h2>

          <div className="hidden md:flex items-center justify-between gap-6">
            {(data?.workflow ?? []).map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 text-center">
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-12 text-center text-3xl">➡️</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile view */}
          <div className="md:hidden space-y-6">
            {data.workflow.map((s, i,arr) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-6 text-center"
              >
                <div className="text-4xl mb-3">{s.icon}</div>
                <h4 className="font-semibold mb-1">{s.title}</h4>
                <p className="text-gray-600 text-sm">{s.desc}</p>
                {i < arr.length - 1 && (
                  <div className="text-2xl mt-3">⬇️</div>
                )}
              </div>
            ))}
          </div>
        </section>


        )}

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Benefits</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.benefits?.map((b, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-3 border-t-4 border-green-500 hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-3xl">{b.icon}</span>
                  <h3 className="text-xl font-semibold">{b.title}</h3>
                  <p className="text-gray-600">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {data.related && ( 
      <OtherSolutionsSection solutions={data?.related} />
    )}
    </div>
    <AppGridSection title="Explore other solutions" items={otherSolutions}/>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center">
          <div className="container mx-auto max-w-4xl px-6">
            <h3 className="text-3xl sm:text-4xl font-semibold mb-4">
              {data.ctatitle}
            </h3>
            <p className="text-lg mb-8">{data.ctadesc}</p>
            <div className="flex justify-center">
              <Button
                onClick={() => (window.location.href = "/contact")}
                className="w-full sm:w-auto min-w-[220px] px-6 sm:px-8 py-5 sm:py-4 bg-white/90 hover:bg-white border-2 border-blue-600 rounded-full text-blue-600 text-base sm:text-lg font-medium transition-colors flex items-center justify-center shadow-md backdrop-blur-sm hover:scale-105"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      
    </div>
  );
}
