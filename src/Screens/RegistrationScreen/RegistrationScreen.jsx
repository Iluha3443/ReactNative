import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg"

export const RegistrationScreen = () => {
  return (
    <>
      <ImageBackground source={BackgroundImg} style={styles.BackgroundImg}></ImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput style={styles.inputLogin} placeholder='Логін' />
        <TextInput style={styles.inputLogin} placeholder='Адреса електронної пошти' />
        <TextInput style={styles.inputLogin} placeholder='Пароль' />
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>Зареєструватися</Text>
        </TouchableOpacity>
        <Text>Вже є акаунт? Увійти</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  BackgroundImg: {
    height: 260,
    width: '100%', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#212121',
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
  inputPassword: {
    fontFamily: 'Roboto',
    fontSize: 16,
     backgroundColor: '#BDBDBD',
    width: 343,
    height: 50,
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    fontSize: 16,
     marginBottom: 43,
  },
  Btn: {
    fontFamily: 'Roboto',
    fontSize: 16,
    padding: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 5, 
    width: 343,
  },
  BtnText: {
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});