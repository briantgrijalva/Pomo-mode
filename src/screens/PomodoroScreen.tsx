import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import TimerCircle from '../components/TimerCircle';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { TimerContext } from '../context/timerContext/TimerContext';
import { useTimer } from '../hooks/useTimer';
import { useAnimation } from '../hooks/useAnimation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import KeepAwake from 'react-native-keep-awake';
import BackgroundService from 'react-native-background-actions';

export const PomodoroScreen: React.FC = () => {
    const { time, setInitialWorkTime, setInitialBreakTime, addWorkSession } = useContext(TimerContext);

    const { theme } = useContext(ThemeContext);

    const { opacity, fadeIn, fadeOut, opValue } = useAnimation();

    const { seconds, running, pause, start, changeTime, stop } = useTimer();
    const [progress, setProgress] = useState<number>(seconds);
    const [isWorkingTime, setIsWorkingTime] = useState<boolean>(true);
    const [paused, setPaused] = useState(true);

    const { bottom, left } = useSafeAreaInsets();


    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        if (paused) {
            KeepAwake.deactivate();
        } else {
            KeepAwake.activate();
        }
    }, [paused]);

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
            updateBgSTitle('Work Session');
            if (seconds <= 0) {
                addWorkSession(time.workSessions + 1);
                stop();
                setNewTime(Number(time.initialWorkTime));
                setProgress((seconds / (Number(time.workTime) * 60)) * 100);
                setIsWorkingTime(false);
                stopBgS();
            } else {
                setProgress((seconds / (Number(time.workTime) * 60)) * 100);
                let secsText = formatTime(seconds);
                updateBgS(secsText);
            }
        } else {
            updateBgSTitle('Break Session');
            if (seconds <= 0) {
                stop();
                setNewTime(Number(time.initialBreakTime));
                setProgress((seconds / (Number(time.breakTime) * 60)) * 100);
                setIsWorkingTime(true);
                stopBgS();
            } else {
                setProgress((seconds / (Number(time.breakTime) * 60)) * 100);
                let secsText = formatTime(seconds);
                updateBgS(secsText);
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

    const sleep = (timeUse: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), timeUse));

    // You can do anything in your task such as network requests, timers and so on,
    // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
    // React Native will go into "paused" mode (unless there are other tasks running,
    // or there is a foreground app).
    const veryIntensiveTask = async (taskDataArguments: any) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise( async (_resolve) => {
            // await BackgroundService.updateNotification({taskDesc: 'descTask'});
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                await sleep(delay);
            }
        });
    };

    const options = {
        taskName: 'PomoMode',
        taskTitle: 'Work Session',
        taskDesc: time.initialWorkTime.toString(),
        taskIcon: {
            name: 'ic_launcher_monochrome',
            type: 'mipmap',
            package: 'com.briantgrijalva.PomoMode',
        },
        // color: '#ffCA52',
        linkingURI: 'PomoMode://PomodoroScreen/',
        parameters: {
            delay: 1000,
        },
    };

    const stopBgS = async () => {
        await BackgroundService.stop();
    };

    const updateBgS = async (descTask: string) => {
        try {
            if (paused) {
                await BackgroundService.stop();
                return;
            } else {
                await BackgroundService.updateNotification({taskDesc: descTask});
                console.log(BackgroundService.isRunning());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateBgSTitle = async (titleTask: string) => {
        try {
            await BackgroundService.updateNotification({taskTitle: titleTask});
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <View
        style={stylesPomodoroScreen.container}
        onTouchEnd={async() => {
                if (running) {
                    pause();
                    setPaused(true);
                    await stopBgS();
                } else {
                    start();
                    setPaused(false);
                    await BackgroundService.start(veryIntensiveTask, options);
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
                left: left + 30,
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
