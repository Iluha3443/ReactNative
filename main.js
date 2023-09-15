import { useRoute } from "./src/route";
import { NavigationContainer } from "@react-navigation/native";

 export const MainLoyout = () => {
  const isLogin = true
  const routing = useRoute(isLogin);
  return (
    <NavigationContainer >{routing}</NavigationContainer>
  );
};