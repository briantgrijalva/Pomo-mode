import React, { createContext, useReducer } from 'react';
// import { useColorScheme } from 'react-native';
import { timerReducer, TimerState } from './TimerReducer';

interface TimerContextProps {
    time: TimerState;
    setWorkTime: (minutes: number | number[]) => void;
    setBreakTime: (minutes: number | number[]) => void;
    setInitialWorkTime: (minutes: number | number[]) => void;
    setInitialBreakTime: (minutes: number | number[]) => void;
    addWorkSession: (minutes: number) => void;
}

export const TimerContext = createContext({} as TimerContextProps);

export const TimerProvider = ({children}: any) => {

    const [time, dispatch] = useReducer(timerReducer, {
        initialWorkTime: 1,
        initialBreakTime: 2,
        workTime: 1,
        breakTime: 2,
        workSessions: 0,
    } );

    const setWorkTime = (minutes: number | number[]) => {
        dispatch({type: 'set_work_time', payload: minutes});
    };

    const setInitialWorkTime = (minutes: number | number[]) => {
        dispatch({type: 'set_initial_work_time', payload: minutes});
    };

    const setInitialBreakTime = (minutes: number | number[]) => {
        dispatch({type: 'set_initial_break_time', payload: minutes});
    };

    const setBreakTime = (minutes: number | number[]) => {
        dispatch({type: 'set_break_time', payload: minutes});
    };

    const addWorkSession = (minutes: number) => {
        dispatch({type: 'add_work_session', payload: minutes});
    };

    return (
        <TimerContext.Provider value={{
            time,
            setWorkTime,
            setBreakTime,
            setInitialWorkTime,
            setInitialBreakTime,
            addWorkSession,
        }}>
            { children }
        </TimerContext.Provider>
    );
};
