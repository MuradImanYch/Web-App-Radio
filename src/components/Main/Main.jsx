import './Main.css';
import StationList from '../StationList/StationList';

const Main = ({stations}) => {
    return (
        <div className="main-container">
            <h2>Popular radio stations</h2>

            <StationList page={'main'} stations={stations} />
        </div>
    );
};

export default Main;