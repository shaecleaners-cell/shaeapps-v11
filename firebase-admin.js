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
  apiKey: "AIzaSyDJuYtGMSCNe4eSNo6T5MNNEJcdYW46X1s",
  authDomain: "shae-cleaners.firebaseapp.com",
  projectId: "shae-cleaners",
  storageBucket: "shae-cleaners.firebasestorage.app",
  messagingSenderId: "886460432923",
  appId: "1:839960858623:web:1aa97b91f54924cd10e1ca"
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