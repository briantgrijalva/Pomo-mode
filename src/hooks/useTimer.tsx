import { useCallback, useState } from 'react';
import { interval } from './useInterval';

const use1Second = interval(1e3);

// const interval = (delay = 0) => {
//     callback =>
//         useEffect(() => {
//             const id = setInterval(callback, delay);
//             return () => clearInterval(id);
//         }, [callback]);
//     };


export const useTimer = ({
    seconds: initialSeconds = 60,
    running: initiallyRunning = false,
} = {}) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [running, setRunning] = useState(initiallyRunning);
    const tick = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        () => (running ? setSeconds(seconds => seconds - 1) : undefined),
        [running]
    );
    const start = () => setRunning(true);
    const pause = () => setRunning(false);
    const reset = () => setSeconds(0);
    const stop = () => {
        pause();
        reset();
    };
    const changeTime = (sec: number) => setSeconds(sec);


    use1Second(tick);

    return { pause, reset, running, seconds, start, stop, changeTime };
};
