/* =========================================
   SHAE CLEANERS
   AKUN.JS
========================================= */


/* =========================================
   ELEMENT
========================================= */

const namaInput =
  document.getElementById("nama");

const teleponInput =
  document.getElementById("telepon");

const alamatInput =
  document.getElementById("alamat");

const displayNama =
  document.getElementById("displayNama");

const displayTelepon =
  document.getElementById("displayTelepon");

const avatar =
  document.getElementById("avatar");

const jumlahPesanan =
  document.getElementById("jumlahPesanan");

const totalBelanja =
  document.getElementById("totalBelanja");


/* =========================================
   FORMAT RUPIAH
========================================= */

function rupiah(number) {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  ).format(Number(number) || 0);

}


/* =========================================
   LOAD PROFILE
========================================= */

function loadProfile() {

  const profile =
    JSON.parse(
      localStorage.getItem("shae_profile") || "{}"
    );


  if (profile.nama) {

    namaInput.value =
      profile.nama;

    displayNama.textContent =
      profile.nama;

    avatar.textContent =
      profile.nama
        .charAt(0)
        .toUpperCase();

  }


  if (profile.telepon) {

    teleponInput.value =
      profile.telepon;

    displayTelepon.textContent =
      profile.telepon;

  }


  if (profile.alamat) {

    alamatInput.value =
      profile.alamat;

  }

}


/* =========================================
   SIMPAN PROFILE
========================================= */

function simpanProfil() {

  const nama =
    namaInput.value.trim();

  const telepon =
    teleponInput.value.trim();

  const alamat =
    alamatInput.value.trim();


  if (!nama) {

    alert("Silakan isi nama.");

    namaInput.focus();

    return;

  }


  const profile = {

    nama: nama,

    telepon: telepon,

    alamat: alamat

  };


  localStorage.setItem(
    "shae_profile",
    JSON.stringify(profile)
  );


  displayNama.textContent =
    nama;

  displayTelepon.textContent =
    telepon ||
    "Belum ada nomor WhatsApp";

  avatar.textContent =
    nama
      .charAt(0)
      .toUpperCase();


  alert("Profil berhasil disimpan.");

}


/* =========================================
   STATISTIK
========================================= */

function loadStats() {

  const orders =
    JSON.parse(
      localStorage.getItem("shae_orders") || "[]"
    );


  jumlahPesanan.textContent =
    orders.length;


  const total =
    orders.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );


  totalBelanja.textContent =
    rupiah(total);

}


/* =========================================
   NAVIGATION
========================================= */

function goHome() {

  window.location.href =
    "index.html";

}


function goOrders() {

  window.location.href =
    "pesanan.html";

}


function goPromo() {

  window.location.href =
    "promo.html";

}


function goOrder() {

  window.location.href =
    "order.html";

}


/* =========================================
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadProfile();

    loadStats();

  }
);
