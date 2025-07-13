import { PlayIcon } from "./PlayIcon";
import { PauseIcon } from "./PauseIcon";

const PlayPause = ({isPlaying, size}) => {
    return (
        <div>
            {isPlaying ? <PauseIcon size={size || 50} color="#fff" /> : <PlayIcon size={size || 50} color="#fff" />}
        </div>
    );
};

export default PlayPause;