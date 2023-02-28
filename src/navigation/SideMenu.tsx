import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeScreen } from '../screens/ThemeScreen';
import { useWindowDimensions, View, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
import { styles } from '../theme/appTheme';
import { PomodoroScreen } from '../screens/PomodoroScreen';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DurationTimerScreen } from '../screens/DurationTimerScreen';
import { DividerElement } from '../components/DividerElement';
import { LoginScreen } from '../screens/LoginScreen';


const Drawer = createDrawerNavigator();


export const SideMenu = () => {

    const { theme } = useContext(ThemeContext);
    const { width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();


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
        />
        <NavigationContainer
            theme={theme}
        >
            <Drawer.Navigator
                screenOptions={{
                    // headerShown: false,
                    drawerType: width >= 768 ? 'permanent' : 'front',
                    headerTintColor: theme.colors.primary,
                    headerStyle: {
                        elevation: 0,
                    },
                    title: '',
                    // headerTitle: 'test',
                }}
                drawerContent={ (props) => <InternalMenu {...props} />}
            >
                {/* <Drawer.Screen name="Tabs" component={Tabs} /> */}
                <Drawer.Screen
                    options={{header: ({navigation}) => (
                        <TouchableOpacity
                            style={{...styles.globalContainer, top: top + 20}}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name="menu" size={30} color={theme.colors.primary} />
                        </TouchableOpacity>
                    ),}}
                    name="PomodoroScreen"
                    component={PomodoroScreen}
                />
                <Drawer.Screen
                    options={{header: ({navigation}) => (
                        <TouchableOpacity
                            style={{...styles.globalContainer, top: top + 20}}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name="menu" size={30} color={theme.colors.primary} />
                        </TouchableOpacity>
                    ),}}
                    name="DurationTimerScreen"
                    component={DurationTimerScreen}
                />
                <Drawer.Screen
                    options={{header: ({navigation}) => (
                        <TouchableOpacity
                            style={{...styles.globalContainer, top: top + 20}}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Icon name="menu" size={30} color={theme.colors.primary} />
                        </TouchableOpacity>
                    ),}}
                    name="ThemeScreen"
                    component={ThemeScreen}
                />
                <Drawer.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="LoginScreen"
                    component={LoginScreen}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    </View>
  );
};

const InternalMenu = ( {navigation}: DrawerContentComponentProps) => {

    const { theme } = useContext(ThemeContext);
    const { top, bottom } = useSafeAreaInsets();

    return (
        // <DrawerContentScrollView style={{flex: 1}}>
            <View style={{flex: 1, top}}>

                <View
                    style={{
                        ...styles.avatarContainer,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text style={{color: theme.colors.text}}>
                            Welcome
                        </Text>
                        <Text style={{color: theme.colors.text, fontSize: 18, fontWeight: 'bold'}}>
                            User Name.
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                        }}
                        style={{...styles.avatar, borderColor: theme.colors.notification}}
                    />
                </View>

                <View
                    style={{
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    <DividerElement height={0.5} marginBottom={20} marginTop={12} />
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
                        <Icon name="timer-outline" size={20} color={theme.colors.primary}/>
                        <Text // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                                ...styles.menuText,
                                color: theme.colors.text,
                                marginLeft: 16,
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
                        onPress={ () => navigation.navigate('DurationTimerScreen')}
                    >
                        <Icon name="hourglass-outline" size={20} color={theme.colors.primary}/>
                        <Text
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                                ...styles.menuText,
                                color: theme.colors.text,
                                marginLeft: 16,
                                }}
                            >
                                Timer duration
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            ...styles.menuButton,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        onPress={ () => navigation.navigate('ThemeScreen')}
                    >
                        <Icon name="color-palette-outline" size={20} color={theme.colors.primary}/>
                        <Text
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                                ...styles.menuText,
                                color: theme.colors.text,
                                marginLeft: 16,
                                }}
                            >
                                Appearence
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        // backgroundColor: 'blue',
                        marginHorizontal: 10,
                        flex: 7,
                        bottom: bottom,
                        // position: 'absolute'
                        justifyContent: 'flex-end',
                    }}
                >
                    <DividerElement height={0.5} marginBottom={20} marginTop={12} />
                </View>
                <TouchableOpacity
                    onPress={ () => navigation.navigate('LoginScreen')}
                    style={{
                        marginHorizontal: 10,
                        flex: 1,
                        bottom: bottom,
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.primary,
                            textAlign: 'center',
                            fontSize: 18,
                        }}
                    >
                        LOG IN
                    </Text>
                </TouchableOpacity>
            </View>
        // </DrawerContentScrollView>
    );
};
