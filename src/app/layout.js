import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import { Suspense } from 'react';
import FavLink from "@/components/FavLink/FavLink";
import LangSwitch from "@/components/LangSwitch/LangSwitch";
import HeaderLogo from "@/components/HeaderLogo/HeaderLogo";
import Preloader from "@/components/Preloader/Preloader";
import Link from "next/link";

export default async function RootLayout({ children }) {
  const date = new Date();

  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Preloader />}>
          <header className="logoWrap">
            <nav>
              <LangSwitch />
              <HeaderLogo />
              <FavLink />
            </nav>
          </header>
          <ClientLayout>
            {children}
          </ClientLayout>
          <footer>
            <div className="author">by Imanych</div>
            <div>© {date.getFullYear()} Legendary Radio</div>
            <Link className="api-provider" href="https://www.radio-browser.info/" target={'__blank'}>Radio Browser</Link>
          </footer>
        </Suspense>
      </body>
    </html>
  );
}
