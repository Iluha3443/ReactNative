import { Image,StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,  } from 'react-native';

export const CreatePostsScreen = () => {
    return (
        <>
          
            <View style={styles.container}>
                <View>
                    <Image
                  source={require('../Image/arrow-left.png')}
                  style={styles.logoutIcon}
                        />
                </View>
                <Text style={styles.NewPost}>Створити публікацію</Text>
                <View style={styles.content}>
                    <View style={styles.addPhoto}>
                        <Image
                  source={require('../Image/Camera.png')}
                  style={styles.photo}
                        /></View>
                </View>
                </View>
           
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
    NewPost: {
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: 17,
        paddingBottom: 11,
        paddingTop: 11,
        borderBottomWidth: 10,
       borderBottomColor: 'red',
    },
    logoutIcon: {
        position: 'absolute',
        right: 150,
        top: 11,
    },
    content: {
        width: '100%'
    },
    addPhoto: {
        width: '100%',
        height: 240,
        backgroundColor: '#E8E8E8',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
})