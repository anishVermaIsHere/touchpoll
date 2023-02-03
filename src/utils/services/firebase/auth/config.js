// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getStorage,ref } from "firebase/storage";
import { getAuth } from "firebase/auth";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLY7KkNUQ5hGsKn5TBNVi5kG5hx9MIrx4",
  authDomain: "poll-survey.firebaseapp.com",
  projectId: "poll-survey",
  storageBucket: "poll-survey.appspot.com",
  messagingSenderId: "657719749697",
  appId: "1:657719749697:web:726208a91066a55e38aac0",
  measurementId: "G-YC0WRM6GFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
