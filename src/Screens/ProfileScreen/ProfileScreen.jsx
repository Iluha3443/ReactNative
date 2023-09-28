import React, { useState, useEffect, } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Location from "expo-location";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";



export const ProfileScreen = () => {
  const [location, setLocation] = useState(null);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  function deletePhotoAndLocation() {
    setPhoto('');
  };

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  async function getCurrentLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      return coords;
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  }

  const uploadPhotoToServer = async () => {
    console.log("photo", photo)
    const id = new Date().getTime()
   
    const storageRef = ref(storage, `gallery/${id}`);
   
    uploadBytes(storageRef, photo).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    })
    
    const snapshot = await uploadBytes(storageRef, photo);
    console.log("Uploaded a blob or file!");

  
    const url = await getDownloadURL(storageRef);
    console.log("Download URL:", url);

    
  };
  
 

  async function handleMapPress() {
     
    const camera = await cameraRef.takePictureAsync();
    console.log("camera", camera)
   
      setPhoto(camera.uri)
    
    
    await MediaLibrary.createAssetAsync(camera.uri);
    // console.log(camera.uri)
  }

  function handlePublishClick() {
   
    // uploadPhotoToServer()
    getCurrentLocation()
    navigation.navigate('Home')
      .then((location) => {
        if (location) {
          console.log("Current location:", location);

          if (photoUri) {
            console.log(" photoUri:", photoUri);
            // Здесь можно использовать URI фотографии и координаты для создания поста
          }
        } else {
          // Обработка случаев, когда координаты не доступны
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.formKeyboard}>
          <View style={styles.container}>
            <View style={styles.addPhoto}>
              <View style={styles.content}>
                <View style={styles.containerCamera}>
                  <Camera
                    style={styles.camera}
                    type={type}
                    ref={setCameraRef}
                  >
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
                        onPress={handleMapPress}
                      >
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
            <Text style={styles.load}>Завантажте фото</Text>
            <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 110 : 0 }}>
              <TextInput
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
                  onFocus={() => setisShowKeyboard(true)}
                  onBlur={() => setisShowKeyboard(false)}
                  style={styles.inputLocationText}
                  placeholder='Місцевість...'></TextInput>
              </View>
            </View>
            <TouchableOpacity onPress={uploadPhotoToServer} style={styles.Btn}>
              <Text style={styles.BtnText}>Опублікувати</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletePhotoAndLocation}>
             <View style={styles.deletePhoto}>
              <Image
                source={require('../Image/DeletePudlication.png')}
                style={styles.deleteIcon}
              />
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
    marginTop:50
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
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#BDBDBD',
        marginBottom: 32,
        marginTop: 8,
       alignSelf: 'flex-start', 
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
    borderWidth:1,
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
        width:'100%'  
  },
  button: {
    alignItems:'center'
  },
  containerCamera: {
  width:'100%' , height:  '100%', 
},
camera: {
width:'100%', height:  '100%',
},
});





