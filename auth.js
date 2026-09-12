/* =====================================================
   SHAE CLEANERS
   CUSTOMER LOGIN & REGISTER
   SIMPLE - TANPA FIREBASE
===================================================== */

const USERS_KEY = "shae_customers";
const LOGIN_KEY = "shae_customer_login";


/* =====================================================
   AMBIL DATA CUSTOMER
===================================================== */

function getCustomers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (error) {
    return [];
  }
}


/* =====================================================
   SIMPAN DATA CUSTOMER
===================================================== */

function saveCustomers(customers) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(customers)
  );
}


/* =====================================================
   REGISTER
===================================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const name =
      document.getElementById("registerName").value.trim();

    const phone =
      document.getElementById("registerPhone").value.trim();

    const email =
      document.getElementById("registerEmail").value
        .trim()
        .toLowerCase();

    const password =
      document.getElementById("registerPassword").value;

    const message =
      document.getElementById("registerMessage");


    if (password.length < 6) {

      message.textContent =
        "Password minimal 6 karakter.";

      message.style.color = "#dc2626";

      return;
    }


    const customers = getCustomers();


    const alreadyExists = customers.some(
      user => user.email === email
    );


    if (alreadyExists) {

      message.textContent =
        "Email sudah terdaftar.";

      message.style.color = "#dc2626";

      return;
    }


    const customer = {

      id:
        "CUS-" +
        Date.now(),

      name: name,

      phone: phone,

      email: email,

      password: password,

      createdAt:
        new Date().toISOString()

    };


    customers.push(customer);

    saveCustomers(customers);


    /* SIMPAN PROFILE */

    localStorage.setItem(
      "shae_profile",
      JSON.stringify({
        name: name,
        phone: phone,
        email: email
      })
    );


    message.textContent =
      "Pendaftaran berhasil. Mengarahkan ke login...";

    message.style.color = "#16a34a";


    setTimeout(function() {

      window.location.href = "login.html";

    }, 1000);

  });

}


/* =====================================================
   LOGIN
===================================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const email =
      document.getElementById("loginEmail").value
        .trim()
        .toLowerCase();

    const password =
      document.getElementById("loginPassword").value;

    const message =
      document.getElementById("loginMessage");


    const customers = getCustomers();


    const customer = customers.find(
      user =>
        user.email === email &&
        user.password === password
    );


    if (!customer) {

      message.textContent =
        "Email atau password salah.";

      message.style.color = "#dc2626";

      return;
    }


    /* SIMPAN LOGIN */

    localStorage.setItem(
      LOGIN_KEY,
      JSON.stringify({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email
      })
    );


    /* SIMPAN PROFILE */

    localStorage.setItem(
      "shae_profile",
      JSON.stringify({
        name: customer.name,
        phone: customer.phone,
        email: customer.email
      })
    );


    message.textContent =
      "Login berhasil...";

    message.style.color = "#16a34a";


    setTimeout(function() {

      window.location.href = "index.html";

    }, 700);

  });

}


/* =====================================================
   FUNGSI CEK CUSTOMER LOGIN
===================================================== */

function getCustomerLogin() {

  try {

    return JSON.parse(
      localStorage.getItem(LOGIN_KEY)
    );

  } catch (error) {

    return null;

  }

}


/* =====================================================
   LOGOUT
===================================================== */

function customerLogout() {

  localStorage.removeItem(LOGIN_KEY);

  window.location.href = "index.html";

}


/* =====================================================
   EXPORT GLOBAL
===================================================== */

window.getCustomerLogin =
  getCustomerLogin;

window.customerLogout =
  customerLogout;