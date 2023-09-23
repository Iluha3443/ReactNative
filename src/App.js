import React from 'react';
import { useFonts } from 'expo-font';
import { MainLoyout } from '../main';



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
      <MainLoyout/>
    </>
  )
};

export default App;

