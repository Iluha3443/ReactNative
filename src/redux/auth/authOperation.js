import { app } from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export const authSignUpUser = ({login,email,password}) => async (dispatch, getSatte) => {
    try {
       
        const auth = getAuth();
       createUserWithEmailAndPassword(auth,email,password)
       .then((userCredential) => {
    
           const user = userCredential.user;
           console.log(user)
    
  })

    } catch (error) {
        console.log(error)
    }
}

export const authSignInUser = async () => {
    
}

export const authSignOutUser = async () => {
    
}