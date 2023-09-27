import React from "react";
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostsScreen } from "./DefaultPosts";
import { Comments } from "../MapAndComment/Comments";
import { Map } from "../MapAndComment/Map";
import { AntDesign } from '@expo/vector-icons'; 
import LogoutRight from "../Image/log-out-right-mypost.png";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";

const NestedScreen = createStackNavigator();


export const PostsScreen = () => {
  const dispatch = useDispatch();

return( 
    <NestedScreen.Navigator>
        <NestedScreen.Screen
            name="DefaultPosts"
            component={DefaultPostsScreen}
            options={({ navigation }) => ({
    headerTitle: () => {
      
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 200 }}
            onPress={() => dispatch(authSignOutUser())}
          >
            <Image source={LogoutRight} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Публікації</Text>
        </View>
      );
    },
  }) }
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
            onPress={() => navigation.navigate("DefaultPosts")}
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
            onPress={() => navigation.navigate("DefaultPosts")}
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