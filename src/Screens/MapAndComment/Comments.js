import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Loader } from '../../Loader/Loader';

export const Comments = ({ route }) => {
    const [isShowKeyboard, setisShowKeyboard] = useState(false);
    const [comment, setComment] = useState("");
    const [collectionComments, setCollectionComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { userName, Avatar } = useSelector((state) => state.auth)
    const { postId, uri } = route.params;

    useEffect(() => {
        getAllComments();
    }, [collectionComments])
    
    const CreateComments = async () => {
        setIsLoading(true)
        const commentsCollectionRef = collection(db, `users/${postId}/comments`);
        const newCommentData = {
            text: comment,
            userName,
        };
        const docRef = await addDoc(commentsCollectionRef, newCommentData);
        setComment("")
        setIsLoading(false)
    };
    const getAllComments = async () => {
        const snapshot = await getDocs(collection(db, `users/${postId}/comments`));
        setCollectionComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    return (
        <>
            {isLoading && <Loader />}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.formKeyboard}>
                    <View style={styles.container}>
                        <View style={styles.addPhoto}>
                            <Image
                                source={{ uri: uri }}
                                style={styles.addPhoto}
                            />
                        </View>
                        <FlatList data={collectionComments} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                            <View style={{flexDirection:'row'}}>
                               <Image
                                source={{ uri: Avatar }}
                                style={styles.userAvatar}
                            />
                            <View style={styles.commentsContainer}>
                                  <Text style={styles.userNameText}>{item.userName}</Text>  
                                    <Text style={styles.commentText}>{item.text}</Text>  
                                     
                                </View>
                            </View>
                )}   />       
                        <View style={{ ...styles.inputComment, bottom: isShowKeyboard ? 100 : 10 }}>
                            <TextInput
                                value={comment}
                                onChangeText={(text) => setComment(text)}
                                style={styles.input}
                                onFocus={() => setisShowKeyboard(true)}
                                onBlur={() => setisShowKeyboard(false)}
                                placeholder='Коментувати...' />
                            <TouchableOpacity onPress={CreateComments} >
                                <View style={styles.sendIcon} >
                                    <AntDesign name="arrowup" size={28} color="white" />
                                </View>
                            </TouchableOpacity>
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
        marginBottom: 32,
        marginTop: 24,
        borderRadius: 10
    },
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        paddingRight: 16,
        paddingLeft: 16,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    inputComment: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F6F6F6',
        padding: 10,
        paddingLeft: 0,
        borderRadius: 10,
    },
    sendIcon: {
        backgroundColor: '#FF6C00',
        padding: 3,
        borderRadius: 50,
    },
    sendIconContainer: {
        borderRadius: 50
    },
    commentsContainer: {
        justifyContent: 'flex-start',
        padding: 25,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'red',
        marginVertical: 8,
        marginRight: 120,
    },
    commentText: {
        marginLeft: 20,
        fontSize: 16,
        marginTop: 20
    },
    userNameText: {
        fontWeight: 'bold',
        marginRight: 20,
    },
    userAvatar: {
        borderRadius: 16,
        width: 60,
        height: 60,
        justifyContent: 'flex-start',
        marginRight: 10,
        marginTop: 40
    }
});