/* =========================================
   SHAE CLEANERS
   ORDER.JS
   SIMPLE & STABLE
========================================= */
/* =====================================================
   TAMBAHAN FIREBASE
   Letakkan di PALING ATAS order.js
===================================================== */

import {
  db,
  collection,
  addDoc,
  serverTimestamp
} from "./firebase-admin.js";


/* =====================================================
   FUNGSI KIRIM PESANAN KE FIRESTORE
===================================================== */

async function simpanOrderOnline(order) {

  try {

    await addDoc(
      collection(db, "orders"),
      {
        orderId: order.id,

        service: order.service || "",

        package: order.package || "",

        qty: Number(order.qty) || 1,

        price: Number(order.price) || 0,

        total: Number(order.total) || 0,

        date: order.date || "",

        time: order.time || "",

        name: order.name || "",

        phone: order.phone || "",

        address: order.address || "",

        note: order.note || "",

        status:
          order.status ||
          "Menunggu Konfirmasi",

        createdAt:
          serverTimestamp()

      }
    );


    console.log(
      "Pesanan berhasil masuk Firebase"
    );

    return true;

  } catch (error) {

    console.error(
      "Firebase gagal:",
      error
    );

    return false;

  }

}


/* =========================================
   DATA HARGA
========================================= */

const PRICE_LIST = {

  "Sofa": [
    {
      name: "Sofa Standard 1 Seater",
      price: 50000
    },
    {
      name: "Sofa Lepasan 1 Seater",
      price: 75000
    },
    {
      name: "Sofa Besar 1 Seater",
      price: 75000
    },
    {
      name: "Sofa L Standard",
      price: 250000
    },
    {
      name: "Sofa L Big",
      price: 300000
    },
    {
      name: "Sofa U",
      price: 350000
    }
  ],


  "Kasur": [
    {
      name: "Mini Single",
      price: 150000
    },
    {
      name: "Single",
      price: 180000
    },
    {
      name: "Queen",
      price: 270000
    },
    {
      name: "King",
      price: 290000
    },
    {
      name: "Super King",
      price: 310000
    }
  ],


  "Jok Mobil": [
    {
      name: "Jok Mobil 2 Baris",
      price: 250000
    },
    {
      name: "Interior Mobil 2 Baris",
      price: 400000
    },
    {
      name: "Jok Mobil 3 Baris",
      price: 350000
    }
  ],


  "Karpet": [
    {
      name: "Karpet / m²",
      price: 13000
    }
  ],


  "Kursi": [
    {
      name: "Kursi Makan Small",
      price: 30000
    },
    {
      name: "Kursi Makan Standard",
      price: 35000
    },
    {
      name: "Kursi Kantor Small",
      price: 30000
    },
    {
      name: "Kursi Kantor Big",
      price: 40000
    }
  ],


  "Gorden": [
    {
      name: "Gorden",
      price: 25000
    }
  ],


  "AC": [
    {
      name: "AC Split",
      price: 75000
    }
  ],


  "Home Cleaning": [
    {
      name: "Home Cleaning",
      price: 150000
    }
  ]

};


/* =========================================
   ELEMENT
========================================= */

const layanan =
  document.getElementById("layanan");

const paket =
  document.getElementById("paket");

const qtyElement =
  document.getElementById("qty");

const totalElement =
  document.getElementById("total");

const tanggal =
  document.getElementById("tanggal");


let qty = 1;


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
  ).format(number);

}


/* =========================================
   TANGGAL MINIMUM
========================================= */

function setTanggalMinimum() {

  if (!tanggal) return;

  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(today.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(today.getDate())
      .padStart(2, "0");

  tanggal.min =
    `${year}-${month}-${day}`;

}


/* =========================================
   ISI LAYANAN
========================================= */

function loadServices() {

  if (!layanan) return;

  layanan.innerHTML =
    `<option value="">Pilih layanan</option>`;

  Object.keys(PRICE_LIST)
    .forEach(service => {

      const option =
        document.createElement("option");

      option.value = service;
      option.textContent = service;

      layanan.appendChild(option);

    });

}


/* =========================================
   PILIH LAYANAN
========================================= */

layanan?.addEventListener(
  "change",
  function () {

    const service =
      this.value;

    paket.innerHTML =
      `<option value="">Pilih paket / ukuran</option>`;

    paket.disabled = true;

    if (!service) {

      updateTotal();

      return;

    }


    PRICE_LIST[service]
      .forEach(item => {

        const option =
          document.createElement("option");

        option.value =
          item.price;

        option.dataset.name =
          item.name;

        option.textContent =
          `${item.name} — ${rupiah(item.price)}`;

        paket.appendChild(option);

      });


    paket.disabled = false;

    updateTotal();

  }
);


/* =========================================
   PILIH PAKET
========================================= */

paket?.addEventListener(
  "change",
  updateTotal
);


/* =========================================
   QTY
========================================= */

function ubahQty(value) {

  qty += value;

  if (qty < 1) {
    qty = 1;
  }

  if (qty > 99) {
    qty = 99;
  }

  qtyElement.textContent = qty;

  updateTotal();

}


/* =========================================
   TOTAL
========================================= */

function updateTotal() {

  const price =
    Number(paket?.value || 0);

  const total =
    price * qty;

  totalElement.textContent =
    rupiah(total);

}


/* =========================================
   VALIDASI
========================================= */

function validasiOrder() {

  const nama =
    document.getElementById("nama").value.trim();

  const telepon =
    document.getElementById("telepon").value.trim();

  const alamat =
    document.getElementById("alamat").value.trim();

  const jam =
    document.getElementById("jam").value;

  if (!layanan.value) {

    alert("Silakan pilih layanan.");

    return false;

  }

  if (!paket.value) {

    alert("Silakan pilih paket / ukuran.");

    return false;

  }

  if (!tanggal.value) {

    alert("Silakan pilih tanggal cleaning.");

    return false;

  }

  if (!jam) {

    alert("Silakan pilih jam cleaning.");

    return false;

  }

  if (!nama) {

    alert("Silakan isi nama.");

    return false;

  }

  if (!telepon) {

    alert("Silakan isi nomor WhatsApp.");

    return false;

  }

  if (!alamat) {

    alert("Silakan isi alamat.");

    return false;

  }

  return true;

}


/* =========================================
   NOMOR ORDER
========================================= */

function generateOrderNumber() {

  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `SC-${year}${month}${day}-${random}`;

}

/* =========================================
   KIRIM WHATSAPP + FIREBASE
========================================= */

async function kirimWhatsApp() {

  if (!validasiOrder()) {
    return;
  }

  const service =
    layanan.value;

  const selected =
    paket.options[paket.selectedIndex];

  const packageName =
    selected.dataset.name;

  const price =
    Number(paket.value);

  const total =
    price * qty;

  const nama =
    document.getElementById("nama")
      .value.trim();

  const telepon =
    document.getElementById("telepon")
      .value.trim();

  const alamat =
    document.getElementById("alamat")
      .value.trim();

  const catatan =
    document.getElementById("catatan")
      .value.trim();

  const tanggalValue =
    tanggal.value;

  const jam =
    document.getElementById("jam").value;


  /* =========================
     NOMOR ORDER
  ========================= */

  const orderNumber =
    generateOrderNumber();


  /* =========================
     DATA ORDER
  ========================= */

  const order = {

    id: orderNumber,

    service: service,

    package: packageName,

    qty: qty,

    price: price,

    total: total,

    date: tanggalValue,

    time: jam,

    name: nama,

    phone: telepon,

    address: alamat,

    note: catatan,

    status:
      "Menunggu Konfirmasi",

    createdAt:
      new Date().toISOString()

  };


  /* =========================
     PESAN WHATSAPP
  ========================= */

  const message =

`*ORDER SHAE CLEANERS*

No. Order: ${orderNumber}

*Data Pesanan*
Layanan: ${service}
Paket: ${packageName}
Jumlah: ${qty}
Harga: ${rupiah(price)}
Total: *${rupiah(total)}*

*Jadwal*
Tanggal: ${tanggalValue}
Jam: ${jam}

*Data Pelanggan*
Nama: ${nama}
WhatsApp: ${telepon}

*Alamat*
${alamat}

${catatan ? `*Catatan*\n${catatan}\n` : ""}

Mohon konfirmasi ketersediaan jadwal.

Terima kasih 🙏`;


  /* =========================
     NOMOR WHATSAPP SHAE
  ========================= */

  const nomorShae =
    "6283813138221";


  /* =========================
     SIMPAN LOCAL
  ========================= */

  const orders =
    JSON.parse(
      localStorage.getItem(
        "shae_orders"
      ) || "[]"
    );


  orders.push({

    id: orderNumber,

    layanan: service,

    paket: packageName,

    qty: qty,

    harga: price,

    total: total,

    tanggal: tanggalValue,

    jam: jam,

    nama: nama,

    telepon: telepon,

    alamat: alamat,

    catatan: catatan,

    status:
      "Menunggu Konfirmasi",

    createdAt:
      new Date().toISOString()

  });


  localStorage.setItem(
    "shae_orders",
    JSON.stringify(orders)
  );


  /* =========================
     SIMPAN FIREBASE
  ========================= */

  const online =
    await simpanOrderOnline(order);


  /* =========================
     JIKA FIREBASE GAGAL
  ========================= */

  if (!online) {

    alert(
      "Pesanan belum tersimpan ke server.\n\nSilakan coba lagi."
    );

    return;
  }


  /* =========================
     BUKA WHATSAPP
  ========================= */

  const url =
    `https://wa.me/${nomorShae}?text=${encodeURIComponent(message)}`;

  window.location.href = url;

}

/* =========================================
   LOAD
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadServices();

    setTanggalMinimum();


    /* Ambil layanan dari HOME */

    const selectedService =
      localStorage.getItem(
        "shae_selected_service"
      );


    if (
      selectedService &&
      PRICE_LIST[selectedService]
    ) {

      layanan.value =
        selectedService;

      layanan.dispatchEvent(
        new Event("change")
      );

      localStorage.removeItem(
        "shae_selected_service"
      );

    }


    updateTotal();

  }
);
