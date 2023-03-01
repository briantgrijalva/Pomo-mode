import React, { useContext }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DividerElement } from '../components/DividerElement';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { styles } from '../theme/appTheme';
import { Slider } from '@miblanchard/react-native-slider';
import { TimerContext } from '../context/timerContext/TimerContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const DurationTimerScreen = () => {
    // const [workTimer, setWorkTimer] = useState<number | number[]>(25);
    // const [breakTimer, setBreakTimer] = useState<number | number[]>(5);

    const { top } = useSafeAreaInsets();
    const { theme } = useContext(ThemeContext);
    const { time, setBreakTime, setWorkTime, setInitialWorkTime, setInitialBreakTime } = useContext(TimerContext);


  return (
    <View style={{...styles.globalContainer, top: top + 30}}>

        <Text style={{...settingsStyles.title, color: theme.colors.text}}>Timer</Text>
        <Text style={{color: theme.colors.text}}>Work session duration</Text>
        <View style={settingsStyles.row}>
            <Slider
                value={time.workTime}
                thumbStyle={{height: 16, width: 16}}
                trackStyle={{height: 3}}
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
                    setInitialWorkTime(Number(itemValue.toLocaleString()));
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
                thumbStyle={{height: 16, width: 16}}
                trackStyle={{height: 3}}
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
                    setInitialBreakTime(Number(itemValue.toLocaleString()));
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
