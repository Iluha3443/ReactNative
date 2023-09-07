import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image  } from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg"


export const RegistrationScreen = () => {
  return (
    <>
      <ImageBackground source={BackgroundImg} style={styles.BackgroundImg} >
        <View style={styles.container}>
          <View style={styles.photo}>
            <Image
              source={require('../Image/add.png')}
              style={styles.plusIcon}
            />
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput style={styles.inputLogin} placeholder='Логін' />
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
            <Text style={styles.BtnText}>Зареєструватися</Text>
          </TouchableOpacity>
          <Text style={styles.entrance}>Вже є акаунт? Увійти</Text>
        </View>
      </ImageBackground>
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
        width: '100%',
        paddingRight: 16,
    paddingLeft:16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
  photo: {
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    bottom: 16,
    right: -12,
    position: 'absolute'
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
    marginBottom: 50
  }
});