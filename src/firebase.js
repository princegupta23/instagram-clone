import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAQ93CL5AVknOOJ44zJFHia40ry3tctJ4g",
    authDomain: "instagram-clone-dc558.firebaseapp.com",
    projectId: "instagram-clone-dc558",
    storageBucket: "instagram-clone-dc558.appspot.com",
    messagingSenderId: "696906816562",
    appId: "1:696906816562:web:6c1ac4e0088f397458f02b",
    measurementId: "G-1X6TT482HH"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

export { db, auth, storage, firebase };