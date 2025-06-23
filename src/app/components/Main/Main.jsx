import Link from 'next/link';
import './Main.css';

const Main = ({topRadio}) => {
    return (
        <div className="main-container">
            <h2>Popular Radio Stations</h2>

            <ul className="station-list">
                {topRadio.map((station) => (
                <li className="station-item" key={station.stationuuid}>
                    <h3 className="station-name">{station.name}</h3>
                    <p className="station-meta">
                    <span>{station.country}</span> — <span>{station.tags}</span>
                    <span>{station.language}</span>
                    </p>
                    <audio controls>
                    <source src={station.url_resolved} type="audio/mpeg" />
                    Your browser does not support audio.
                    </audio>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Main;