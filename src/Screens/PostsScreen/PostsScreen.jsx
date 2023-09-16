import { Image,StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';


export const PostsScreen = () => {
    return (
        <>
           
            <View style={styles.container}>
                <View>
                    <Image style={styles.userPhoto} />
                        <Text style={styles.nameUser}>Name</Text>
                    <Text style={styles.emailUser}>Email</Text>
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
        justifyContent: 'center',
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
});