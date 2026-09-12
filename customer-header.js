/* =====================================================
   SHAE CLEANERS
   CUSTOMER HEADER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const guestMenu =
    document.getElementById("guestMenu");

  const userMenu =
    document.getElementById("userMenu");

  const customerName =
    document.getElementById("customerName");

  const userButton =
    document.getElementById("userButton");

  const userDropdown =
    document.getElementById("userDropdown");

  const logoutButton =
    document.getElementById("logoutButton");


  /* =========================
     CEK LOGIN
  ========================= */

  let customer = null;

  try {

    customer = JSON.parse(
      localStorage.getItem(
        "shae_customer_login"
      )
    );

  } catch (error) {

    customer = null;

  }


  /* =========================
     TAMPILAN HEADER
  ========================= */

  if (customer && customer.name) {

    if (guestMenu) {
      guestMenu.style.display = "none";
    }

    if (userMenu) {
      userMenu.style.display = "block";
    }

    if (customerName) {
      customerName.textContent =
        customer.name;
    }

  } else {

    if (guestMenu) {
      guestMenu.style.display = "flex";
    }

    if (userMenu) {
      userMenu.style.display = "none";
    }

  }


  /* =========================
     DROPDOWN
  ========================= */

  if (userButton && userDropdown) {

    userButton.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        userDropdown.classList.toggle("show");

      }
    );


    document.addEventListener(
      "click",
      function () {

        userDropdown.classList.remove("show");

      }
    );

  }


  /* =========================
     LOGOUT
  ========================= */

  if (logoutButton) {

    logoutButton.addEventListener(
      "click",
      function () {

        localStorage.removeItem(
          "shae_customer_login"
        );

        localStorage.removeItem(
          "shae_profile"
        );

        window.location.href =
          "index.html";

      }
    );

  }

});