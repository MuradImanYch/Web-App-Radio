// app/layout.js
import Link from "next/link";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import { Suspense } from 'react';
import logo from '../../public/logo.png';
import Image from "next/image";
import FavLink from "@/components/FavLink/FavLink";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="logoWrap">
          <FavLink />
          <Link href={'/'} className="logo"><Image src={logo} alt="Legendary radio" title="Legendary radio" width={130} height={75} placeholder={'empty'} /></Link>
          <div></div>
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
