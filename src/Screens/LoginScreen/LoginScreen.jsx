import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity  } from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg"

export const LoginScreen = () => {
    return (
        <>
            <ImageBackground source={BackgroundImg} style={styles.BackgroundImg} >
                <View style={styles.container}>
                    <Text style={styles.title}>Увійти</Text>
                    <TextInput style={styles.inputLogin} placeholder='Адреса електронної пошти' />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="Пароль"
                            secureTextEntry={true}
                        />
                        <Text style={styles.showText}>Показать</Text>
                    </View>
                    <TouchableOpacity style={styles.Btn}>
                        <Text style={styles.BtnText}>Увійти</Text>
                    </TouchableOpacity>
                    <Text style={styles.entrance}>Немає аккаунту? Зареєструватися</Text>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    BackgroundImg: {
         justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 30,
        color: '#212121',
        marginTop: 32,
        marginBottom: 33,
        lineHeight: 35.16
    },
    inputLogin: {
        fontFamily: 'Roboto',
        width: 343,
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
        width: 343,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 43,
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
        width: 343,
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