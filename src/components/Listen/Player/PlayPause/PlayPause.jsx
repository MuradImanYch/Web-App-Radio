import { PlayIcon } from "./PlayIcon";
import { PauseIcon } from "./PauseIcon";

const PlayPause = ({isPlaying}) => {
    return (
        <div>
            {isPlaying ? <PauseIcon size={50} color="#fff" /> : <PlayIcon size={50} color="#fff" />}
        </div>
    );
};

export default PlayPause;