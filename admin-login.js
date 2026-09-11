import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from ".https://shaeapps.wap.sh/firebase-admin.js";


const form =
  document.getElementById(
    "adminLoginForm"
  );

const emailInput =
  document.getElementById(
    "email"
  );

const passwordInput =
  document.getElementById(
    "password"
  );

const loginBtn =
  document.getElementById(
    "loginBtn"
  );

const message =
  document.getElementById(
    "loginMessage"
  );


/* =====================================================
   CEK LOGIN

   Kalau sudah login,
   langsung ke admin.html
===================================================== */

onAuthStateChanged(
  auth,
  user => {

    if (user) {

      window.location.href =
        "admin.html";

    }

  }
);


/* =====================================================
   LOGIN
===================================================== */

form.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;


    if (!email || !password) {

      showMessage(
        "Email dan password wajib diisi.",
        "error"
      );

      return;

    }


    loginBtn.disabled = true;

    loginBtn.textContent =
      "Memproses...";


    showMessage(
      "",
      ""
    );


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      showMessage(
        "Login berhasil...",
        "success"
      );


      setTimeout(
        () => {

          window.location.href =
            "admin.html";

        },
        500
      );


    } catch (error) {

      console.error(
        "Login admin:",
        error
      );


      let text =
        "Email atau password salah.";


      if (
        error.code ===
        "auth/invalid-credential"
      ) {

        text =
          "Email atau password admin salah.";

      }


      if (
        error.code ===
        "auth/user-not-found"
      ) {

        text =
          "Akun admin tidak ditemukan.";

      }


      if (
        error.code ===
        "auth/too-many-requests"
      ) {

        text =
          "Terlalu banyak percobaan. Coba lagi nanti.";

      }


      showMessage(
        text,
        "error"
      );


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

  message.textContent =
    text;

  message.className =
    "login-message " +
    (type || "");

}