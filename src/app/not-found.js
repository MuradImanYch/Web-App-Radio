import Image from 'next/image';
import ico from '../../public/assets/ico/not-found-disc.png';
import Link from 'next/link';

const notFound = () => {
    return (
        <div className='not-found'>
            <h1>Page not found | 404</h1>
            <Image src={ico} width={180} height={180} alt='Not found' title='Not found' placeholder={'empty'} quality={100} />
            <Link href={'/'}>Back to main page</Link>
        </div>
    );
};

export default notFound;