import Image from 'next/image';
import './Preloader.css';
import discLogo from '../../../public/assets/ico/disc-logo.png';

const Preloader = () => {
    return (
        <div className='preloader'>
            <Image src={discLogo} width={180} height={180} title='logo' alt='logo' placeholder={'empty'} />
        </div>
    );
};

export default Preloader;