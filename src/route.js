import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./Screens/PostsScreen/PostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen/ProfileScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { Home } from "./Screens/Home/Home";
import { TouchableOpacity, View, Text, Image } from "react-native";
import ArrowLeftImage from "./Screens/Image/arrow-left.png"


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
      screenOptions={{
        tabBarShowLabel: false,
        // headerLeftContainerStyle: { paddingRight: 16 },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
        name="Posts"
        component={Home}
      />
      <MainTab.Screen
        name="Create"
        options={{
         
          // headerShown: false,
          // headerLeft: ({ focused, size, color }) => (
          //   <AntDesign name="arrowleft" size={24} color={color} />
          // ),
          // tabBarStyle: { display: "none" },
          // tabBarIcon: ({ focused, size, color }) => (
          //   <ButtonsCreatePublication
          //     name="postage-stamp"
          //     size={size}
          //     color={color}
          //     onPress={() => navigate("Posts")}
          //   />
          // ),
        }}
        component={PostsScreen}
      />
    <MainTab.Screen
  name="Profile"
  options={({ navigation }) => ({
    headerTitleAlign: "center",
    headerTitle: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ position: 'absolute', right: 245 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={ArrowLeftImage} style={{ width: 24, height: 24,   }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold",  }}>
          Створити публікацію
        </Text>
      </View>
    ),
  })}
  component={ProfileScreen}
/>
    </MainTab.Navigator>
  );
};