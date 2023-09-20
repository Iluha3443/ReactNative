import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Dimensions, Button} from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg";
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import { Comments } from '../CommentsScreen/Comments';
import { createStackNavigator } from "@react-navigation/stack";



export const Home = () => {
    const [comments, setComments] = useState(false);
    const [maps, setMaps] = useState(false);
    const [isShowKeyboard, setisShowKeyboard] = useState(false);
    const [photo, setPhoto] = useState(null);
    const navigation = useNavigation();
    
const PostsStack = createStackNavigator();

    <PostsStack.Navigator>
        {/* <PostsStack.Screen
          name="HomePosts"
          component={HomePosts}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <PostsStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        /> */}
<PostsStack.Screen
          name="Comment"
          component={Comments}
          options={{
            headerShown: false,
          }}
        />
      </PostsStack.Navigator>

    
    // const [isLogin, setIsLogin] = useState(true);
    // const routing = useRoute(isLogin)
    
    //  const handleLogout = () => {
    //      routing(false);
         
    // };
    
    const toggleMapVisibility = () => {
        setMaps(!maps);
    };

  const goToComments = () => {
    
    };
    
    return (
        <>
            {/* {comments ? <Comments/> : null} */}
            {maps ?
                <View style={styles.containerMap}>
                    <MapView
                        style={styles.mapStyle}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        mapType="standard"
                        minZoomLevel={15}
                        onMapReady={() => console.log("Map is ready")}
                        onRegionChange={() => console.log("Region change")}
                    >
                        <Marker
                            title="I am here"
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            description='Hello'
                        />
                    </MapView>
                    <Button
                        title={maps ? "Закрыть карту" : "Открыть карту"}
                        onPress={toggleMapVisibility}
                    />
                </View> :
                <ImageBackground source={BackgroundImg} style={styles.BackgroundImg} >
                    <View style={styles.container}>
                        <View style={styles.photo}>
                            <Image
                                source={require('../Image/remove.png')}
                                style={styles.plusIcon}
                            />
                        </View>
                             <TouchableOpacity >
                                    <View >
                                       <Image
                                source={require('../Image/log-out.png')}
                                style={styles.logoutIcon}
                            />
                                    </View>
                                </TouchableOpacity>
                      
                        {/* <Text style={styles.NameUser}>Name</Text> */}
                        {photo ? null : <View>
                            <Image
                                source={require('../Image/forest-landscape.jpg')}
                                style={styles.myPost}
                            />
                            <Text >Name</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Comment')} >
                                    <View >
                                        <Feather style={{ marginRight: 20 }} name="message-circle" size={24} color="#FF6C00" />
                                    </View>
                                </TouchableOpacity>
                            
                                <AntDesign name="like2" size={24} color="#FF6C00" />
                                <TouchableOpacity onPress={() => setMaps(true)}>
                                    <View style={styles.location}>
                                        <Image
                                            source={require('../Image/map-pin.png')}
                                        />
                                        <Text>Name</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>}
                    </View>
                </ImageBackground>
            }
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
        alignItems: 'center',
        position: 'relative',
         height: '70%',
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
    logoutIcon: {
    bottom: 82,
    right: -182,
    position: 'absolute'
    },
    NameUser: {
        fontFamily: 'Roboto',
        fontSize: 30,
        marginBottom: 20
    },
    myPost: {
        height: 300,
        width: 344
    },
    location: {
        marginLeft: 200,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerMap: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
        justifyContent: "center",
    
  },
    mapStyle: {
      position: 'relative',
    width: Dimensions.get("window").width,
    height: 700,
    },
    close: {
      position: 'absolute'
  }
})
