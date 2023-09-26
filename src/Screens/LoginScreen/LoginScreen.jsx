import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSignInUser } from '../../redux/auth/authOperation';

export const LoginScreen = () => {
    const navigation = useNavigation();
    const [isShowKeyboard, setisShowKeyboard] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onLogin = () => {
        const user = {
            email,
            password,
        }
        dispatch(authSignInUser(user))
       
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.formKeyboard}>
                    <ImageBackground source={BackgroundImg} style={styles.BackgroundImg} >
                        <View style={styles.container}>
                            <Text style={styles.title}>Увійти</Text>
                            <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 110 : 0 }}>
                                <TextInput
                                    style={styles.inputLogin}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder='Адреса електронної пошти'
                                    onFocus={() => setisShowKeyboard(true)}
                                    onBlur={() => setisShowKeyboard(false)} />
                                <View style={{ ...styles.inputContainer, marginBottom: isShowKeyboard ? 32 : 43 }}>
                                    <TextInput
                                        style={styles.inputPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Пароль"
                                        secureTextEntry={true}
                                        onFocus={() => setisShowKeyboard(true)}
                                        onBlur={() => setisShowKeyboard(false)}
                                    />
                                    <Text style={styles.showText}>Показать</Text>
                                </View>
                            </View>
                            {!isShowKeyboard && (
                                <>
                                    <TouchableOpacity onPress={onLogin} style={styles.Btn}>
                                        <Text style={styles.BtnText}>Увійти</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                                        <Text style={styles.entrance}>Немає аккаунту? Зареєструватися</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                               
                        </View>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    )
};

const styles = StyleSheet.create({
    BackgroundImg: {
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
    },
    container: {
        backgroundColor: '#FFFFFF',
        paddingRight: 16,
        paddingLeft: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '100%',
    },
    formKeyboard: {
        width: '100%',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 30,
        color: '#212121',
        marginTop: 32,
        marginBottom: 33,
    },
    inputLogin: {
        fontFamily: 'Roboto',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputPassword: {
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    showText: {
        marginLeft: 6,
        color: '#007AFF',
    },
    Btn: {
        fontFamily: 'Roboto',
        fontSize: 16,
        padding: 16,
        backgroundColor: '#FF6C00',
        borderRadius: 5,
        width: '100%',
        marginBottom: 16,
    },
    BtnText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    entrance: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#1B4371',
        marginBottom: 150,
    }
});