import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useForm } from '../hooks/useForm';
import { styles } from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {

    const { theme } = useContext(ThemeContext);
    const { top } = useSafeAreaInsets();
    // const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { name, email, password, onChange } = useForm({
        email: '',
        password: '',
        name: '',
    });

    // useEffect(() => {
    //     if (errorMessage.length === 0) {
    //         return;
    //     }
    //     Alert.alert('Login incorrecto', errorMessage, [{
    //         text: 'Ok',
    //         onPress: removeError,
    //     }]);
    // }, [errorMessage, removeError]);

    const onLogin = () => {
        console.log({name, email, password});
        Keyboard.dismiss();

        // signIn({correo: email, password});
    };


  return (
        <KeyboardAvoidingView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{flex: 1}}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={{...styles.globalContainer, top: top, marginHorizontal: 40}}>

                <View style={{marginTop: 40}}/>
                <View style={{...loginStyles.bottomContainer, marginBottom: 10}}>
                    <Image
                        source={require('../assets/images/pomo.png')}
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    />
                </View>

                <TextInput
                    placeholder="Name"
                    // placeholderTextColor="rgba(255,255,255,0.4)"
                    placeholderTextColor={theme.colors.notification}
                    keyboardType="default"
                    style={{...loginStyles.textInput, borderColor: theme.colors.primary}}
                    // underlineColorAndroid={theme.colors.border}
                    // style={[
                    //     loginStyles.inputField,
                    //     (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                    // ]}
                    selectionColor="#DDDFDF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={ (value) => onChange(value, 'email')}
                    value={email}
                    // onSubmitEditing={onLogin}
                />

                <TextInput
                    placeholder="Email"
                    // placeholderTextColor="rgba(255,255,255,0.4)"
                    placeholderTextColor={theme.colors.notification}
                    keyboardType="email-address"
                    style={{...loginStyles.textInput, borderColor: theme.colors.primary}}
                    // underlineColorAndroid={theme.colors.border}
                    // style={[
                    //     loginStyles.inputField,
                    //     (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                    // ]}
                    selectionColor="#DDDFDF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={ (value) => onChange(value, 'email')}
                    value={email}
                    // onSubmitEditing={onLogin}
                />

                <TextInput
                    placeholder="password"
                    // placeholderTextColor="rgba(255,255,255,0.4)"
                    placeholderTextColor={theme.colors.notification}
                    // underlineColorAndroid={theme.colors.border}
                    style={{...loginStyles.textInput, borderColor: theme.colors.primary}}
                    secureTextEntry
                    // style={[
                    //     loginStyles.inputField,
                    //     (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                    // ]}
                    selectionColor="#DDDFDF"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={ (value) => onChange(value, 'password')}
                    value={password}
                    // onSubmitEditing={onLogin}
                />
                <View
                    style={loginStyles.bottomContainer}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{...loginStyles.button, backgroundColor: theme.colors.primary}}
                        onPress={onLogin}
                    >
                        <Text
                            style={{...loginStyles.buttonText, color: theme.colors.background}}
                        >
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={loginStyles.bottomContainer}
                >
                <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={ () => navigation.navigate('LoginScreen')}
                        style={loginStyles.signUpButton}
                    >
                        <Text
                            style={{...loginStyles.signUpText, color: theme.colors.text, borderBottomColor: theme.colors.border}}
                        >
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
  );
};

const loginStyles = StyleSheet.create({
    label: {
        fontSize: 16,
    },
    formContainer: {
        flex: 1,
        // paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    textInput: {
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 50,
        paddingHorizontal: 8,
    },
    button: {
        borderRadius: 40,
        minWidth: 120,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpButton: {
        // minWidth: 120,
        marginTop: -8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    signUpText: {
        borderBottomWidth: 1,
    },
});
