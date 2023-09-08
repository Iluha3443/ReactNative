import React from 'react';
import { CreatePostsScreen } from './Screens/CreatePostsScreen/CreatePostsScreen';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import { Home } from './Screens/Home/Home';

const MainStack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    "Roboto": require('./Assets/Roboto/Roboto-Medium.ttf'),
    "Roboto": require('./Assets/Roboto/Roboto-Regular.ttf'),
  });

   if (!fontsLoaded) {
    return null;
  }
  
  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="CreatePostsScreen">
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
          <MainStack.Screen name="Registration" component={RegistrationScreen} />
          <MainStack.Screen name="Login" component={LoginScreen} />
      </MainStack.Navigator>
      </NavigationContainer>
      
    </>
  )
}

export default App;