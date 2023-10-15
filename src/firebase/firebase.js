import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChnRLxNVa0xAFaL3WMC4yX8p5cGmKD80w",
  authDomain: "kwiki-c71f8.firebaseapp.com",
  projectId: "kwiki-c71f8",
  storageBucket: "kwiki-c71f8.appspot.com",
  messagingSenderId: "471452814679",
  appId: "1:471452814679:web:eef8015474d2819a198212",
};

//   initialize app
const app = initializeApp(firebaseConfig);

// initialize authentication
export const auth = getAuth(app);

// initialize firestore database
export const db = getFirestore(app);
