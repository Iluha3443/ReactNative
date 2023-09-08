import React from 'react';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';

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
      <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen name="Registration" component={RegistrationScreen} />
          <MainStack.Screen name="Login" component={LoginScreen} />
      </MainStack.Navigator>
      
    
      </NavigationContainer>
      
    </>
  
  )
}

export default App;