import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDgw5kEKauasJD_kQCWoDYXWx5ULM5UhHY",
  authDomain: "music-ebc19.firebaseapp.com",
  projectId: "music-ebc19",
  storageBucket: "music-ebc19.appspot.com",
  messagingSenderId: "297674408168",
  appId: "1:297674408168:web:d55379dbecc4c39a17c95d"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, storage}

export default app;