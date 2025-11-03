import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr18FxXxKjNBjz9aD8fISxecFkey123Z4",
  authDomain: "laporan-keluhan.firebaseapp.com",
  projectId: "laporan-keluhan",
  storageBucket: "laporan-keluhan.firebasestorage.app",
//   messagingSenderId: "1041398025261",
  appId: "1:1041398025261:web:095da4290f6f1b244e3ca4",
//   measurementId: "G-9DV1D7PK7N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const userCollection = collection(db, 'users');

export {auth, db, userCollection}

export default app;