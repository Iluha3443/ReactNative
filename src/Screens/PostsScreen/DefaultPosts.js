import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export const DefaultPostsScreen = () => {
    const navigation = useNavigation();
    
    return (
        <>  
            <View style={styles.container}>
                <View>
                    <Image style={styles.userPhoto} />
                        <Text style={styles.nameUser}>Name</Text>
                    <Text style={styles.emailUser}>Email</Text>
                </View>
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
        alignItems: 'center',
        position: 'relative',
    },
    MyPost: {
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: 17,
        marginTop: 11,
       borderBottomColor: 'red',
        borderBottomWidth: 1,
        marginBottom: 32,
    },
     logoutIcon: {
        position: 'absolute',
        left: 150,
        top: 11,
    },
    userPhoto: {
        height: 60,
        width: 60,
        backgroundColor: 'red',
        borderRadius: 16,
    },
    nameUser: {
         fontFamily: 'Roboto',
        fontSize: 18,
    },
    emailUser: {
         fontFamily: 'Roboto',
        fontSize: 11,
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
});