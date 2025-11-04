import HeroSlideshow from "@/components/HeroSlideshow";
import FidasContent from "@/components/FidasContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIDAS – Fabric Inspection & Automation Solutions",
  description:
    "Digitize your fabric inspection, grading, and packing with FIDAS. Improve textile quality, reduce wastage, and achieve real-time traceability with smart automation.",
  keywords: [
    "fabric inspection software",
    "textile automation",
    "fabric grading system",
    "AI quality control",
    "FIDAS",
    "textile ERP integration",
  ],
  openGraph: {
    title: "FIDAS – Smart Fabric Inspection & Automation Platform",
    description:
      "AI-powered inspection and quality management for the textile industry. Automate grading, mapping, and packing to deliver consistent quality every time.",
    url: "https://fidas.in",
    siteName: "FIDAS",
    images: [
      {
        url: "https://fidas.in/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "FIDAS Fabric Inspection Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDAS – Fabric Inspection & Automation",
    description:
      "Digitize your fabric inspection, grading, and traceability processes with FIDAS.",
    images: ["https://fidas.example.com/og-home.jpg"],
  },
};


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSlideshow />
      <FidasContent />
    </main>
  );
}