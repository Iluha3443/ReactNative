import { authSlice } from "./authReducer";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { app } from "../../firebase/config";
const {updateUserProfile,authStateChange,authSignOut} = authSlice.actions

export const authSignUpUser = ({ login, email, password }) => async (dispatch) => {
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(email)
                updateProfile(auth.currentUser, {
                    displayName: login,
                })
                const user = userCredential.user;
                dispatch(updateUserProfile({ userId: user.uid, userName: login, email }));
            });

    } catch (error) {
        console.log(error)
    };
};



export const authSignInUser = ({email,password}) => async () => {
     try {
    
       const auth = getAuth();
 await signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
      
    authStateChangeUser(user)
      const user = userCredential.user;
  })

    } catch (error) {
        console.log(error)
    };
}

export const authSignOutUser = () => async (dispatch) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.error(error);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
            const currentUserName = auth.currentUser.displayName;
            
            dispatch(updateUserProfile({ userId: user.uid, userName: currentUserName }));
            dispatch(authStateChange({ stateChange: true }));
           
        }
    });
}
