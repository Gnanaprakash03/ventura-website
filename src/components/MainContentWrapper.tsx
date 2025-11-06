'use client';

import { usePathname } from 'next/navigation';

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/"; // ✅ check if current route is home

  return (
    <main className={`flex-grow ${isHome ? "" : "mt-16"}`}>
      {children}
    </main>
  );
}
