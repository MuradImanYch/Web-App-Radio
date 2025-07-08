import Image from 'next/image';
import './LangSwitch.css';
import azFlag from '../../../public/assets/ico/az.png';
import ruFlag from '../../../public/assets/ico/ru.png';
import enFlag from '../../../public/assets/ico/en.png';
import Link from 'next/link';

const LangSwitch = () => {
    return (
        <div className="langSwitch">
            <Link href={'#'}><Image src={azFlag} placeholder={'empty'} alt="Azerbaijan flag" title="Switch to azerbaijani" width={27} height={20} quality={100} /></Link>
            <Link href={'#'}><Image src={ruFlag} placeholder={'empty'} alt="Russian flag" title="Switch to russian" width={27} height={20} quality={100} /></Link>
            <Link href={'#'}><Image src={enFlag} placeholder={'empty'} alt="English flag" title="Switch to english" width={27} height={20} quality={100} /></Link>
        </div>
    );
};

export default LangSwitch;