import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useForm } from '../hooks/useForm';
import { styles } from '../theme/appTheme';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { theme } = useContext(ThemeContext);
    const { top } = useSafeAreaInsets();
    // const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: '',
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
        console.log({email, password});
        Keyboard.dismiss();

        // signIn({correo: email, password});
    };

  return (
        <KeyboardAvoidingView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{flex: 1}}
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
        >
            <View style={{...styles.globalContainer, top: top}}>
        <Text style={{color: theme.colors.text, fontSize: 14, top, textAlign: 'right'}}>
            Sign up
        </Text>
        <Text style={{color: theme.colors.text, fontSize: 20, fontWeight: 'bold', top: top + 20}}>
            Log in
        </Text>
            {/* <View style={loginStyles.formContainer}> */}

                {/* <WhiteLogo /> */}

                {/* <Text style={loginStyles.title}>Login</Text> */}

                <View style={{marginTop: 90}}/>
                <Text
                    style={{...loginStyles.label, color: theme.colors.text}}
                >
                    Email:
                </Text>

                <TextInput
                    placeholder="Ingrese su email:"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    underlineColorAndroid="white"
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

                <Text
                    // style={loginStyles.label}
                >
                    Password:
                </Text>

                <TextInput
                    placeholder="*********"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    underlineColorAndroid="white"
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
                    // style={loginStyles.bottomContainer}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        // style={loginStyles.button}
                        onPress={onLogin}
                    >
                        <Text
                            // style={loginStyles.buttonText}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    // style={loginStyles.newUserContainer}
                >
                <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={ () => navigation.replace('RegisterScreen')}
                        // style={loginStyles.button}
                    >
                        <Text
                            // style={loginStyles.buttonText}
                        >
                            Nueva Cuenta
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
    {/* </View> */}
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
});
