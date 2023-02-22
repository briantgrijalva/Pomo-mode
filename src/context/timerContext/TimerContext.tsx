import React, { createContext, useReducer } from 'react';
// import { useColorScheme } from 'react-native';
import { timerReducer, TimerState } from './TimerReducer';

interface TimerContextProps {
    time: TimerState;
    setWorkTime: (minutes: number | number[]) => void;
    setBreakTime: (minutes: number | number[]) => void;
    setInitialTime: (minutes: number | number[]) => void;
}

export const TimerContext = createContext({} as TimerContextProps);

export const TimerProvider = ({children}: any) => {

    const [time, dispatch] = useReducer(timerReducer, {
        initialTime: 1,
        workTime: 1,
        breakTime: 5,
    } );

    const setWorkTime = (minutes: number | number[]) => {
        dispatch({type: 'set_work_time', payload: minutes});
        // console.log('set_work_time');
    };

    const setInitialTime = (minutes: number | number[]) => {
        dispatch({type: 'set_initial_time', payload: minutes});
        // console.log('set_work_time');
    };

    // dispatch({
    //     type: 'signUp',
    //     payload: {
    //         token: resp.data.token,
    //         user: resp.data.usuario,
    //     },
    // });



    const setBreakTime = (minutes: number | number[]) => {
        dispatch({type: 'set_break_time', payload: minutes});
        // console.log('set_break_time');
    };

    return (
        <TimerContext.Provider value={{
            time,
            setWorkTime,
            setBreakTime,
            setInitialTime,
        }}>
            { children }
        </TimerContext.Provider>
    );
};
