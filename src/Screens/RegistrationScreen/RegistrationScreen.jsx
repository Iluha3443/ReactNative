import { Image,StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,  } from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../../redux/auth/authOperation';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  };
  
  
  const onLogin = () => {
    const newUser = {
      login,
      email,
      password,
      userImage
    };
    dispatch(authSignUpUser(newUser))
  };
  
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
          <ImageBackground source={BackgroundImg} style={styles.BackgroundImg} >
            <View style={styles.container}>
              <View style={styles.avatar}>
                {userImage ? (
                  <TouchableOpacity
                    style={styles.photo}
                    activeOpacity={1}
                    onPress={() => setUserImage(null)}
                  >
                    <Image source={{ uri: userImage }} style={styles.avatar} />
                    <Entypo name="cross" size={24} color="#FF6C00" style={styles.plusIcon} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.photo}
                    activeOpacity={1}
                    onPress={pickImage}
                  >
                    <AntDesign name="plus" size={24} color="#FF6C00" style={styles.plusIcon} />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.title}>Реєстрація</Text>
              <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 110 : 0 }}>
                <TextInput style={{ ...styles.inputLogin, borderColor: isFocusedLogin ? '#FF6C00' : '#ccc' }}
                  placeholder='Логін'
                  value={login}
                  onChangeText={setLogin}
                  onFocus={() => { setisShowKeyboard(true); setIsFocusedLogin(true) }}
                  onBlur={() => { setisShowKeyboard(false); setIsFocusedLogin(false) }} />
                <TextInput
                  style={{ ...styles.inputLogin, borderColor: isFocusedEmail ? '#FF6C00' : '#ccc' }}
                  placeholder='Адреса електронної пошти'
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => { setisShowKeyboard(true); setIsFocusedEmail(true) }}
                  onBlur={() => { setisShowKeyboard(false); setIsFocusedEmail(false) }} />
                <View style={{ ...styles.inputContainer, marginBottom: isShowKeyboard ? 32 : 43, borderColor: isFocusedPassword ? '#FF6C00' : '#ccc' }}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => {
                      setisShowKeyboard(true);
                      setIsFocusedPassword(true);
                    }}
                    onBlur={() => {
                      setisShowKeyboard(false);
                      setIsFocusedPassword(false);
                    }}
                  />
                  <TouchableOpacity style={styles.showText} onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showText}>
                      {showPassword ? "Скрыть" : "Показать"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {!isShowKeyboard && (
                <>
                  <TouchableOpacity onPress={onLogin} style={styles.Btn}>
                    <Text style={styles.BtnText}>Зареєструватися</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.entrance}>Вже є акаунт? Увійти</Text>
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
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
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
  photoUser: {
     width: 120,
    height: 120,
    top: -60,
    borderRadius: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    bottom: 16,
    right: -12,
    position: 'absolute',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#212121',
    marginBottom: 32,
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
    marginBottom: 50
  },
  avatar: {
     width: 120,
    height: 120,
    borderRadius: 16,
  }
});