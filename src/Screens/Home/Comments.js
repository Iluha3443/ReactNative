import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from 'react';

export const Comments = () => {
    const [isShowKeyboard, setisShowKeyboard] = useState(false);

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
                        <View style={{ ...styles.inputComment, bottom: isShowKeyboard ? 250 : 10 }}>
                            <View style={styles.sendIcon}>
                                <AntDesign name="arrowup" size={28} color="white" />
                            </View>
                            <TextInput
                                    onFocus={() => setisShowKeyboard(true)}
                                    onBlur={() => setisShowKeyboard(false)}
                                placeholder='Коментувати...'/>
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
        marginTop: 32,
    },
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        paddingRight: 16,
        paddingLeft: 16,
        alignItems: 'center',
        position: 'relative',
    },
    comments: {
        marginBottom: 260
    },
    inputComment: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F6F6F6',
        padding: 10,
        paddingLeft: 0,
        borderRadius: 10
    },
    sendIcon: {
        backgroundColor: '#FF6C00',
        left: 300,
        padding: 3,
        borderRadius: 50
    },
    sendIconContainer: {
         borderRadius: 50
    }
});