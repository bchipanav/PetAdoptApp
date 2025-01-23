// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: "pet-adopt-983eb.firebaseapp.com",
	projectId: "pet-adopt-983eb",
	storageBucket: "pet-adopt-983eb.appspot.com",
	messagingSenderId: "608340388040",
	appId: "1:608340388040:web:dc352666db335ec5c29dfd",
	measurementId: "G-9X68VVM7G1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
