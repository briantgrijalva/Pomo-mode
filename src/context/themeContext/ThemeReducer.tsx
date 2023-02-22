import { Theme } from '@react-navigation/native';

type ThemeActions = { type: 'set_light_theme' } | { type: 'set_dark_theme' }

export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark';
    dividerColor: string;
}

// const lightColor = '#C4D3E3';
// const darkColor = '#090B11';
// const lightGrayColor = '#95A1AE';
// const darkGrayColor = '#50575F';
// const GrayColor = '#757F8A';

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: '#95A1AE',
    colors: {
        primary: '#090B11',
        background: '#C4D3E3',
        card: '#C4D3E3',
        text: '#50575F',
        border: '#50575F',
        notification: '#757F8A',
    },
};

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    dividerColor: '#757F8A',
    colors: {
        primary: '#C4D3E3',
        background: '#090B11',
        card: '#090B11',
        text: '#95A1AE',
        border: '#95A1AE',
        notification: '#50575F',
    },
};

export const themeReducer = (state: ThemeState, action: ThemeActions): ThemeState => {

    switch (action.type) {
        case 'set_light_theme':
            return {
                currentTheme: 'light',
                dark: false,
                dividerColor: '#95A1AE',
                colors: {
                    primary: '#090B11',
                    background: '#C4D3E3',
                    card: '#C4D3E3',
                    text: '#50575F',
                    border: '#50575F',
                    notification: '#757F8A',
                },
            };
        case 'set_dark_theme':
            return {
                currentTheme: 'dark',
                dark: true,
                dividerColor: '#757F8A',
                colors: {
                    primary: '#C4D3E3',
                    background: '#090B11',
                    card: '#090B11',
                    text: '#95A1AE',
                    border: '#95A1AE',
                    notification: '#50575F',
                },
            };
        default:
        return state;
    }
};
