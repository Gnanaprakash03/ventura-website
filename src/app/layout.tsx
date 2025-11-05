import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MainContentWrapper from "@/components/MainContentWrapper";
import ScrollToTopButton from "@/components/ui/ScrollToPButton";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import FlyingWhatsApp from "@/components/ui/whatsapp";
import Script from "next/script";
import RecaptchaProviderWrapper from "@/components/ui/RecaptchaProviderWrapper";

const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Default title and template for all pages
  title: {
    default: "FIDAS | Fabric Inspection Software",
    template: "%s | FIDAS",
  },

  // Global description for SEO
  description:
    "FIDAS is an advanced fabric inspection software for textile and apparel industries, offering grading, defect analysis, quality reporting, and ASTM 4-point system tracking.",

    // Open Graph (social media preview)
  openGraph: {
    title: "FIDAS | Fabric Inspection Software",
    description:
      "Optimize fabric inspection, grading, and quality reporting with FIDAS software. Reduce wastage and improve textile quality with AI-driven insights.",
    url: "https://fidas.in",
    siteName: "FIDAS",
    images: [
      { url: "https://fidas.in/og.png", width: 1200, height: 630 },
    ],
    type: "website",
  },

  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: "FIDAS | Fabric Inspection Software",
    description:
      "Optimize fabric inspection, grading, and quality reporting with FIDAS software.",
    images: ["https://fidas.in/og-image.jpg"],
  },

  // Robots (for search engines)
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // Favicon
  icons: {
    icon: "/favicon.ico",
  },
};

// export const metadata1: Metadata = {
//   title: "FIDAS",
//   description: "Empowering financial decisions with AI-driven insights",
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}');
          `}
        </Script>
      </head>
       
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <RecaptchaProviderWrapper>
        <Navbar />
        <MainContentWrapper>{children}</MainContentWrapper>
        <FlyingWhatsApp phoneNumber="9962936356"/>
        <ScrollToTopButton />
        <Footer />
        {/* <Suspense fallback={null}>
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        </Suspense> */}
        </RecaptchaProviderWrapper>
      </body>
    </html>
  );
}