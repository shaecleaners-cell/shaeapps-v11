/* =========================================
   SHAE CLEANERS
   PESANAN.JS
========================================= */

const orderList =
  document.getElementById("orderList");

const emptyOrder =
  document.getElementById("emptyOrder");


/* =========================================
   RUPIAH
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
   FORMAT TANGGAL
========================================= */

function formatTanggal(date) {

  if (!date) return "-";

  const parts =
    date.split("-");

  if (parts.length !== 3) {
    return date;
  }

  return `${parts[2]}/${parts[1]}/${parts[0]}`;

}


/* =========================================
   LOAD PESANAN
========================================= */

function loadOrders() {

  const orders =
    JSON.parse(
      localStorage.getItem("shae_orders") || "[]"
    );


  orderList.innerHTML = "";


  if (!orders.length) {

    emptyOrder.style.display = "block";

    return;

  }


  emptyOrder.style.display = "none";


  /*
    Pesanan terbaru ditampilkan paling atas
  */

  orders
    .slice()
    .reverse()
    .forEach(order => {

      const card =
        document.createElement("div");

      card.className = "order-card";


      card.innerHTML = `

        <div class="order-top">

          <span class="order-number">
            ${order.id || "-"}
          </span>

          <span class="status">
            Menunggu Konfirmasi
          </span>

        </div>


        <div class="service-name">
          ${order.layanan || "-"}
        </div>


        <div class="package-name">
          ${order.paket || "-"}
        </div>


        <div class="order-info">

          <div class="info-box">
            <small>Jumlah</small>
            <strong>
              ${order.qty || 1} item
            </strong>
          </div>


          <div class="info-box">
            <small>Harga</small>
            <strong>
              ${rupiah(order.harga)}
            </strong>
          </div>


          <div class="info-box">
            <small>Tanggal</small>
            <strong>
              ${formatTanggal(order.tanggal)}
            </strong>
          </div>


          <div class="info-box">
            <small>Jam</small>
            <strong>
              ${order.jam || "-"}
            </strong>
          </div>

        </div>


        <div class="order-total">

          <span>Total</span>

          <strong>
            ${rupiah(order.total)}
          </strong>

        </div>

      `;


      orderList.appendChild(card);

    });

}


/* =========================================
   NAVIGATION
========================================= */

function goHome() {
  window.location.href = "index.html";
}


function goPromo() {
  window.location.href = "promo.html";
}


function goAccount() {
  window.location.href = "akun.html";
}


/* =========================================
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  loadOrders
);