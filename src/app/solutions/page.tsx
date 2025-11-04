import IndustrySolutionsPage from "./solutionspage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions – FIDAS Fabric Inspection & Automation",
  description:
    "Explore FIDAS solutions for fabric inspection, grading, quality reporting, and textile automation. Improve efficiency and reduce defects with smart technology.",
  keywords: [
    "FIDAS solutions",
    "fabric inspection software",
    "textile automation",
    "quality reporting system",
    "fabric grading system",
    "AI textile inspection",
  ],
  openGraph: {
    title: "FIDAS Solutions – Smart Fabric Inspection & Automation",
    description:
      "Discover FIDAS solutions for defect detection, grading, and textile quality management with real-time reporting and automation.",
    url: "https://fidas.in/solutions",
    siteName: "FIDAS",
    images: [
      {
        url: "/og-solutions.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Fabric Inspection Solutions Overview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS Solutions – Fabric Inspection & Automation",
    description:
      "Explore FIDAS solutions for fabric grading, quality reporting, and textile automation.",
    images: ["/og-solutions.jpg"],
  },
};

export default function SolutionPage(){
    return (
        <div>
            <IndustrySolutionsPage />
        </div>
    )
}