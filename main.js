import { useRoute } from "./src/route";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store } from "./src/redux/store";

 export const MainLoyout = () => {
  const isLogin = false
  const routing = useRoute(isLogin);
   return (
     <Provider store={store}>
       <NavigationContainer >{routing}</NavigationContainer>
     </Provider>
    
  );
};