// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIxzHQEYI0kUnqXihcDYdyccynf76aG0k",
  authDomain: "sawa-reg.firebaseapp.com",
  projectId: "sawa-reg",
  storageBucket: "sawa-reg.appspot.com",
  messagingSenderId: "91181684518",
  appId: "1:91181684518:web:03a2e4e037a5e991e593e7",
  measurementId: "G-5X3EW2EXQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const myDb = getDatabase(app);
export const auth = getAuth(app);

// var UserID = 'mo7';
//   var data = {Name:'Ali', Date_of_birth: '11/5/1996', Weight:80 };
//   var MyPath = dataRef.ref('Users/'+UserID );
//   MyPath.set(data)
//     .then(function() {
//       console.log('succeeded');
//     })
//     .catch(function(error) {
//       console.log("failed: " + error.message);
//     });