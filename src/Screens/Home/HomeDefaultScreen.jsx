import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, FlatList} from 'react-native';
import BackgroundImg from '../Image/bgImage.jpg';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { useDispatch, useSelector} from 'react-redux';
import Logout from '../Image/log-out.png';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';

export const DefaultHome = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userId, Avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, [posts]);


  const getUserPosts = async () => {
    const q = query(collection(db, 'users'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  };

  return (
    <ImageBackground source={BackgroundImg} style={styles.BackgroundImg}>
      <View style={styles.container}>

        {Avatar ? (
                 
                   <View style={styles.photo}>
          <Image
            source={{ uri: Avatar }}
            style={styles.avatarUser}
          />
        </View>
                ) : (
                  <View style={styles.photo}>
          <Image
            source={require('../Image/remove.png')}
            style={styles.plusIcon}
          />
        </View>
                )}


       
         <TouchableOpacity
            style={{ position: 'absolute', left: 335, top: 10 }}
            onPress={() => dispatch(authSignOutUser())}
          >
            <Image source={Logout} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
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
    </ImageBackground>
  );
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
    position: 'absolute',
  },
  NameUser: {
    fontFamily: 'Roboto',
    fontSize: 30,
    marginBottom: 20,
  },
  myPost: {
    height: 300,
    width: 344,
  },
  location: {
    marginLeft: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarUser: {
   width: 120,
    height: 120,
    borderRadius: 16,
  }
});
