import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "@firebase/storage";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const storage = getStorage();