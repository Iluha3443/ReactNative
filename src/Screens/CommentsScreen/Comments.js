import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

export const Comments = () => {
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.formKeyboard}>
                    <View style={styles.container}>
                        <View style={styles.addPhoto}>
                    
                        </View>
                        <View style={styles.comments}>
                            <Text>Comments</Text>
                        </View>
                        <View style={styles.inputComment}>
                            <View style={styles.sendIcon}>
                                <AntDesign name="arrowup" size={24} color="white" />
                            </View>
                          
                            <TextInput
              
                                placeholder='Коментувати...'></TextInput>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback >
        </>
    )
};


const styles = StyleSheet.create({
    addPhoto: {
        width: '100%',
        height: 240,
        backgroundColor: '#E8E8E8',
        marginBottom: 32,
    },
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        paddingRight: 16,
        paddingLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    comments: {
        marginBottom: 32
    },
    inputComment: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        backgroundColor: '#F6F6F6',
        padding: 16,
        borderRadius: 10
    },
    sendIcon: {
        position: 'absolute',
        right: 10,
        top: 8,
        backgroundColor: '#FF6C00',
        padding: 5,
        borderRadius: 50,
    }
});