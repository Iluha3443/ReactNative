import { app } from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { authSlice } from "./authReducer";
import { store } from "../store";

const {updateUserProfile,authStateChange,authSignOut} = authSlice.actions

export const authSignUpUser = ({ login, email, password }) => async (dispatch) => {
    try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: login,
                })
                const user = userCredential.user;
                dispatch(updateUserProfile({ userId: user.uid, userName: NameUser }));
            });

    } catch (error) {
        console.log(error)
    };
};

export const authSignInUser = ({email,password}) => async () => {
     try {
    
       const auth = getAuth();
   signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
      
    authStateChangeUser(user)
      const user = userCredential.user;
  })

    } catch (error) {
        console.log(error)
    };
}

export const authSignOutUser = async (dispatch) => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            dispatch(authSignOut())
            const current = store.getState();
            console.log("currrent", current)
        })
        .catch((error) => {
        });
};

export const authStateChangeUser = () => async (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
            const currentUserName = auth.currentUser.displayName;
            
            dispatch(updateUserProfile({ userId: user.uid, userName: currentUserName }));
            dispatch(authStateChange({ stateChange: true }));
            const current = store.getState();
            console.log("currrentstate", current)
        }
    });
}
