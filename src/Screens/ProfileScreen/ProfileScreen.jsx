import React, { useState, useEffect, } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Location from "expo-location";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const [location, setLocation] = useState(null);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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

  function handleMapPress() {

  }

  function handlePublishClick() {
    navigation.navigate('Posts')
    getCurrentLocation()
      .then((location) => {
        if (location) {
          console.log("Current location:", location);

          // if (photoUri) {
          //   // Здесь можно использовать URI фотографии и координаты для создания поста
          // }
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
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }} >       
                         <Image
                source={require('../Image/Camera.png')}
                style={styles.photo}
              />
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
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
            <TouchableOpacity onPress={handlePublishClick} style={styles.Btn}>
              <Text style={styles.BtnText}>Опублікувати</Text>
            </TouchableOpacity>

            <View style={styles.deletePhoto}>
              <Image
                source={require('../Image/DeletePudlication.png')}
                style={styles.deleteIcon}
              />
            </View>
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
    position: 'absolute',
    left: 142,
    top: 60,
    opacity: 0.5
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
    // stylesCamera
  containerCamera: {
  width:'100%' , height:  '100%', 
},
camera: {
width:'100%', height:  '100%',
},
  // photoView: {
  //   flex: 1,
  //   backgroundColor: "transparent",
  //   justifyContent: "flex-end",
  // },
  // flipContainer: {
  //   flex: 0.1,
  //   alignSelf: "flex-end",
  // },
  // button: { alignSelf: "center" },
  // takePhotoOut: {
  //   borderWidth: 2,
  //   borderColor: "white",
  //   height: 50,
  //   width: 50,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 50,
  // },
  // takePhotoInner: {
  //   borderWidth: 2,
  //   borderColor: "white",
  //   height: 40,
  //   width: 40,
  //   backgroundColor: "white",
  //   borderRadius: 50,
  // },
});





