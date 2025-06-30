import Link from "next/link";
import "./globals.css";
import Filter from "@/components/Filter/Filter";
import countries from '../../public/docs/mock-api/countries.json';
import languages from '../../public/docs/mock-api/languages.json';
import tags from '../../public/docs/mock-api/tags.json';

  const fetchCountries = async () => {
    try {
      // const response = await fetch('https://de1.api.radio-browser.info/json/countries');
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchLanguage = async () => {
    try {
      // const response = await fetch('https://de1.api.radio-browser.info/json/languages');
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchTags = async () => {
    try {
      // const response = await fetch('https://de1.api.radio-browser.info/json/tags');
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export default async function RootLayout({ children }) {
  // const countries = await fetchCountries();
  // const language = await fetchLanguage();
  // const tags = await fetchTags();
  
  return (
    <html lang="en">
      <body>
        <div className="logoWrap"><Link href={'/'} className="logo">LOGO Web RADIO</Link></div>
        <Filter countries={countries} languages={languages} tags={tags} />
        {children}
      </body>
    </html>
  );
}
