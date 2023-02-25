import React, { useState, useContext, useEffect }  from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { DividerElement } from '../components/DividerElement';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { styles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const ThemeScreen = () => {

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const { top } = useSafeAreaInsets();
    const { theme, setDarkTheme, setLightTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (isEnabled === true) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);


  return (
    <View style={{...styles.globalContainer, top: top + 30}}>
        <Text style={{...settingsStyles.title, color: theme.colors.text}}>Theme</Text>
        <View style={settingsStyles.row}>
            <Text style={{color: theme.colors.text}}>Darkmode</Text>
            <Switch
                trackColor={{false: '#767577', true: theme.colors.border}}
                thumbColor={isEnabled ? theme.colors.primary : theme.colors.notification}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>

        <DividerElement height={1} marginBottom={20} marginTop={12} />

    </View>
  );
};

const settingsStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    // itemText: {},
});
