import React, { useState, useEffect, } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Location from "expo-location";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { storage, db } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';
import { collection, addDoc } from "firebase/firestore";
import { Loader } from '../../Loader/Loader';
import * as ImagePicker from 'expo-image-picker';
 
export const ProfileScreen = () => {
  const [userImage, setUserImage] = useState(null);
  const [locationUser, setLocation] = useState(null);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [locationMessage, setLocationMessage] = useState('');
  const { userId, userName } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false)
    
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const { statusLocation } = await Location.requestForegroundPermissionsAsync();
      const locationUser = await Location.getCurrentPositionAsync({});
      setLocation(locationUser.coords);
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
      setUserImage(result.assets[0].uri );
    }
  };

  
  function deletePhotoAndLocation() {
    setPhoto('');
    setUserImage(null)
    setNameMessage('');
    setLocationMessage('');
  };

  const uploadPostToServer = async () => {
    setIsLoading(true)
    try {
      const photoPost = await uploadPhotoToServer();
      const docRef = await addDoc(collection(db, 'users'), {
        photoPost,
        nameMessage,
        locationMessage,
        locationUser,
        userId, userName
      });
      setIsLoading(false)
    } catch {
      console.log("uploadPostToServer Error:", error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {

      let imageUrl;

      if (photo) {
        imageUrl = await fetch(photo);
      }

      if (userImage) {
        imageUrl = await fetch(userImage);
      }

      const file = await imageUrl.blob();
      const uniquePostId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const storageRef = ref(storage, `postsImages/${uniquePostId}`);
      const res = await uploadBytes(storageRef, file);
      const processedPhoto = await getDownloadURL(
        ref(storage, `postsImages/${uniquePostId}`)
      );
      return processedPhoto;
    } catch (error) {
      console.log("uploadPhotoToServer Error:", error);
    }
  };
  
  async function handleMapPress() { 
     try {
    const camera = await cameraRef.takePictureAsync(); 
    setPhoto(camera.uri);  
    await MediaLibrary.createAssetAsync(camera.uri);
    } catch (error) {
      console.log("handleMapPress Error:", error);
    }
  };

  async function handlePublishClick() {
    await uploadPostToServer();
    deletePhotoAndLocation()
    navigation.navigate('Home')
  };

  return (
    <>
       {isLoading && <Loader />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.formKeyboard}>
          <View style={styles.container}>
            <View style={styles.addPhoto}>
              <View style={styles.content}>
                <View style={styles.containerCamera}>
                  <Camera
                    style={styles.camera}
                    type={type}
                    ref={setCameraRef} >
                    {userImage &&  <View style={styles.MyPhoto}>
                      <Image source={{ uri: userImage }} style={{height:'100%', width:'100%'}} />
                    </View>}
                    {photo && <View style={styles.MyPhoto}>
                      <Image source={{ uri: photo }} style={{height:'100%', width:'100%'}} />
                    </View>}
                    <View style={styles.photoView}>
                      <TouchableOpacity
                        style={styles.flipContainer}
                        onPress={() => {
                          setType(
                            type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                          );
                        }} >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                          {" "}
                          Flip{" "}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleMapPress} >
                        <Image
                          source={require('../Image/Camera.png')}
                          style={styles.photo}
                        />
                      </TouchableOpacity>
                    </View>
                  </Camera>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.load} onPress={pickImage}>
             <Text style={styles.loadText}>Завантажте фото</Text>
            </TouchableOpacity>    
          <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 110 : 0 }}>
               <TextInput
                value={nameMessage}
                onChangeText={setNameMessage}
                onFocus={() => setisShowKeyboard(true)}
                onBlur={() => setisShowKeyboard(false)}
                style={styles.inputName}
                placeholder='Назва...'></TextInput>
              <View style={styles.inputLocation}>
                <Image
                  source={require('../Image/map-pin.png')}
                  style={styles.location}
                />
                <TextInput
                  value={locationMessage}
                  onChangeText={setLocationMessage}
                  onFocus={() => setisShowKeyboard(true)}
                  onBlur={() => setisShowKeyboard(false)}
                  style={styles.inputLocationText}
                  placeholder='Місцевість...'></TextInput>
              </View>
            </View>
            <TouchableOpacity onPress={handlePublishClick} style={styles.Btn}>
              <Text style={styles.BtnText}>Опублікувати</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletePhotoAndLocation}>
             <View style={styles.deletePhoto}>
              <Image
                source={require('../Image/DeletePudlication.png')}
                style={styles.deleteIcon} />
            </View>
            </TouchableOpacity>  
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      </>
  )
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  NewPostContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginBottom: 32,
    paddingBottom: 15,
    width: '100%'
  },
  photo: {
    opacity: 0.5,
    marginTop: 50
  },
  NewPost: {
    fontFamily: 'Roboto',
    fontSize: 17,
    marginTop: 11,
  },
  logoutIcon: {
    position: 'absolute',
    right: 150,
    top: 11,
  },
  content: {
    width: '100%',
  },
  addPhoto: {
    width: '100%',
    height: 240,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  load: {
    marginBottom: 32,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  loadText: {
     fontFamily: 'Roboto',
    fontSize: 16,
    color: '#BDBDBD',
  },
  inputName: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 50,
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 16,
  },
  inputLocation: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 50,
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLocationText: {
    fontSize: 16,
  },
  MyPhoto: {
    position: 'absolute',
    height: 240,
    width: 343,
    top: 0,
    left: 0,
    borderColor: "red",
    borderWidth: 1,
  },
  Btn: {
    fontFamily: 'Roboto',
    fontSize: 16,
    padding: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 15,
    width: '100%',
    marginBottom: 50,
  },
  BtnText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  deletePhoto: {
    width: 70,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#E8E8E8',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  form: {
    width: '100%'
  },
  button: {
    alignItems: 'center'
  },
  containerCamera: {
    width: '100%', height: '100%',
  },
  camera: {
    width: '100%', height: '100%',
  },
});





