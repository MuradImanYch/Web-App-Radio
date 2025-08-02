'use client'

import Link from 'next/link';
import './Footer.css';
import { usePathname } from 'next/navigation';
import langJSON from '../../../public/assets/docs/languages.json';

const Footer = () => {
    const date = new Date();
    const pathname = usePathname();

    const lang = langJSON.available.includes(pathname.split('/')[1])
    ? pathname.split('/')[1]
    : 'en';

    return (
        <footer>
            <p>{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en'].pTextFooter}</p>
            <div className="footer">
                <div className="author">by Imanych</div>
                <div>© {date.getFullYear()} Legendary Radio</div>
                <Link className="api-provider" href="https://www.radio-browser.info/" target={'_blank'} rel="noopener noreferrer">Radio Browser</Link>
            </div>
        </footer>
    );
};

export default Footer;