import React from "react";
import SolutionPage from "./solution";
import OtherSolutionPage from "./othersolution";
import type { Metadata } from "next";
import { getIndustryPageData, getOtherSolutionPageData } from "./utils";
import { notFound } from "next/navigation";

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
  const otherIndustryData = await getOtherSolutionPageData();

  // ✅ compare using slug.current
  const activeIndustry = industryData.find(
    (i:any) => i.slug?.current === params.slug
  );
  if (activeIndustry) {
    return (
      <div>
        <SolutionPage data={activeIndustry} />
      </div>
    );
  }
  // If not found → look in othersolutions

    const activeOther = otherIndustryData.find((i:any) => i.slug?.current === params.slug);
  if (activeOther) {
    return (
      <div>
        <OtherSolutionPage data={activeOther} />
      </div>
    );
  }
  console.log({
  slug: params.slug,
  industryFound: !!activeIndustry,
  otherFound: !!activeOther,
});

  notFound();
}
