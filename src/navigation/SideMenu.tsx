import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsScreen } from '../screens/SettingsScreen';
// import { StackNavigator } from './StackNavigator';
import { useWindowDimensions, View, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
import { styles } from '../theme/appTheme';
import { PomodoroScreen } from '../screens/PomodoroScreen';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

// import { Tabs } from './Tabs';
// import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();


export const SideMenu = () => {

    const { theme } = useContext(ThemeContext);
    const { width } = useWindowDimensions();


    useEffect(() => {
      if (theme.currentTheme === 'dark') {
        changeNavigationBarColor('translucent', false);
      } else {
        changeNavigationBarColor('translucent', true);
      }
    }, [theme.currentTheme]);


  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <StatusBar
            animated={true}
            backgroundColor={theme.colors.background}
            barStyle={theme.dark ? 'light-content' : 'dark-content'}
            // translucent={true}
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
        />
        <NavigationContainer
            theme={theme}
        >
            <Drawer.Navigator
                screenOptions={{
                    headerShown: true,
                    drawerType: width >= 768 ? 'permanent' : 'front',
                    headerTintColor: theme.colors.primary,
                    headerStyle: {
                        elevation: 0,
                    },
                    // headerTransparent: true,
                    title: '',
                    // header: () => <CustomIcon />,
                }}
                // eslint-disable-next-line react/no-unstable-nested-components
                drawerContent={ (props) => <InternalMenu {...props} />}
            >
                {/* <Drawer.Screen name="Tabs" component={Tabs} /> */}
                <Drawer.Screen name="PomodoroScreen" component={PomodoroScreen} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    </View>
  );
};

const InternalMenu = ( {navigation}: DrawerContentComponentProps) => {

    const { theme } = useContext(ThemeContext);

    return (
        <DrawerContentScrollView>
            <View style={styles.avatarContainer}>
                <Image
                    source={{
                        uri:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                    }}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        ...styles.menuButton,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={ () => navigation.navigate('PomodoroScreen')}
                >
                    {/* <Icon name="compass-outline" size={22} /> */}
                    <Text // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            ...styles.menuText,
                            color: theme.colors.text,
                            marginLeft: 4,
                            }}
                        >
                            Timer
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        ...styles.menuButton,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={ () => navigation.navigate('SettingsScreen')}
                >
                    {/* <Icon name="settings-outline" size={22} /> */}
                    <Text
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            ...styles.menuText,
                            color: theme.colors.text,
                            marginLeft: 4,
                            }}
                        >
                            Settings
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};
