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
import { useRoute } from "./route";
import Feather from 'react-native-vector-icons/Feather';


const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const routing = useRoute(true);
  return (
    <NavigationContainer >{routing}</NavigationContainer>
  );
};

const MainStack = createStackNavigator();

const profileScreenOptions = {
  headerTitle: 'Ваш заголовок тут',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerLeft: ({ onPress }) => (
    <TouchableOpacity style={{ marginLeft: 16 }} onPress={onPress}>
      <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
    </TouchableOpacity>
  ),
};

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
        <MainStack.Navigator initialRouteName="container" >
          <MainStack.Screen name="container" component={MainContainer} options={{ headerShown: false, }} />
          <MainStack.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false, }} />
          <MainStack.Screen name="Home" component={Home} options={{ headerShown: false, }} />
          <MainStack.Screen name="ProfileScreen" component={ProfileScreen}  />
          <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false, }} />
          <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  )
};

export default App;

