import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigation } from '@react-navigation/stack';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { PostsScreen } from './PostsScreen';

const Stack = createStackNavigation();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={RegistrationScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />
        {/* Добавьте другие экраны, если необходимо */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;