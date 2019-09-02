import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDBV00Eft02bGgqHCLZv6Nb0N8kiohOdVY",
    authDomain: "mylinkedin-61579.firebaseapp.com",
    databaseURL: "https://mylinkedin-61579.firebaseio.com",
    projectId: "mylinkedin-61579",
    storageBucket: "mylinkedin-61579.appspot.com",
    messagingSenderId: "820894638648",
    appId: "1:820894638648:web:34189952c11ad08e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
