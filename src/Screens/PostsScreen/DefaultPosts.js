import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';

export const DefaultPostsScreen = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    // const [comment, setComment] = useState([])
    const { userName, userEmail } = useSelector((state) => state.auth);

    const getDataFromFirestore = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'users'));
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            // const postsWithCommentCount = await Promise.all(
            //     posts.map(async (post) => {
            //         const commentSnapshot = await getDocs(collection(db, `users/${post.id}/comments`))
            //         setComment(commentSnapshot.docs.map((doc) => doc))
            //          console.log(comment)
            //     })
            // );
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    
    useEffect(() => {
        getDataFromFirestore();
    });

    return (
        <>  
            <View style={styles.container}>
                <View style={{flexDirection:"row", padding:10}}>
                    <Image style={styles.userPhoto} />
                    <Text style={styles.nameUser}>{userName}</Text>
                    <Text style={styles.emailUser}>{userEmail}</Text>
                    </View>
                <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                    <View>
                            <Image
                                source={{ uri: item.photoPost }}
                                 style={styles.myPost}
                            />
                            <Text style={styles.nameMessage}>{item.nameMessage}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Comments', {postId: item.id, uri: item.photoPost})}>
                                    <View >
                                    <Feather style={{ marginRight: 20 }} name="message-circle" size={24} color="#FF6C00" />
                                    </View>
                                </TouchableOpacity>
                            
                                <AntDesign name="like2" size={24} color="#FF6C00" />
                            <TouchableOpacity onPress={() => navigation.navigate('Map', {location:item.locationUser})}>
                                    <View style={styles.location}>
                                        <Image
                                            source={require('../Image/map-pin.png')}
                                        />
                                        <Text>{item.locationMessage}</Text>
                                    </View>
                                </TouchableOpacity>
                    </View>
                    </View>
                )}   />     
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
    myPost: {
         borderRadius: 10,
         height: 300,
        width: 344,
        marginBottom: 12,
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
    nameMessage: {
        fontFamily: 'Roboto',
        fontSize: 18,
        marginBottom:5
    },
    NameUser: {
        fontFamily: 'Roboto',
        fontSize: 30,
        marginBottom: 20
    },
    location: {
        marginLeft: 200,
        flexDirection: 'row',
        alignItems: 'center'
    },
});