"use client";

import React, { useState, useEffect, useRef } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import SmallLoader from "./SmallLoader";

interface MenuLink {
  href: string;
  text: string;
}

interface MenuColumn {
  title: string;
  href: string;
  doubleColumn?: boolean;
  items?: MenuLink[];
  image?: { src: string; alt: string };
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10">
            <Image
              src="/images/Ventura.png"
              alt="Ventura Logo"
              width={160}
              height={60}
              className="h-auto w-auto max-h-9 sm:max-h-11"
              priority
            />
          </Link>

          {/* Desktop Nav — hidden on mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav
              className={cn(
                "rounded-full px-4 xl:px-6 py-2 transition-all duration-300 border-2 border-blue-600/20",
                pathname === "/"
                  ? isScrolled
                    ? "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg"
                    : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg"
              )}
            >
              <NavbarContent
                pathname={pathname}
                isScrolled={isScrolled}
              />
            </nav>
          </div>

          {/* Right side: Book Demo + Hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-4 sm:px-6 py-2 overflow-hidden font-medium text-white transition-all duration-300 ease-out bg-blue-600 rounded-full group text-sm sm:text-base"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0 ease">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                Book Demo
              </span>
              <span className="relative invisible">Book Demo</span>
            </Link>

            {/* Hamburger — shown below lg */}
            <button
              className="lg:hidden rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg p-2"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mt-2 mx-3 sm:mx-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Scrollable area so tall menus don't get clipped */}
            <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
              <NavbarContent
                isMobile
                pathname={pathname}
                isScrolled={isScrolled}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── NavbarContent ─────────────────────────────────────────────────────────────

function NavbarContent({
  isMobile = false,
  pathname,
  isScrolled,
  setIsMenuOpen,
}: {
  isMobile?: boolean;
  pathname: string;
  isScrolled: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [hoverLock, setHoverLock] = useState(false);
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    setHoverLock(true);
    setActive(null);
    setLoading(href);
    router.push(href);
    setTimeout(() => {
      setLoading(null);
      setHoverLock(false);
      if (isMobile && setIsMenuOpen) setIsMenuOpen(false);
    }, 400);
  };

  const toggleMenu = (menuItem: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuItem]: !prev[menuItem] }));
  };

  const textColorClass =
    pathname === "/" ? "text-gray-800" : "text-gray-800 dark:text-white";

  const menuItems: MenuItem[] = [
    {
      item: "Solutions",
      href: "/solutions",
      columns: [
        {
          title: "Spinning Mills",
          href: "/solutions/yarn-packing-software",
          image: { src: "/images/products/spinning-mills.png", alt: "Spinning Mills" },
          items: [
            { href: "/solutions/yarn-inventory-management-software", text: "Yarn Inventory Management System" },
          ],
        },
        {
          title: "Loom Shed",
          href: "/solutions/loom-planning-software",
          image: { src: "/images/products/fidas-grey-inspection-software.png", alt: "Loom Shed" },
          items: [
            { href: "/solutions/loom-planning-software", text: "Loom planning software" },
            { href: "/solutions/loom-roll-doffing-software", text: "Android base roll doffing" },
          ],
        },
        {
          title: "Process Houses",
          href: "/solutions/realtime-width-measurement-solution",
          image: { src: "/images/products/fidas-process-woven-inspection-software.jpg", alt: "Process Houses" },
          items: [
            { href: "/solutions/realtime-width-measurement-solution", text: "Realtime Width Measurement Solutions" },
          ],
        },
        {
          title: "Fabric Roll Sorting",
          href: "/solutions/fabric-roll-sorting-software",
          image: { src: "/images/products/Fabric-roll-sorting.png", alt: "Fabric Roll Sorting" },
          items: [
            { href: "/solutions/fabric-roll-sorting-software", text: "Fabric roll sorting & palletizing" },
          ],
        },
        {
          title: "Automotive Fabric",
          href: "/solutions/automotive-panel-traceability-packaging-system",
          image: { src: "/images/products/fidas-process-asrs-software.jpg", alt: "Automotive Fabric" },
          items: [
            { href: "/solutions/measurement-alerting-system", text: "Length, width, thickness realtime measurement" },
            { href: "/solutions/automotive-panel-traceability-packaging-system", text: "Automotive Panel Traceability & Packaging" },
          ],
        },
        {
          title: "ASRS",
          href: "/solutions/automated-storage-retrieval-system",
          image: { src: "/images/products/FIDAS-ASRS.png", alt: "ASRS" },
          items: [
            { href: "/solutions/automated-storage-retrieval-system", text: "Automated Storage and Retrieval System" },
            { href: "/solutions/yarn-inventory-management-software", text: "Yarn Inventory Management System" },
          ],
        },
      ],
    },
    {
      item: "Products",
      href: "/products",
      columns: [
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
          ],
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
          ],
        },
      ],
    },
    {
      item: "Resources",
      href: "/resources",
      links: [
        { href: "/resources/blogs", text: "Blogs" },
        { href: "/resources/faq", text: "FAQ / Q & A" },
        { href: "/resources/downloads", text: "Downloads" },
        { href: "/customers/list", text: "Customer List" },
        { href: "/customers/success", text: "Success Stories" },
      ],
    },
    {
      item: "About",
      href: "/about",
      links: [
        { href: "/about/company", text: "About Us" },
        { href: "/about/info", text: "Company Information" },
      ],
    },
    { item: "Contact", href: "/contact" },
  ];

  // ── Mobile ─────────────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <div className={cn("space-y-1", textColorClass)}>
        {menuItems.map((menuItem, index) => {
          const isContact = menuItem.item === "Contact";
          const hasChildren = !isContact && (menuItem.links || menuItem.columns);

          return (
            <div key={index}>
              <button
                onClick={() =>
                  isContact ? handleLinkClick(menuItem.href) : toggleMenu(menuItem.item)
                }
                className="w-full text-left text-base font-medium py-2.5 px-2 flex items-center justify-between rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
              >
                {menuItem.item}
                {hasChildren && (
                  <motion.div
                    animate={{ rotate: openMenus[menuItem.item] ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 flex-shrink-0 ml-2"
                  >
                    <ChevronDown size={17} strokeWidth={2} />
                  </motion.div>
                )}
              </button>

              <AnimatePresence>
                {openMenus[menuItem.item] && hasChildren && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-3 pb-2 pt-1 space-y-1">

                      {/* Solutions — image grid */}
                      {menuItem.item === "Solutions" && menuItem.columns && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
                          {menuItem.columns.map((col) => (
                            <button
                              key={col.href}
                              onClick={() => handleLinkClick(col.href)}
                              className="flex flex-col items-center text-center rounded-xl p-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                            >
                              {col.image && (
                                <div className="relative w-20 h-16 overflow-hidden rounded-lg mb-1.5">
                                  <Image
                                    src={col.image.src}
                                    alt={col.image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="120px"
                                  />
                                </div>
                              )}
                              <span className="text-blue-700 dark:text-blue-400 text-xs font-semibold leading-tight">
                                {col.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Products or other columns */}
                      {menuItem.item !== "Solutions" && menuItem.columns?.map((col) => (
                        <div key={col.href} className="pt-1">
                          <button
                            onClick={() => handleLinkClick(col.href)}
                            className="font-semibold text-sm text-blue-600 dark:text-blue-400 py-1 w-full text-left"
                          >
                            {col.title}
                          </button>
                          <div className="pl-3 space-y-0.5">
                            {col.items?.map((link) => (
                              <button
                                key={link.href}
                                onClick={() => handleLinkClick(link.href)}
                                className="block w-full text-left py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
                              >
                                {link.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Simple links */}
                      {menuItem.links?.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => handleLinkClick(link.href)}
                          className="block w-full text-left py-1.5 px-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 transition rounded"
                        >
                          {link.text}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  // ── Desktop ─────────────────────────────────────────────────────────────────

  return (
    <div className={cn("flex flex-row items-center space-x-1 xl:space-x-3", textColorClass)}>
      <Menu setActive={setActive}>
        <>
          {menuItems.map((menuItem) => {
            const isContact = menuItem.item === "Contact";

            return (
              <React.Fragment key={menuItem.item}>
                {isContact ? (
                  <div className="py-2 px-1">
                    <a
                      href={menuItem.href}
                      onClick={() => {
                        handleLinkClick(menuItem.href);
                        setActive(null);
                      }}
                      className="text-sm xl:text-base hover:text-blue-600 transition-colors"
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
                    onItemClick={() => handleLinkClick(menuItem.href)}
                    isMobile={isMobile}
                    hoverLock={hoverLock}
                  >
                    {/* Solutions dropdown */}
                    {menuItem.item === "Solutions" && menuItem.columns && (
                      <div className="w-screen max-w-[min(1100px,90vw)]">
                        <h2 className="text-base font-bold text-blue-600 px-4 pt-3 pb-2">
                          Our Solutions
                        </h2>
                        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 p-4">
                          {menuItem.columns.map((column) => (
                            <motion.div
                              key={column.href}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
                            >
                              <HoveredLink
                                href={column.href}
                                onClick={() => {
                                  handleLinkClick(column.href);
                                  setActive(null);
                                }}
                              >
                                {column.image && (
                                  <div className="relative w-[120px] h-24 overflow-hidden rounded-xl mb-1.5">
                                    <Image
                                      src={column.image.src}
                                      alt={column.image.alt}
                                      fill
                                      className="object-cover"
                                      sizes="160px"
                                    />
                                  </div>
                                )}
                                <h3 className="font-semibold text-sm text-slate-600 dark:text-blue-400 leading-tight">
                                  {column.title}
                                </h3>
                              </HoveredLink>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products / other columns dropdown */}
                    {menuItem.item !== "Solutions" && menuItem.columns && menuItem.columns.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 p-4 min-w-[440px] max-w-[600px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                        {menuItem.columns.map((column) => (
                          <motion.div
                            key={column.href}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2"
                          >
                            <h3 className="font-semibold text-sm text-blue-600 dark:text-blue-400 border-b border-blue-100 dark:border-blue-800 pb-1.5">
                              {column.title}
                            </h3>
                            <div className="space-y-1">
                              {column.items?.map((link) => (
                                <motion.div
                                  key={link.href}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.15 }}
                                  className="group flex items-center"
                                >
                                  <HoveredLink
                                    href={link.href}
                                    onClick={() => {
                                      setActive(null);
                                      handleLinkClick(link.href);
                                    }}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <span className="w-1 h-1 rounded-full bg-blue-200 dark:bg-blue-700 group-hover:bg-blue-500 transition-colors flex-shrink-0" />
                                      <span className="text-xs xl:text-[13px]">{link.text}</span>
                                    </div>
                                  </HoveredLink>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Simple links dropdown */}
                    {menuItem.links && menuItem.links.length > 0 && (
                      <div className="flex flex-col space-y-1 min-w-[200px] p-2">
                        {menuItem.links.map((link) => (
                          <div key={link.href} className="flex items-center justify-between">
                            <HoveredLink href={link.href} onClick={() => handleLinkClick(link.href)}>
                              {link.text}
                            </HoveredLink>
                            {loading === link.href && <SmallLoader />}
                          </div>
                        ))}
                      </div>
                    )}
                  </MenuItem>
                )}
              </React.Fragment>
            );
          })}
        </>
      </Menu>
    </div>
  );
}