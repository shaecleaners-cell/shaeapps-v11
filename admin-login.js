/* =====================================================
   SHAE CLEANERS
   ADMIN LOGIN
===================================================== */

import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "./firebase-admin.js";


/* =====================================================
   ELEMENT
===================================================== */

const form = document.getElementById("adminLoginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("loginMessage");


/* =====================================================
   CEK ELEMENT
===================================================== */

if (!form || !emailInput || !passwordInput || !loginBtn || !message) {

  console.error("ERROR: Element login tidak ditemukan.");

}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(text, type = "") {

  message.textContent = text;

  message.className = "login-message";

  if (type) {
    message.classList.add(type);
  }

}


/* =====================================================
   CEK SESSION FIREBASE
===================================================== */

onAuthStateChanged(auth, (user) => {

  console.log(
    "Firebase Auth:",
    user ? "LOGIN - " + user.email : "BELUM LOGIN"
  );

  if (user) {

    showMessage(
      "Session admin ditemukan. Membuka panel...",
      "success"
    );

    setTimeout(() => {

      window.location.href = "admin.html";

    }, 500);

  }

});


/* =====================================================
   LOGIN
===================================================== */

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;


  /* ===============================
     VALIDASI
  =============================== */

  if (!email) {

    showMessage(
      "Email admin wajib diisi.",
      "error"
    );

    emailInput.focus();

    return;
  }


  if (!password) {

    showMessage(
      "Password wajib diisi.",
      "error"
    );

    passwordInput.focus();

    return;
  }


  /* ===============================
     LOADING
  =============================== */

  loginBtn.disabled = true;
  loginBtn.textContent = "Memproses...";

  showMessage(
    "Memeriksa login admin...",
    "loading"
  );


  /* ===============================
     FIREBASE LOGIN
  =============================== */

  try {

    console.log(
      "Mencoba login:",
      email
    );

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


    console.log(
      "LOGIN BERHASIL:",
      result.user.email
    );


    showMessage(
      "Login berhasil. Membuka panel admin...",
      "success"
    );


    setTimeout(() => {

      window.location.href = "admin.html";

    }, 500);


  } catch (error) {

    console.error(
      "FIREBASE LOGIN ERROR:",
      error
    );


    let text = "Login gagal.";


    switch (error.code) {

      case "auth/invalid-credential":
        text = "Email atau password admin salah.";
        break;

      case "auth/invalid-email":
        text = "Format email tidak valid.";
        break;

      case "auth/user-not-found":
        text = "Akun admin tidak ditemukan.";
        break;

      case "auth/wrong-password":
        text = "Password admin salah.";
        break;

      case "auth/user-disabled":
        text = "Akun admin dinonaktifkan.";
        break;

      case "auth/too-many-requests":
        text = "Terlalu banyak percobaan. Coba lagi nanti.";
        break;

      case "auth/network-request-failed":
        text = "Koneksi internet bermasalah.";
        break;

      case "auth/operation-not-allowed":
        text =
          "Login Email/Password belum diaktifkan di Firebase.";
        break;

      default:
        text =
          "Login gagal: " +
          (error.code || error.message);
    }


    showMessage(
      text,
      "error"
    );


    loginBtn.disabled = false;
    loginBtn.textContent = "Masuk Admin";

  }

});