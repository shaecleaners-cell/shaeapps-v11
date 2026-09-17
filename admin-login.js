/* =====================================================
   SHAE CLEANERS
   ADMIN LOGIN
   FIREBASE AUTH
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

if (
  !form ||
  !emailInput ||
  !passwordInput ||
  !loginBtn ||
  !message
) {

  console.error(
    "Element login admin tidak lengkap."
  );

}


/* =====================================================
   CEK SESSION FIREBASE
===================================================== */

onAuthStateChanged(auth, (user) => {

  console.log(
    "Status Firebase Auth:",
    user ? user.email : "Belum login"
  );


  if (user) {

    showMessage(
      "Login sudah aktif. Membuka panel admin...",
      "success"
    );


    setTimeout(() => {

      window.location.replace(
        "admin.html"
      );

    }, 300);

  }

});


/* =====================================================
   LOGIN
===================================================== */

form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;


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
       BUTTON LOADING
    =============================== */

    loginBtn.disabled = true;

    loginBtn.textContent =
      "Memproses...";


    showMessage(
      "Memeriksa akun admin...",
      "loading"
    );


    try {

      console.log(
        "Mencoba login:",
        email
      );


      /* ===============================
         FIREBASE LOGIN
      =============================== */

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


      /*
        Tunggu Firebase memastikan
        session sudah aktif.
      */

      setTimeout(() => {

        window.location.replace(
          "admin.html"
        );

      }, 500);


    } catch (error) {

      console.error(
        "FIREBASE LOGIN ERROR:",
        error
      );


      let text =
        "Login gagal.";


      switch (error.code) {

        case "auth/invalid-credential":

          text =
            "Email atau password admin salah.";

          break;


        case "auth/invalid-email":

          text =
            "Format email tidak valid.";

          break;


        case "auth/user-not-found":

          text =
            "Akun admin tidak ditemukan di Firebase.";

          break;


        case "auth/wrong-password":

          text =
            "Password admin salah.";

          break;


        case "auth/too-many-requests":

          text =
            "Terlalu banyak percobaan login. Coba beberapa saat lagi.";

          break;


        case "auth/user-disabled":

          text =
            "Akun admin dinonaktifkan.";

          break;


        case "auth/network-request-failed":

          text =
            "Koneksi internet bermasalah.";

          break;


        case "auth/operation-not-allowed":

          text =
            "Login Email/Password belum diaktifkan di Firebase Authentication.";

          break;


        default:

          text =
            "Login gagal: " +
            (error.code || error.message);

          break;

      }


      showMessage(
        text,
        "error"
      );


      /*
        Jangan kosongkan email/password.
        User bisa langsung memperbaiki
        data yang salah.
      */

      loginBtn.disabled = false;

      loginBtn.textContent =
        "Masuk Admin";

    }

  }
);


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(
  text,
  type
) {

  if (!message) {
    return;
  }


  message.textContent =
    text;


  message.className =
    "login-message";


  if (type) {

    message.classList.add(
      type
    );

  }

}