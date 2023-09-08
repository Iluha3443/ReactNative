import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import BackgroundImg from "../Image/bgImage.jpg";

export const Home = () => {
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
                    <View>
                    <Image
                  source={require('../Image/log-out.png')}
                  style={styles.logoutIcon}
                        />
                    </View>
                    <Text style={styles.NameUser}>Name</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: 450
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
    logoutIcon: {
    bottom: 82,
    right: -182,
    position: 'absolute'
    },
    NameUser: {
        fontFamily: 'Roboto',
        fontSize: 30,
    }
})