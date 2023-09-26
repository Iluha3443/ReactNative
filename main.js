import { useRoute } from "./src/route";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch,useSelector } from 'react-redux';
import { authStateChangeUser } from "./src/redux/auth/authOperation";


export const MainLoyout = () => {
  const { stateChange } = useSelector(state => state.auth);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(authStateChangeUser())
  }, [])
    
  const routing = useRoute(stateChange);
          
  return <NavigationContainer >{routing}</NavigationContainer>
  
}