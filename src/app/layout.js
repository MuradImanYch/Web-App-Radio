import "./globals.css";
import ClientLayout from '@/components/ClientLayout';
import { Suspense } from 'react';
import FavLink from "@/components/FavLink/FavLink";
import LangSwitch from "@/components/LangSwitch/LangSwitch";
import HeaderLogo from "@/components/HeaderLogo/HeaderLogo";
import Preloader from "@/components/Preloader/Preloader";
import Link from "next/link";
import Script from "next/script";

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

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S19VKESS5X"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S19VKESS5X');
            `,
          }}
        />

        <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],
              k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=103496772', 'ym');

          ym(103496772, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
          });
        `
        }}
      />
      </body>
    </html>
  );
}
