import './Main.css';
import StationList from '../StationList/StationList';

const Main = ({stations}) => {
    return (
        <div className="main-container">
            <h2>Popular radio stations</h2>

            <StationList stations={stations} />
        </div>
    );
};

export default Main;