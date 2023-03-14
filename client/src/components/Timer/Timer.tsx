import React, {FC} from 'react';
import './Timer.scss';

interface TimerProps {
    duration: number;
    isGoing: boolean;
    onStop: () => void;
}

const Timer: FC<TimerProps> = ({duration, isGoing, onStop}) => {
    const [time, setTime] = React.useState<number>(duration);

    React.useEffect(() => {
        if (time === 0) onStop();

        if (isGoing) {
            setTimeout(() => {
                setTime(time - 1000);
            }, 1000);
        } else if (!isGoing && time !== duration) {
            setTime(duration);
        }

    }, [time, isGoing]);

    const getFormattedTime = (milliseconds: number) => {
        let total_seconds = parseInt(String(Math.floor(milliseconds / 1000)));
        let total_minutes = parseInt(String(Math.floor(total_seconds / 60)));

        let seconds = parseInt(String(total_seconds % 60));
        let minutes = parseInt(String(total_minutes % 60));

        return `${minutes}:${seconds}`;
    }

    return (
        <span className={`Timer ${isGoing && "active"}`}>{getFormattedTime(time)}</span>
    )
};

export default Timer;
