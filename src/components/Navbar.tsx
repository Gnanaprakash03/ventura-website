"use client";

import React, { useState, useEffect } from "react";
import { HoveredLink, Menu , MenuItem} from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react"; // Add ChevronDown import
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';
import SmallLoader from './SmallLoader';

interface MenuLink {
  href: string;
  text: string;
}

// Update the MenuColumn interface
interface MenuColumn {
  title: string;
  href: string;
  doubleColumn?: boolean;
  items?: MenuLink[]; // Changed from MenuLink[] | [MenuLink[], MenuLink[]] to just MenuLink[]
  image?: {
    src: string;
    alt: string;
  };
  
  desc?: string;
}


interface MenuItem {
  item: string;
  href: string;
  links?: MenuLink[];
  columns?: MenuColumn[];
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative md:fixed bg-inherit top-0 left-0 right-0 z-50">
      <div className="max-w-7.5xl mx-auto px-3 mt-4">
        <div className="flex justify-between items-center gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/Ventura.png"
              alt="Ventura Logo"
              width={200}  // intrinsic size, any value
              height={80}
              className="h-auto max-h-10 w-auto sm:max-h-12 md:max-h-14 lg:max-h-16"
              priority
            />
          </Link>

          <div className="hidden md:block flex-1 max-w-3xl mx-auto mb-3px">
            <nav className={cn(
              "rounded-full px-6 py-2 transition-all duration-300 border-2 border-blue-600/20",
              pathname === '/' 
                ? isScrolled 
                  ? "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg" 
                  : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg"
            )}>
              <NavbarContent pathname={pathname} isScrolled={isScrolled} />
            </nav>
          </div>

          <Link 
            href="/contact"
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition-all duration-300 ease-out bg-blue-600 rounded-full group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Book Demo</span>
            <span className="relative invisible">Get a Quote</span>
          </Link>

          <button
            className="md:hidden rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden mt-2 mx-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden"
          >
            <motion.div className="p-6">
              <NavbarContent isMobile={true} pathname={pathname} isScrolled={isScrolled} setIsMenuOpen={setIsMenuOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavbarContent({ isMobile = false, pathname, isScrolled, setIsMenuOpen }: { isMobile?: boolean; pathname: string; isScrolled: boolean; setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});  // Add this state
  const router = useRouter();
  const [hoverLock, setHoverLock] = useState(false);

  const handleLinkClick = (href: string) => {
    setHoverLock(true);
    setActive(null);
    setLoading(href);
    router.push(href);
    // Close desktop dropdown
     // <-- this will reset hover state / active menu
    setTimeout(() => {
      setLoading(null);
      setHoverLock(false); // unlock hover after transition
      if (isMobile && setIsMenuOpen) {
        setIsMenuOpen(false);
      }
    }, 400);
  };

  const toggleMenu = (menuItem: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuItem]: !prev[menuItem]
    }));
  };

  const textColorClass = pathname === '/' 
    ? 'text-gray-800'
    : 'text-gray-800 dark:text-white';

  const menuItems: MenuItem[] = [
    {
    item: "Solutions",
    href: "/solutions",
    columns: [
    {
      title: "Spinning Mills",
      href: "/solutions/yarn-packing-software",
      image: { src: "/images/products/spinning-mills.png", alt: "Greige Fabric" },
      items: [
        // {href:"/solutions/asrs",text:'Yarn Packing and Barcoding'},
        {href:"/solutions/yarn-inventory-management-software",text:'Yarn Inventory Management System'},
      ],
      // desc: "Automate grading and mapping from the earliest stage of fabric processing."
    },
    {
      title: "Loom Shed",
      href: "/solutions/loom-planning-software",
      image: { src: "/images/products/fidas-grey-inspection-software.png", alt: "Denim Fabric" },
      // desc: "Identify weaving faults, slubs, and shade mismatches across production lines."
      items: [
        {href:"/solutions/loom-planning-software",text:'Loom planning software'},
        {href:"/solutions/loom-roll-doffing-software",text:'Android base roll doffing'},
      ],
    },
    {
      title: "Process Houses",
      href: "/solutions/realtime-width-measurement-solution",
      image: { src: "/images/products/fidas-process-woven-inspection-software.jpg", alt: "Process houses" },
       items: [
        {href:"/solutions/realtime-width-measurement-solution",text:'Realtime Width Measurement Solutions'},
      ],
    },
    {
      title: "Fabric Roll Sorting",
      href: "/solutions/fabric-roll-sorting-software",
      image: { src: "/images/products/Fabric-roll-sorting.png", alt: "Home Textile" },
      // desc: "Streamline inspection for curtains, upholstery, and furnishings."
       items: [
        {href:"/solutions/fabric-roll-sorting-software",text:'Fabric roll sorting & palletizing'},
      ],
    },
    {
      title: "Automotive Fabric",
      href: "/solutions/automotive-panel-traceability-packaging-system",
      image: { src: "/images/products/fidas-process-asrs-software.jpg", alt: "Automotive Fabric" },
      // desc: "Ensure precision quality standards for high-demand automotive requirements."
      items: [
        {href:"/solutions/measurement-alerting-system",text:'Length, width, thickness realtime measurement alerting system'},
        {href:"/solutions/automotive-panel-traceability-packaging-system",text:'Automotive Panel Traceability & Packaging System '},
      ],
    },
    {
      title: "ASRS",
      href: "/solutions/automated-storage-retrieval-system",
      image: { src: "/images/products/FIDAS-ASRS.png", alt: "ASRS Fabric" },
      items: [
        {href:"/solutions/automated-storage-retrieval-system",text:'Automated storage and Retrieval System'},
        {href:"/solutions/yarn-inventory-management-software",text:'Yarn Inventory Management System'},
      ],
    },
    
  ],},
    { item: "Products", href: "/products", columns: [
      {
        title: "Hardware Products",
        href: "/products/hardware",
        items: [
          { href: "/products/hardware/fabric-length-counter", text: "Fabric Length Measurement" },
          { href: "/products/hardware/width-measurement-system", text: "Width Measurement System" },
          { href: "/products/hardware/digital-pick-counter", text: "Digital Pick Counter" },
          { href: "/products/hardware/gsm-capturing", text: "GSM Capturing" },
          { href: "/products/hardware/barcode-scanning-printing", text: "Barcode Scanning" },
          { href: "/products/hardware/defect-stickering-system", text: "Defect Stickering" },
          { href: "/products/hardware/touchscreen-monitor", text: "Touch Screen Monitor" },
          { href: "/products/hardware/heat-fuse-labeling-machine", text: "Heat Fuse Labeling" },
        ]
      },
      {
        title: "Software Products",
        href: "/products/software",
        items: [
          { href: "/products/software?product=knitted-fabric-inspection", text: "Knitted Fabric Inspection" },
          { href: "/products/software?product=greige-fabric-inspection", text: "Greige Fabric Inspection" },
          { href: "/products/software?product=denim-fabric-inspection", text: "Denim Fabric Inspection" },
          { href: "/products/software?product=automotive-fabric-inspection", text: "Automotive Fabric Inspection" },
          { href: "/products/software?product=home-furnishing-inspection", text: "Home Furnishing Inspection" },
          { href: "/products/software?product=garment-units-inspection", text: "Garment Units Inspection" },
        ]
      }
      // ,{
      //   title: "Other Solutions",
      //   href: "/products/technologies",
      //   items: [
      //     { href: "/products/technologies", text: "Technologies" },
      //     { href: "/products/sap-integration", text: "SAP Integration" },
      //   ]
      // }
    ]},
    { item: "Resources", href: "/resources", links: [
      { href: "/resources/blogs", text: "Blogs" },
      { href: "/resources/faq", text: "FAQ / Q & A" },
      { href: "/resources/downloads", text: "Downloads" },
      { href: "/customers/list", text: "Customer List" },
      { href: "/customers/success", text: "Success Stories" }
    ]},
    { item: "About", href: "/about", links: [
      { href: "/about/company", text: "About Us" },
      { href: "/about/info", text: "Company Information" }
    ]},
    { item: "Contact",
       href: "/contact"
    //    links: [
    //   { href: "/contact/us", text: "Contact Us" },
    //   { href: "/contact/social", text: "Social Media" },
    //   { href: "/contact/enquiry", text: "Enquiry" }
    // ]
  }    
  ];

  return (
    <div className={`flex justify-center ${isMobile ? 'flex-col w-full space-y-2' : 'flex-row items-center space-x-4'} ${textColorClass}`}>
      {isMobile ? (
        <div className="space-y-2">
        {menuItems.map((menuItem, index) => {
          const isContact = menuItem.item === "Contact";
          return (
            <div key={index} className="space-y-2">
              <button
                onClick={() =>
                  menuItem.item === "Contact"
                    ? handleLinkClick(menuItem.href)
                    : toggleMenu(menuItem.item)
            }
            className="w-full text-left text-lg py-2 flex items-center justify-between hover:text-blue-600 transition-colors"
          >
            {menuItem.item}
            {menuItem.item === "Contact" ? null : (
              <motion.div
                animate={{ rotate: openMenus[menuItem.item] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <ChevronDown size={18} strokeWidth={2} />
              </motion.div>
            )}
          </button>

          <AnimatePresence>
            {openMenus[menuItem.item] && !isContact && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pl-4 space-y-3"
              >
                {/* ✅ Solutions Mobile Grid */}
                {menuItem.item === "Solutions" && menuItem.columns ? (
                  <div className="grid grid-cols-1 gap-4">
                    {menuItem.columns.map((col) => (
                      <a
                        key={col.href}
                        href={col.href}
                        onClick={() => handleLinkClick(col.href)}
                        className="flex flex-col items-center text-center rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        {col.image && (
                        <div className="relative w-[100px] h-[90px] overflow-hidden rounded-md mb-2">
                          <img
                            src={col.image.src}
                            alt={col.image.alt}
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                        <h4 className="text-blue-700 dark:text-blue-400 text-sm font-semibold">
                          {col.title}
                        </h4>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {col.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                ) : (
                  /* ✅ Regular Submenu */
                  <>
                    {menuItem.links?.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className="block py-1 text-sm hover:text-blue-600 transition"
                      >
                        {link.text}
                      </Link>
                    ))}

                    {menuItem.columns?.map((col) => (
                      <div key={col.href} className="space-y-2">
                        <Link
                          href={col.href}
                          onClick={() => handleLinkClick(col.href)}
                          className="block font-semibold py-1"
                        >
                          {col.title}
                        </Link>
                        <div className="pl-3 space-y-1">
                          {col.items?.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => handleLinkClick(link.href)}
                              className="block py-1 text-sm hover:text-blue-600"
                            >
                              {link.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>


      
      ) : (
        // For Desktop
        <Menu setActive={setActive}>
          <>
          {menuItems.map((menuItem) => {
            const isContact = menuItem.item === "Contact";

            return (
               <React.Fragment key={menuItem.item}>
              {isContact ? (
                <div className=" py-2">
                  <a
                  href={menuItem.href}
                  onClick={() =>{ handleLinkClick(menuItem.href)
                    setActive(null);
                  }
                  }
                  >
                  {menuItem.item}
                  </a>
                </div>
                
              ) : (


              <MenuItem
                key={menuItem.item}
                setActive={setActive}
                active={active}
                item={menuItem.item}
                href={menuItem.href}
                onItemClick={() =>{ handleLinkClick(menuItem.href)}}
                isMobile={isMobile}
                hoverLock={hoverLock}
              >
                {!isContact && menuItem.columns && menuItem.columns.length > 0 ? (
                      menuItem.item === "Solutions" && menuItem.columns ? (
                        <div>
                        <h2 className="text-xl font-bold text-blue-600 pl-6 pt-3">Other Solutions</h2>
                          <div className="relative left-1/2 transform -translate-x-1/2 grid grid-cols-6 gap-4 p-4 min-w-[1400px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                            
                          {menuItem.columns.map((column) => (
                            <motion.div
                              key={column.href}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              // className="space-y-3 w-full"
                              className="flex flex-col items-start text-start min-w-[300px]  hover:scale-105 transition-transform"
                            >
                                <div><HoveredLink href={column.href} onClick={() => {
                                  handleLinkClick(column.href)
                                  setActive(null);
                                }}>
                               {column.image && (
                                  <div className="relative w-[160px] h-[150px] mt-5 mb-2 overflow-hidden rounded-lg">
                                    <img
                                      src={column.image.src}
                                      alt={column.image.alt}
                                      
                                      className="h-[150px] object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                  </div>
                                )}
                              <h3 className="font-semibold text-lg text-slate-600 dark:text-blue-400  pb-2">
                                {column.title}
                              </h3>
                              </HoveredLink>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        </div> 
                      ) : (
                        // Regular Columns Menu
                        <div className="relative left-1/2 transform -translate-x-1/2 grid grid-cols-2 gap-4 p-4 min-w-[700px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                          {menuItem.columns.map((column) => (
                            <motion.div
                              key={column.href}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-3 w-full"
                            >
                              <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 border-b border-blue-100 dark:border-blue-800 pb-2">
                                {column.title}
                              </h3>
                              <div className="space-y-2">
                                {column.items?.map((link) => (
                                  <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="group relative flex items-center whitespace-nowrap pr-2"
                                  >
                                    <HoveredLink href={link.href} onClick={() =>{
                                    setActive(null);
                                    handleLinkClick(link.href)
                                    }}>
                                      <div className="flex items-center space-x-2">
                                        <span className="w-1 h-1 rounded-full bg-blue-200 dark:bg-blue-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"></span>
                                        <span className="text-[13px] pr-2">{link.text}</span>
                                      </div>
                                    </HoveredLink>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )
                    ) : (
                      // Simple Links Menu
                      menuItem.links &&
                      menuItem.links.length > 0 && (
                        <div className="flex flex-col space-y-1 min-w-[220px]">
                          {menuItem.links.map((link) => (
                            <div key={link.href} className="flex items-center justify-between">
                              <HoveredLink href={link.href} onClick={() => handleLinkClick(link.href)}>
                                {link.text}
                              </HoveredLink>
                              {loading === link.href && <SmallLoader />}
                            </div>
                          ))}
                        </div>
                      )
                    )}

              </MenuItem>

               )}
        </React.Fragment>
              
           
        //  return
          )}
          )}
          
          </>
        </Menu>
      )}
    </div>
  );
}