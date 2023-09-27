import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity,} from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg"
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { useDispatch } from 'react-redux';
import Logout from "../Image/log-out.png"

export const DefaultHome = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    
    return (
        <>
            <ImageBackground source={BackgroundImg} style={styles.BackgroundImg} >
                <View style={styles.container}>
                    <View style={styles.photo}>
                        <Image
                            source={require('../Image/remove.png')}
                            style={styles.plusIcon}
                        />
                    </View>
                            
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 340, top: 10 }}
                        onPress={() => dispatch(authSignOutUser())}
                    >
                        <Image source={Logout} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <View>
                        <Image
                            source={require('../Image/forest-landscape.jpg')}
                            style={styles.myPost}
                        />
                        <Text >Name</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                                <View >
                                    <Feather style={{ marginRight: 20 }} name="message-circle" size={24} color="#FF6C00" />
                                </View>
                            </TouchableOpacity>
                            
                            <AntDesign name="like2" size={24} color="#FF6C00" />
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <View style={styles.location}>
                                    <Image
                                        source={require('../Image/map-pin.png')}
                                    />
                                    <Text>Name</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
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
   
})
