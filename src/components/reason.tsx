
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


import { client } from '@/sanity/lib/client'






export const facts: Fact[] = [
  {
    title: "Improved Production",
    points: [
      "Faster Defect Logging",
      "No more manual marking",
      "No defect re-entry in System",
      "Reduced Roll Doff time"],
    image: "/images/facts/fidas-software-improved-production.png",
    conclusion: "Improved production by 50%",
  },
  {
    title: "Amazing Cost benefits",
    points: ["Reduced labour",
       "Reduce waste by 20%",
        "Increase fresh by 1%",
        "Best in class ROI"],
    image: "/images/facts/fidas-software-cost-benefit.png",
    conclusion: "ROI Within 18 Months!!!",
  },

  {
    title: "Corrective Actions",
    points: ["Track defects by department",
      "Root cause analysis",
      "Implement CAPA",
      "Drive production ownership"
    ],
    image: "/images/facts/fidas-software-corrective-actions-3.png",
    conclusion: "Continuous quality improvement",
  },
  {
    title: "Automate",
    points: ["Automated fabric gradtion",
      "Verify actual vs calculated weight",
      "Barcode/QRCode based traceability",
      "IoT based length/width/color"
    ],
    image: "/images/facts/fidas-software-automation-1.png",
    conclusion: "FIDAS makes your life easy!",
  },
  {
    title: "Achieve Accuracy",
    points: ["Accurate length meter/yard",
              "Accurate width ",
              "Accurate gradation", 
              "Accurate digital quality"],
    image: "/images/facts/fidas-achivie-accuracy.png",
    conclusion: "Avoid manual error",
  },
  {
    title: "No Clerical Task",
    points: ["Zero Manual Logging",
              "Seamless Report Automation", 
              "Automated Delivery Mapping", 
              "Digital Performance Reporting"],
    image: "/images/facts/no-clerical-task.png",
    conclusion: "Save Clerical Manpower",
  },
  {
    title: "Consistent quality Ensured ",
    points: ["Automated Quality Grading",
              "Restricted Downgraded Delivery",
              "Precision Weight Control",
              "Precision Fabric Splicing"],
    image: "/images/facts/fidas-consistency-1.png",
    conclusion: "Build Customer Trust",
  },
  {
    title: "Driven by standards",
    points: ["Identify Competent Inspectors",
            "Set the goals of inspection", 
            "Finalize results of the inspection",
            "Monitor results of inspections"],
    image: "/images/facts/fidas-best-practices.gif",
    conclusion: "Boost Operational Excellence",
  },
  {
    title: "Peace of Mind",
    points: ["FIDAS: Inspection Made Effortless",
              "Automatic Reporting to Management",
              "Maximum reduction of paper work",
              "Minimizes confusion"],
    image: "/images/facts/fidas-peace-0f-mind.png",
    conclusion: "Enhance Employee Satisfaction",
  },
  {
    title: "Increase System versatility ",
    points: ["FIDAS: Flexible. Configurable. Ready.",
              "FIDAS: Flexible Across Programs",
              "Flexible for Every Application",
              "Proven Across Plants"],
    image: "/images/facts/fidas-versatility.png",
    conclusion: "Enable Business Flexibility",
  },
  {
    title: "Win more business",
    points: ["Focus on transparency and compliance",
       "Eliminate customer complaints",
        "Position yourself as Premium Supplier", 
        "Create competitive differentiation"],
    image: "/images/facts/fidas-win.png",
    conclusion: "Boost Client Acquisition",
  },
  {
    title: "We’re Experts",
    points: ["SME in Fabric Quality",
            "Profit-Driven Inspection", 
            "Maximize Profits, Minimize Waste", 
            "1.5 Million Meters Inspected Daily"],
    image: "/images/facts/fidas-software-experts.png",
    conclusion: "Provide Reliable Solutions",
  },
  {
    title: "Return On Investment",
    points: ["Optimizes Yield and Profitability",
          "Avoids Customer Returns & provides data to defend",
          "Reduces Waste in Cutting & Reduces Cost per Meter Inspected",
          "Saves Labor Cost"],
    image: "/images/facts/ROI.jpg",
    conclusion: "Maximize Business Gains",
  },
  {
    title: "Future Proof",
    points: ["Compatible with Industry 4.0",
       "Smart Labeling", 
       "Remote Support",
        "Designed for Continuous Evolution"],
    image: "/images/facts/fidas-software-future-proof.png",
    conclusion: "Secure Business Continuity",
  },
  {
    title: "ERP Integration",
    points: ["Integrate seamlessly with ERP systemsSAP, Oracle, Infor, Microsoft Dynamics",
       "Standardized Data Models", 
       "Quality Feedback to ERP",
        "Ready for Future ERP Upgrades"],
    image: "/images/facts/FIDAS-erp-plugin.png",
    conclusion: "Optimize Enterprise Workflow",
  },
  {
    title: "Best in Class Support",
    points: [
      "Always On, Always Ready",
      "Stay Ahead, Stay Smooth",
      "Tailored Just for You",
      "Rapid Response, Zero Delays",
    ],
    image: "/images/facts/fidas-support.png",
    conclusion: "Provide Trusted Support",
  },
  {
    title: "Business Alignment",
    points: ["Supports your Digital Transformation Plan ",
              "Aligns with Continuous Improvement Goals",
              "Operational Transparency",
             "Enables Strategic Decision-Making"],
    image: "/images/facts/Business Alignment.png",
    conclusion: "Drive Strategic Growth",
  },
  {
    title: "Our Credibility",
    points: ["Proven Track Record", 
              "Expertise You Can Rely On",
              "Consistent Results",
              "Global Recognition"],
    image: "/images/facts/Our credibility.png",
    conclusion: "Demonstrate Trusted Expertise",
  },
  {
    title: "Implementation track Record",
    points: ["Successfully Implemented more than 135 projects",
              "100% Implementation Success Guarenteed",
              "Best post implementation support", 
              "20 years of dedication to fabric inspection solutions"],
    image: "/images/facts/track-record.png",
    conclusion: "Prove Delivery Excellence",
  },
  {
    title: "Inspect. Optimize. Profit.",
    points: ["Automate Inspection",
       "Achieve Optimized results",
        "Minimize wastages",
         "Profit isn’t luck — it’s engineering"],
    image: "/images/facts/fidas-automate.png",
    conclusion: "Boost Profitability Consistently",
  },
];

const cardColors = [
  "bg-gradient-to-br from-teal-100 to-blue-100",
  "bg-gradient-to-br from-teal-200 to-blue-200",
  "bg-gradient-to-br from-teal-100 to-blue-200",
];

// ${cardColors[i % cardColors.length]}

const cardBorders_1= [
  "from-teal-100 to-blue-300",     // balanced teal-blue
  "from-teal-200 to-blue-200",     // deeper tone
  "from-teal-500 to-blue-700",     // darker blue end
  "from-teal-300 to-blue-500",     // darker teal start
];

const cardBorders = [
  "bg-[rgba(161, 167, 185, 1)]",
  "bg-[rgb(180,204,222)]",
  "border-2 border-[rgb(206,217,185)]",
  "border-2 border-[rgb(202,178,224)]",
  "border-2 border-[rgb(175,227,191)]"
];


type Fact = {
  title: string;
  points: string[];
  image: string;
  conclusion: string;
};


interface FactsSlideCarouselProps {
  facts: Fact[];
}





export default function FactsSlideCarousel({ facts }: FactsSlideCarouselProps) {
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [pages, setPages] = useState<Fact[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  const colors = [
    { bg: "rgb(188,194,214)", border: "rgb(188,194,214)" },
    { bg: "rgb(180,204,222)", border: "rgb(180,204,222)" },
    { bg: "rgb(206,217,185)", border: "rgb(206,217,185)" },
    { bg: "rgb(202,178,224)", border: "rgb(202,178,224)" },
    { bg: "rgb(175,227,191)", border: "rgb(175,227,191)" },
  ];

  // Responsive cards per page
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(4);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Slice facts into pages
  useEffect(() => {
    const newPages: Fact[][] = [];
    for (let i = 0; i < facts.length; i += cardsPerPage) {
      newPages.push(facts.slice(i, i + cardsPerPage));
    }
    setPages(newPages);
    setCurrentPage(0);
  }, [facts, cardsPerPage]);

  // Slide navigation
  const goToPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pages.length - 1));
    resetInterval();
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : 0));
    resetInterval();
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
    resetInterval();
  };

  // Auto-slide and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    intervalRef.current = setInterval(goToNext, 15000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pages]);


  const handleCardClick = () => {
  resetInterval(90000); // reset the interval
};

  const resetInterval = (time: number = 15000) => {
  if (intervalRef.current) clearInterval(intervalRef.current);
  intervalRef.current = setInterval(goToNext, time);
};


  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext(); // swipe left
      else goToPrev(); // swipe right
    }

    touchStartX.current = null;
  };

  if (!pages.length) return null;

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 relative mb-10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Container */}
      <div className="overflow-hidden pt-4">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => {
            const color = colors[pageIndex % colors.length];
            return (
              <div
                key={pageIndex}
                className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {page.map((fact, i) => {
                  const prevCount = pages
                    .slice(0, pageIndex)
                    .reduce((sum, p) => sum + p.length, 0);
                  const globalIndex = prevCount + i + 1;

                  return (
                    <div
                      key={i}
                      className="relative p-[15px] rounded-xl transition-all duration-700 hover:-translate-y-1 hover:shadow-xl"
                      style={{
                        backgroundColor: color.bg,
                        borderColor: color.border,
                        transitionDelay: `${i * 150}ms`,
                      }}
                        onClick={handleCardClick}
                    >
                      <div className="bg-white rounded-xl shadow flex flex-col h-[60vh]">
                        
                          {/* Index badge */}
                          <div className="absolute -top-3 z-50 left-[45%] w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                            {globalIndex}
                          </div>
                          <div className="py-2 mt-2 w-full">
                          <h3 className="text-lg  mb-1 text-blue-700 text-center font-semibold">
                            {fact.title}
                          </h3>
                          </div>

                        {/* Image */}
                        <div className="flex justify-center items-center">
                            <img
                              src={fact.image}
                              alt={fact.title}
                              className="w-[200px] h-[140px] sm:w-[240px] sm:h-[170px] md:w-[280px] md:h-[170px]  object-cover rounded-md"
                            />
                        </div>
                      

                        {/* Content */}
                        <div className="py-4 px-1 flex flex-col flex-1">
                          <ul className="list-disc list-inside text-sm mb-1 overflow-y-auto flex-1">
                            {fact.points.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                          <p className="text-teal-700 font-bold text-center mt-auto">
                            {fact.conclusion}
                          </p>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow z-10"
        aria-label="Previous"
      >
        <FaArrowLeft className="text-gray-700 text-lg" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow z-10"
        aria-label="Next"
      >
        <FaArrowRight className="text-white text-lg" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {pages.map((_, i) => (
          <span
            key={i}
            onClick={() => goToPage(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
              i === currentPage ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
    
  );
}




