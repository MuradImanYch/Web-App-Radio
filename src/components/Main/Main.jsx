import './Main.css';
import StationList from '../StationList/StationList';
import langJSON from '../../../public/assets/docs/languages.json';

const Main = ({stations, lang}) => {
    return (
        <div className="main-container">
            <h2>{langJSON.translations[langJSON.available.includes(lang) ? lang : 'en']?.popularRadiosSTH2}</h2>

            <StationList page={'main'} stations={stations} lang={lang} />
        </div>
    );
};

export default Main;