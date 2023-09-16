import { Image,StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, } from 'react-native';


export const ProfileScreen = () => {
   
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.formKeyboard}>
                    <View style={styles.container}>                      
                        <View style={styles.content}>
                            <View style={styles.addPhoto}>
                                <Image
                                    source={require('../Image/Camera.png')}
                                    style={styles.photo}
                                />
                            </View>
                        </View>
                        <Text style={styles.load}>Завантажте фото</Text>
                        <TextInput style={styles.inputName} placeholder='Назва...'></TextInput>
                        <View style={styles.inputLocation}>
                            <Image
                                source={require('../Image/map-pin.png')}
                                style={styles.location}
                            />
                            <TextInput style={styles.inputLocationText} placeholder='Місцевість...'></TextInput>
                        </View>
                        <TouchableOpacity style={styles.Btn}>
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
    }
});

