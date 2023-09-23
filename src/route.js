import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./Screens/PostsScreen/PostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen/ProfileScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { Home } from "./Screens/Home/Home";
import { TouchableOpacity, View, Text, Image } from "react-native";
import ArrowLeftImage from "./Screens/Image/arrow-left.png";
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === 'Profile') {
            icon = focused ? (
              <View style={{ backgroundColor: "#FF6C00", padding: 8, borderRadius: 20 , width: 74, alignItems: 'center', marginTop: 5}}>
                <Text>
                  <AntDesign name="plus" size={30} color="white" />
                </Text>
              </View>
            ) : (
              <AntDesign name="plus" size={30} color="black" />
            );
      
          } else if (route.name === 'Home') {
            icon = focused ? (
              <View style={{ backgroundColor: "#FF6C00", padding: 8, borderRadius: 20 , width: 74, alignItems: 'center', marginTop: 5}}>
                <Text>
                  <AntDesign name="user" size={30} color="white" />
                </Text>
              </View>
            ) : (
              <AntDesign name="user" size={30} color="black" />
            );
          } else if (route.name === 'Posts') {
            icon = focused ? (
              <View style={{ backgroundColor: "#FF6C00", padding: 8, borderRadius: 20 , width: 74, alignItems: 'center', marginTop: 5}}>
                <Text>
                  <Entypo name="grid" size={30} color="white" />
                </Text>
              </View>
            ) : (
              <Entypo name="grid" size={30} color="black" />
            );
          }
          return icon;
        },
      })}
>
      <MainTab.Screen
        options={{
         headerShown: false, 
        }}
        name="Posts"
        component={Home}
      />
      <MainTab.Screen
  name="Profile"
  options={({ navigation }) => ({
    headerTitleAlign: "center",
    headerTitle: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ position: 'absolute', right: 245 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={ArrowLeftImage} style={{ width: 24, height: 24,   }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold",}}>
          Створити публікацію
        </Text>
      </View>
    ),
  })}
  component={ProfileScreen} />
    <MainTab.Screen
        name="Home"
         component={PostsScreen}
   options={{
            headerShown: false,
          }}
      />
  
    </MainTab.Navigator>
  );
};