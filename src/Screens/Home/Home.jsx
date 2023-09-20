import React from "react";
import { Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultHome } from "./HomeDefaultScreen";
import { Comments } from "./Comments";
import { Map } from "./Map";
import { AntDesign } from '@expo/vector-icons'; 

const NestedScreen = createStackNavigator();

export const Home = () => {
return( 
    <NestedScreen.Navigator>
        <NestedScreen.Screen
            name="DefaultHome"
            component={DefaultHome}
            options={ {headerShown: false,} }
        />
          <NestedScreen.Screen
            name="Map"
            component={Map}
          options={({ navigation }) => ({
    headerTitleAlign: "center",
    headerTitle: () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ position: 'absolute', right: 180 }}
            onPress={() => navigation.goBack()}
          >
           <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold", }}>
            Мапа
          </Text>
        </View>
      );
    },
    headerLeft: () => null,
  })}
/> 
         <NestedScreen.Screen
  name="Comments"
  component={Comments}
  options={({ navigation }) => ({
    headerTitleAlign: "center",
    headerTitle: () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ position: 'absolute', right: 195 }}
            onPress={() => navigation.goBack()}
          >
           <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold", }}>
            Коментарі
          </Text>
        </View>
      );
    },
    headerLeft: () => null,
  })}
/> 
 </NestedScreen.Navigator>
)
}