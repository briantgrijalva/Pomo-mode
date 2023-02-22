import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimerCircle from '../components/TimerCircle';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { TimerContext } from '../context/timerContext/TimerContext';
import { useTimer } from '../hooks/useTimer';

export const PomodoroScreen: React.FC = () => {
    const { time, setInitialTime } = useContext(TimerContext);

    const { theme } = useContext(ThemeContext);



    const { seconds, running, pause, start, changeTime, stop } = useTimer();
    const [progress, setProgress] = useState<number>(seconds);

    useEffect(() => {
        setInitialTime(Number(time.workTime));
        // console.log({initial: time.initialTime});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setNewTime(Number(time.workTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time.workTime]);


    useEffect(() => {
        // console.log(seconds);
        if (seconds <= 0) {
            stop();
            setNewTime(Number(time.initialTime));
            setProgress((seconds / (Number(time.workTime) * 60)) * 100);
        } else {
            setProgress((seconds / (Number(time.workTime) * 60)) * 100);
        }
        // setProgress((seconds / (pomodoroTime * 60)) * 100);
        // setProgress((seconds / 60) * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds, time.workTime]);

    const formatTime = (timeSeconds: number) => {
        let minutes: number | string = Math.floor(timeSeconds / 60);
        let formatedSeconds: number | string = timeSeconds % 60;

        // console.log(formatedSeconds);

        if (formatedSeconds < 10) {
            formatedSeconds = `0${formatedSeconds}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (timeSeconds < 0) {
            return '00:00';
        }

        return `${minutes}:${formatedSeconds}`;
    };

    const setNewTime = (minutes: number) => {
        // setPomodoroTime(minutes);
        changeTime(minutes * 60);
        // setProgress((seconds / (Number(time.workTime) * 60)) * 100);
        setProgress((seconds / (minutes * 60)) * 100);
    };

  return (
    <View style={stylesPomodoroScreen.container} onTouchEnd={running ? pause : start}>
        {/* <Text style={stylesPomodoroScreen.heading}>Pomodoro Timer</Text> */}
        <TimerCircle radius={150} stroke={10} progress={progress} />
        <Text style={{...stylesPomodoroScreen.numbers, color: theme.colors.primary}}>{formatTime(seconds)}</Text>
    </View>
  );
};

const stylesPomodoroScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  numbers: {
    fontSize: 52,
    position: 'absolute',
    top: 200,
  },
  buttonPlay: {
        position: 'absolute',
        top: 480,
    },
});

