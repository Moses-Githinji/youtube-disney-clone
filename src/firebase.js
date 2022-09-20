import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB7IHP5eLjPg1LV9oNC8bF_E_7w5RxvFh0",
    authDomain: "disneyplus-clone-df3ce.firebaseapp.com",
    projectId: "disneyplus-clone-df3ce",
    storageBucket: "disneyplus-clone-df3ce.appspot.com",
    messagingSenderId: "910464208971",
    appId: "1:910464208971:web:a5f749614b2ed934a7bdce",
    measurementId: "G-7E4586GR8D"
};

const firebaseApp = initializeApp(firebaseConfig); // initiailize our firebase app
const db = getFirestore(firebaseApp); // connect to the database
const auth = getAuth(firebaseApp); // enable authentication
const provider = new GoogleAuthProvider(); // gives us the auto sign-in pop up box when we need to sign a user in
const storage = getStorage(firebaseApp); // we'll use this for storing data in the database

export { auth, provider, storage };
export default db;