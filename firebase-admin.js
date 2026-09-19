import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =====================================================
   FIREBASE CONFIG
===================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyDPUFuYlCaMg1yUE3dm9KWWXSC5T9jotwI",
  authDomain: "https://shae-cleaners-534d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shae-cleaners-534d1",
  storageBucket: "shae-cleaners-534d1.firebasestorage.app",
  messagingSenderId: "705887888327",
  appId: "1:705887888327:android:c425d5dc8fac993c8eafe2"
};


/* =====================================================
   INITIALIZE
===================================================== */

const app =
  initializeApp(firebaseConfig);


/* =====================================================
   AUTH
===================================================== */

export const auth =
  getAuth(app);


/* =====================================================
   FIRESTORE
===================================================== */

export const db =
  getFirestore(app);


/* =====================================================
   EXPORT
===================================================== */

export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,

  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp
};