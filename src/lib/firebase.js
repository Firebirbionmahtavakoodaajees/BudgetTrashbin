//Imports
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//Variables
const firebaseConfig = {
	apiKey: "AIzaSyBeGFuH1b1t63JXlzw7sL4hWAzFrK0J_e0",
	authDomain: "budget-trashbin.firebaseapp.com",
	projectId: "budget-trashbin",
	storageBucket: "budget-trashbin.firebasestorage.app",
	messagingSenderId: "438057291439",
	appId: "1:438057291439:web:8ed3cddd4182f9d0164e5a"
};

//Functions
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
