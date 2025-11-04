'use client';

import { usePathname } from 'next/navigation';

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <main className={`flex-grow ${pathname === '/' ? '' : 'pt-24'}`}>
      {children}
    </main>
  );
}