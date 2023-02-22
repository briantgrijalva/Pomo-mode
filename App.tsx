import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import { SideMenu } from './src/navigation/SideMenu';
import { TimerProvider } from './src/context/timerContext/TimerContext';

const AppState = ({children}: { children: JSX.Element | JSX.Element[]}) => {

    return (
        <ThemeProvider>
            <TimerProvider>
                { children }
            </TimerProvider>
        </ThemeProvider>
    );
};

const App = () => {
    return (
        <AppState>
            <SideMenu />
        </AppState>
    );
};

export default App;
