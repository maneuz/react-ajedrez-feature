import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

//you can either add your firebase config directly like in the tutorial or can also add it as an 
//json string like here https://create-react-app.dev/docs/adding-custom-environment-variables/

const firebaseConfig = {
    apiKey: "AIzaSyBLFIN66DumBMnt8J4QEZWFvx-u5ZnNb7Y",
    authDomain: "react-chess-e3b6b.firebaseapp.com",
    projectId: "react-chess-e3b6b",
    storageBucket: "react-chess-e3b6b.appspot.com",
    messagingSenderId: "103457608679",
    appId: "1:103457608679:web:cd54a9c1032771cc586342",
    measurementId: "G-HWZFRQM5EP"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase