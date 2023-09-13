import React from 'react';
import { ProfileScreen  } from './Screens/ProfileScreen/ProfileScreen';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import {PostsScreen} from "./Screens/PostsScreen/PostsScreen.jsx"
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import { Home } from './Screens/Home/Home';
import { MainContainer } from './MainContainer';

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
        <MainStack.Navigator initialRouteName="container">
          <MainStack.Screen name="container" component={MainContainer} options={{ headerShown: false,}}/>
          <MainStack.Screen name="PostsScreen" component={PostsScreen} options={{headerShown: false, }}/>
          <MainStack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
          <MainStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false, }}/>
          <MainStack.Screen  name="Registration" component={RegistrationScreen} options={{ headerShown: false, }} />
          <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false,  }}/>
      </MainStack.Navigator>
      </NavigationContainer>   
    </>
  )
};

export default App;