import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import { Suspense } from 'react';
import FavLink from "@/components/FavLink/FavLink";
import LangSwitch from "@/components/LangSwitch/LangSwitch";
import HeaderLogo from "@/components/HeaderLogo/HeaderLogo";
import Preloader from "@/components/Preloader/Preloader";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="logoWrap">
          <nav>
            <LangSwitch />
            <HeaderLogo />
            <FavLink />
          </nav>
        </header>

        <Suspense fallback={<Preloader />}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
