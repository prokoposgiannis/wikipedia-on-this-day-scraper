import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKogQXuPGvPikPFiDhByRAXnKz9NCuCHs",
  authDomain: "sans-ce-marat.firebaseapp.com",
  projectId: "sans-ce-marat",
  storageBucket: "sans-ce-marat.appspot.com",
  messagingSenderId: "916341505037",
  appId: "1:916341505037:web:f3094ecbcf439375a6a944",
  measurementId: "G-JC3EVQ7FLF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {setDoc, doc, db}
