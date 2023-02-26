import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import TimerCircle from '../components/TimerCircle';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { TimerContext } from '../context/timerContext/TimerContext';
import { useTimer } from '../hooks/useTimer';
import { useAnimation } from '../hooks/useAnimation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import SplashScreen from 'react-native-splash-screen';

export const PomodoroScreen: React.FC = () => {
    const { time, setInitialWorkTime, setInitialBreakTime, addWorkSession } = useContext(TimerContext);

    const { theme } = useContext(ThemeContext);

    const { opacity, fadeIn, fadeOut, opValue } = useAnimation();

    const { seconds, running, pause, start, changeTime, stop } = useTimer();
    const [progress, setProgress] = useState<number>(seconds);
    const [isWorkingTime, setIsWorkingTime] = useState<boolean>(true);
    const [paused, setPaused] = useState(true);

    const { bottom, left } = useSafeAreaInsets();

    // useEffect(() => {
    //     SplashScreen.hide();
    // }, []);

    useEffect(() => {
        setInitialWorkTime(Number(time.workTime));
        setInitialBreakTime(Number(time.breakTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (paused) {
            if (opValue === 1) {
                fadeOut(1000);
            } else if (opValue === 0) {
                fadeIn(1000);
            }
        } else {
            fadeIn();
        }
    }, [paused, opacity, opValue, fadeOut, fadeIn]);


    useEffect(() => {
        if (isWorkingTime) {
            setNewTime(Number(time.workTime));
        } else {
            setNewTime(Number(time.breakTime));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time.workTime, time.breakTime, isWorkingTime]);


    useEffect(() => {
        if (isWorkingTime) {
            if (seconds <= 0) {
                addWorkSession(time.workSessions + 1);
                stop();
                setNewTime(Number(time.initialWorkTime));
                setProgress((seconds / (Number(time.workTime) * 60)) * 100);
                setIsWorkingTime(false);
            } else {
                setProgress((seconds / (Number(time.workTime) * 60)) * 100);
            }
        } else {
            if (seconds <= 0) {
                stop();
                setNewTime(Number(time.initialBreakTime));
                setProgress((seconds / (Number(time.breakTime) * 60)) * 100);
                setIsWorkingTime(true);
            } else {
                setProgress((seconds / (Number(time.breakTime) * 60)) * 100);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds, time.workTime, isWorkingTime]);

    const formatTime = (timeSeconds: number) => {
        let minutes: number | string = Math.floor(timeSeconds / 60);
        let formatedSeconds: number | string = timeSeconds % 60;

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
        changeTime(minutes * 60);
        setProgress((seconds / (minutes * 60)) * 100);
    };

  return (
    <View
        style={stylesPomodoroScreen.container}
        onTouchEnd={() => {
                if (running) {
                    pause();
                    setPaused(true);
                } else {
                    start();
                    setPaused(false);
                }
            }
        }
    >
        <TimerCircle radius={150} stroke={10} progress={progress} />
        <Animated.Text
            style={{
                ...stylesPomodoroScreen.numbers,
                color: theme.colors.primary,
                opacity,
            }}
        >
            {formatTime(seconds)}
        </Animated.Text>
        <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                position: 'absolute',
                bottom: bottom + 20,
                left: left + 20,
                backgroundColor: theme.colors.notification,
                borderRadius: 60,
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    color: theme.colors.primary,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    fontWeight: 'bold',
                }}
            >
                {time.workSessions}
            </Text>
        </View>
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

