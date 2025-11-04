import { motion, useAnimation, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

interface StickyHeaderProps {
  triggerSectionId: string;
  title: string;
}
const ScrollAnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

export default function StickyHeader({ triggerSectionId, title }: StickyHeaderProps) {
  const [visible, setVisible] = useState(false); // pop-in
  const [scale, setScale] = useState(1);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setVisible(true); // pop-in on load
  }, []);

  useEffect(() => {
    sectionRef.current = document.getElementById(triggerSectionId);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScale(1 - Math.min(scrollY / 1000, 0.1));

      const sectionEl = sectionRef.current;
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setVisible(false); // next section visible → hide header
        } else {
          setVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerSectionId]);

  return (
    <div
  className={`w-full z-10 sticky top-[4.2rem] bg-white rounded-2xl transition-all duration-300 ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
  }`}
  style={{ transform: `scale(${scale})` }}
>
  <div className="w-full flex justify-center px-2 sm:px-4 lg:px-8">
    <div className="bg-white py-4  lg:py-6 px-4 sm:px-6 lg:px-12">
      <ScrollAnimationWrapper>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center pb-2 sm:pb-3 md:pb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 transition-all duration-300"
        >
          {title}
        </h2>
      </ScrollAnimationWrapper>
    </div>
  </div>
</div>

  );
}