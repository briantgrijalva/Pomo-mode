import React, { createContext, useReducer } from 'react';
// import { useColorScheme } from 'react-native';
import { themeReducer, ThemeState, darkTheme } from './ThemeReducer';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {

    // const colorScheme = useColorScheme();

    // useEffect(() => {
    //   colorScheme === 'light' ? setLightTheme() : setDarkTheme();
    // }, [colorScheme]);
    // useEffect(() => {
    //     AppState.addEventListener( 'change', ( status ) => {
    //         if ( status === 'active' ) {
    //             Appearance.getColorScheme() === 'light' ? setLightTheme() : setDarkTheme();
    //             console.log(Appearance.getColorScheme());
    //         }
    //     });
    // }, []);

    // const [theme, dispatch] = useReducer(themeReducer, (Appearance.getColorScheme() === 'dark') ? darkTheme : lightTheme );
    // const [theme, dispatch] = useReducer(themeReducer, (colorScheme === 'dark') ? darkTheme : lightTheme );
    const [theme, dispatch] = useReducer(themeReducer, darkTheme );

    const setDarkTheme = () => {
        dispatch({type: 'set_dark_theme'});
        changeNavigationBarColor('translucent', false);
        console.log('setting dark theme');
    };



    const setLightTheme = () => {
        dispatch({type: 'set_light_theme'});
        changeNavigationBarColor('translucent', true);
        console.log('setting light theme');
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            setDarkTheme,
            setLightTheme,
        }}>
            { children }
        </ThemeContext.Provider>
    );
};
