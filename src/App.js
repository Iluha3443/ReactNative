import React from 'react';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { useFonts } from 'expo-font';



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
      <RegistrationScreen/>
    </>
  
  )
}

export default App;