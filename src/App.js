import React from 'react';
import { useFonts } from 'expo-font';
import { MainLoyout } from '../main';
import { Provider } from 'react-redux';
import { store } from './redux/store';

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
      <Provider store={store}>
      <MainLoyout/>
      </Provider>
      
    </>
  )
};

export default App;

