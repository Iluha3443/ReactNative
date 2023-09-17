import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export const ProfileScreen = () => {
  const [location, setLocation] = useState(null);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted" && mediaStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

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
    getCurrentLocation()
      .then((location) => {
        if (location) {
          console.log("Current location:", location);

          if (photoUri) {
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
            <MapView
              style={styles.mapStyle}
              region={{
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
            >
              {location && (
                <Marker title="I am here" coordinate={location} description="Hello" />
              )}
            </MapView>
            <View style={styles.content}>
              <View style={{ flex: 1 }}>
                <Camera
                  style={{ flex: 1 }}
                  type={type}
                  ref={(ref) => setCameraRef(ref)}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 0.1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                    >
                      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </View>

              {photoUri && (
                <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />
              )}

              <TouchableOpacity onPress={takePicture}>
                <Text>Take Picture</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addPhoto}>
              <Image
                source={require('../Image/Camera.png')}
                style={styles.photo}
              />
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
        paddingRight: 16,
        paddingLeft: 16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
        marginTop: 30
    },
    addPhoto: {
        width: '100%',
        height: 240,
        backgroundColor: '#E8E8E8',
        position: 'relative',
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
    }
});





