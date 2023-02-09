// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getStorage,ref } from "firebase/storage";
import { getAuth } from "firebase/auth";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-l0teCwPfUNycM_z7ekqNDSygeiyL6Uk",
  authDomain: "touch-poll.firebaseapp.com",
  projectId: "touch-poll",
  storageBucket: "touch-poll.appspot.com",
  messagingSenderId: "613317763217",
  appId: "1:613317763217:web:8288532ecf49b9621a1f30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
