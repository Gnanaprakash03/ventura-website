import React from "react";
import SolutionPage from "./solution";
import OtherSolutionPage from "./othersolution";
import type { Metadata } from "next";
import { getIndustryPageData, getOtherSolutionPageData } from "./utils";

interface SolutionPageProps {
  params: { slug: string };
}

// Dynamic Metadata
export function generateMetadata({ params }: SolutionPageProps): Metadata {
  const solutionName = params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return {
    title: `${solutionName} – FIDAS Solutions`,
    description: `Explore the ${solutionName} solution by FIDAS for fabric inspection, grading, and textile quality automation.`,
    openGraph: {
      title: `${solutionName} – FIDAS Solutions`,
      description: `Discover how FIDAS ${solutionName} improves fabric inspection, grading, and quality reporting for textiles.`,
      url: `https://fidas.in/solutions/${params.slug}`,
      siteName: "FIDAS",
      type: "website",
    },
  };
}

interface PageProps {
  params: { slug: string };
}

export default async function Solutions({ params }: PageProps) {
  // const Industry = await getIndustryPageData();
  // const activeIndustry = Industry.find((i) => i.slug === params.slug);
   const industryData = await getIndustryPageData();

  // ✅ compare using slug.current
  const activeIndustry = industryData.find(
    (i:any) => i.slug === params.slug
  );
  if (activeIndustry) {
    return (
      <div>
        <SolutionPage data={activeIndustry} />
      </div>
    );
  }
  // If not found → look in othersolutions
  
  const otherIndustryData = await getOtherSolutionPageData();

  const activeOther = otherIndustryData.find((i:any) => i.slug === params.slug);
  if (activeOther) {
    return (
      <div>
        <OtherSolutionPage data={activeOther} />
      </div>
    );
  }
  
 
}
