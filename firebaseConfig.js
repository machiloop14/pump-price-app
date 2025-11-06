// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj--0Rhii3F4J5NzAfTzl_RMCgoyPuxnQ",
  authDomain: "pump-price-3b9f9.firebaseapp.com",
  projectId: "pump-price-3b9f9",
  storageBucket: "pump-price-3b9f9.firebasestorage.app",
  messagingSenderId: "370661894599",
  appId: "1:370661894599:web:d3c7943212aafd338311e2",
  measurementId: "G-46MTJWBPM4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//add persistence

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
