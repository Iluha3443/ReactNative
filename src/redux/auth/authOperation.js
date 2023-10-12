import { authSlice } from "./authReducer";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { app } from "../../firebase/config";
import { auth } from "../../firebase/config";
const {updateUserProfile,authStateChange,authSignOut} = authSlice.actions

export const authSignUpUser = ({ login, email, password, userImage }) => async (dispatch) => {
    try {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(auth.currentUser)
                updateProfile(auth.currentUser, {
                    displayName: login,
                    photoURL: userImage
                })
                const user = userCredential.user;
                dispatch(updateUserProfile({ userId: user.uid, userName: login, email, userImage  }));
            });
    } catch (error) {
        console.log(error)
    };
};

export const authSignInUser = ({email,password}) => async () => {
     try {
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
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.error(error);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const currentUserName = auth.currentUser.displayName;
            dispatch(updateUserProfile({ userId: user.uid, userName: currentUserName }));
            dispatch(authStateChange({ stateChange: true }));
        }
    });
}