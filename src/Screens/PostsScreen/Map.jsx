import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Map = () => {
    return (
  <View style={styles.containerMap}>
                    <MapView
                        style={styles.mapStyle}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        mapType="standard"
                        minZoomLevel={15}
                        onMapReady={() => console.log("Map is ready")}
                        onRegionChange={() => console.log("Region change")}
                    >
                        <Marker
                            title="I am here"
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            description='Hello'
                        />
                    </MapView>
                </View> 
 )
}

const styles = StyleSheet.create({
    containerMap: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    
    },
    mapStyle: {
        position: 'relative',
        width: Dimensions.get("window").width,
        height: 700,
    },
    close: {
        position: 'absolute'
    }
});