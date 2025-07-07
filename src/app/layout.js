import Link from "next/link";
import "./globals.css";
import ClientLayout from '@/components/ClientLayout';

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="logoWrap"><Link href={'/'} className="logo">LOGO Web RADIO</Link></div>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
