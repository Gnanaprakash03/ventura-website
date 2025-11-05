import React from "react";
import SolutionPage from "./solution";
import OtherSolutionPage from "./othersolution";
// import { industries } from "@/data/industries";
// import { othersolutions } from "@/data/solutions";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";

interface SolutionPageProps {
  params: { slug: string };
}

export async function getIndustryPageData() {
  const query = `*[_type == "industryVerticalPage"]{
    "slug": slug.current,
    name,
    desc,
    workflow {
      src {
        asset->{
          url
        }
      }
    },
    objectives[] {
      icon,
      title,
      desc
    },
    software[] {
      title,
      text
    },
    hardware[] {
      title,
      text
    },
    features[] {
      title,
      text
    },
    benefits,
    image {
      src {
        asset->{
          url
        }
      },
      alt
    },
    ctaText,
    ctaLink,
    related[] {
      slug,
      name,
      "image": img {
        asset->{
          url
        }
      }
    }
  }`;

  const data = await client.fetch(query)
  // console.log(data);
  return data
}



export async function getOtherSolutionPageData() {
  const query = `*[_type == "otherSolutionPageType"]{
  "slug": slug.current,
    name,
    overview {
      desc,
      src {
        asset->{
          url
        }
      }
    },
    objectives[] {
      icon,
      title,
      desc
    },
    solutions[] {
      icon,
      title,
      desc
    },
    workflow[] {
      icon,
      title,
      desc
    },
    benefits[] {
      icon,
      title,
      desc
    },
    ctatitle,
    ctadesc,
    related[] {
      slug,
      name,
      "image": img {
        asset->{
          url
        }
      }
    }
  }`

  const data = await client.fetch(query)
  // console.log(data)
  return data
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
      images: [
        {
          url: `/og-solutions-${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${solutionName} by FIDAS`,
        },
      ],
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

  // const activeOther = await getOtherSolutionPageData(params.slug).catch(() => null)
  // othersolutions.find((i) => i.slug === params.slug);


    const otherIndustryData = await getOtherSolutionPageData();
    const activeOther = otherIndustryData.find((i:any) => i.slug === params.slug);
  if (activeOther) {
    return (
      <div>
        <OtherSolutionPage data={activeOther} />
      </div>
    );
  }

  // If not found anywhere
  return <p className="py-16 text-center">Solution not found.</p>;
}
