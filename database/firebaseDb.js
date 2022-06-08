
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAJCLvjfmatgPGeXuYY-bgL-Kl6Aq57vvU",
    authDomain: "crud-reactnative-aafa1.firebaseapp.com",
    projectId: "crud-reactnative-aafa1",
    storageBucket: "crud-reactnative-aafa1.appspot.com",
    messagingSenderId: "1030991041241",
    appId: "1:1030991041241:web:9c081b800ac0c72dbf24c8",
    measurementId: "G-L12W5V2574"
  };

  
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;