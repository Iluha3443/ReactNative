import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAKKoG8uDIwjAIEd76uS3pT8np2zGyeW30",
  authDomain: "react-native-project-1abe6.firebaseapp.com",
  projectId: "react-native-project-1abe6",
  storageBucket: "react-native-project-1abe6.appspot.com",
  messagingSenderId: "370382724450",
  appId: "1:370382724450:web:ed084c6ca71d551d1aa03b",
  measurementId: "G-SPPNK4LBM0"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    
  })
  .catch((error) => {
    
  });

// const analytics = getAnalytics(app);
// import { getAnalytics } from "firebase/analytics";