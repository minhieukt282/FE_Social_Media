// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoz5m4k5nK6YtTPHePD84ie0u2A5M2TBs",
    authDomain: "blog-17-21-20-12.firebaseapp.com",
    projectId: "blog-17-21-20-12",
    storageBucket: "blog-17-21-20-12.appspot.com",
    messagingSenderId: "1020842291674",
    appId: "1:1020842291674:web:5f975ef45f2c4d4470d0e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)