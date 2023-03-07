import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ThemeProvider } from './src/context/themeContext/ThemeContext';
import { SideMenu } from './src/navigation/SideMenu';
import { TimerProvider } from './src/context/timerContext/TimerContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BackgroundService from 'react-native-background-actions';

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

    useEffect(() => {

      return () => {
        BackgroundService.stop();
      };
    }, []);

    return (
        <AppState>
            <SafeAreaProvider>
                <SideMenu />
            </SafeAreaProvider>
        </AppState>
    );
};

export default App;
