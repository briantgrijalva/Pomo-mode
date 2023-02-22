import React, { useState, useContext, useEffect }  from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { DividerElement } from '../components/DividerElement';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { styles } from '../theme/appTheme';
import { Slider } from '@miblanchard/react-native-slider';
import { TimerContext } from '../context/timerContext/TimerContext';


export const SettingsScreen = () => {
    // const [workTimer, setWorkTimer] = useState<number | number[]>(25);
    // const [breakTimer, setBreakTimer] = useState<number | number[]>(5);
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const { theme, setDarkTheme, setLightTheme } = useContext(ThemeContext);
    const { time, setBreakTime, setWorkTime, setInitialTime } = useContext(TimerContext);

    useEffect(() => {
        if (isEnabled === true) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);


  return (
    <View style={styles.globalContainer}>
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

        <Text style={{...settingsStyles.title, color: theme.colors.text}}>Timer</Text>
        <Text style={{color: theme.colors.text}}>Work session duration</Text>
        <View style={settingsStyles.row}>
            <Slider
                value={time.workTime}
                maximumValue={60}
                minimumValue={5}
                thumbTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.notification}
                minimumTrackTintColor={theme.colors.border}
                step={1}
                onValueChange={(itemValue: number | number[]) => {
                    // console.log(itemValue.toLocaleString());
                    // setWorkTimer(itemValue);
                    setWorkTime(Number(itemValue.toLocaleString()));
                    setInitialTime(Number(itemValue.toLocaleString()));
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                containerStyle={{
                    width: '80%',
                }}
            />
            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    color: theme.colors.text,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                }}
            >
                {time.workTime}
            </Text>
        </View>
        <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                color: theme.colors.text,
                marginTop: 20,
            }}
        >
            Break session duration
        </Text>
        <View style={settingsStyles.row}>
            <Slider
                value={time.breakTime}
                maximumValue={25}
                minimumValue={1}
                thumbTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.notification}
                minimumTrackTintColor={theme.colors.border}
                step={1}
                onValueChange={(itemValue) => {
                    // console.log(itemValue);
                    // setBreakTimer(itemValue);
                    setBreakTime(Number(itemValue.toLocaleString()));
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                containerStyle={{
                    width: '80%',
                }}
            />
            <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    color: theme.colors.text,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                }}
            >
                {time.breakTime}
            </Text>
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