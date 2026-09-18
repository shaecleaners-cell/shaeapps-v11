import {
  auth,
  db,
  onAuthStateChanged,
  signOut,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp
} from "./firebase-admin.js";


let orders = [];
let currentFilter = "Semua";
let unsubscribeOrders = null;


/* =====================================================
   ELEMENT
===================================================== */

const orderList =
  document.getElementById("adminOrderList");

const emptyOrder =
  document.getElementById("adminEmpty");

const countWaiting =
  document.getElementById("countWaiting");

const countConfirmed =
  document.getElementById("countConfirmed");

const countDone =
  document.getElementById("countDone");

const refreshBtn =
  document.getElementById("refreshBtn");

const logoutBtn =
  document.getElementById("logoutBtn");


/* =====================================================
   CEK LOGIN ADMIN
===================================================== */
onAuthStateChanged(
  auth,
  user => {

    console.log(
      "ADMIN AUTH:",
      user
        ? user.email
        : "BELUM LOGIN"
    );


    if (!user) {

      window.location.replace(
        "admin-login.html"
      );

      return;

    }


    console.log(
      "Admin berhasil masuk:",
      user.email
    );


    loadOrders();

  }
);



/* =====================================================
   RUPIAH
===================================================== */

function rupiah(value) {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  ).format(
    Number(value) || 0
  );

}


/* =====================================================
   HTML AMAN
===================================================== */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =====================================================
   STATUS CLASS
===================================================== */

function statusClass(status) {

  if (status === "Dikonfirmasi") {
    return "confirmed";
  }

  if (status === "Selesai") {
    return "done";
  }

  if (status === "Ditolak") {
    return "rejected";
  }

  return "waiting";

}


/* =====================================================
   TANGGAL
===================================================== */

function formatTanggal(value) {

  if (!value) {
    return "-";
  }


  const date =
    new Date(
      value + "T00:00:00"
    );


  if (Number.isNaN(date.getTime())) {
    return value;
  }


  return date.toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

}


/* =====================================================
   WAKTU PESANAN
===================================================== */

function formatCreatedAt(value) {

  if (!value) {
    return "Pesanan baru";
  }


  try {

    if (
      typeof value.toDate ===
      "function"
    ) {

      value = value.toDate();

    }


    const date =
      new Date(value);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {

      return "Pesanan baru";

    }


    return date.toLocaleString(
      "id-ID",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );

  } catch {

    return "Pesanan baru";

  }

}


/* =====================================================
   LOAD FIRESTORE REALTIME
===================================================== */

function loadOrders() {

  if (unsubscribeOrders) {

    unsubscribeOrders();

    unsubscribeOrders = null;

  }


  const q =
    query(
      collection(
        db,
        "orders"
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );


  unsubscribeOrders =
    onSnapshot(

      q,

      snapshot => {

        orders = [];


        snapshot.forEach(
          item => {

            orders.push({

              firestoreId:
                item.id,

              ...item.data()

            });

          }
        );


        updateSummary();

        renderOrders();

      },


      error => {

        console.error(
          "Firestore error:",
          error
        );


        orderList.innerHTML = "";


        emptyOrder.style.display =
          "block";


        emptyOrder.textContent =
          "Tidak dapat mengambil pesanan. Periksa Firestore Rules.";

      }

    );

}


/* =====================================================
   SUMMARY
===================================================== */

function updateSummary() {

  const waiting =
    orders.filter(
      order =>
        (
          order.status ||
          "Menunggu Konfirmasi"
        ) ===
        "Menunggu Konfirmasi"
    ).length;


  const confirmed =
    orders.filter(
      order =>
        order.status ===
        "Dikonfirmasi"
    ).length;


  const done =
    orders.filter(
      order =>
        order.status ===
        "Selesai"
    ).length;


  countWaiting.textContent =
    waiting;

  countConfirmed.textContent =
    confirmed;

  countDone.textContent =
    done;

}


/* =====================================================
   FILTER
===================================================== */

function getFilteredOrders() {

  if (
    currentFilter ===
    "Semua"
  ) {

    return orders;

  }


  return orders.filter(
    order =>
      (
        order.status ||
        "Menunggu Konfirmasi"
      ) ===
      currentFilter
  );

}


/* =====================================================
   RENDER PESANAN
===================================================== */

function renderOrders() {

  orderList.innerHTML = "";


  const list =
    getFilteredOrders();


  if (!list.length) {

    emptyOrder.style.display =
      "block";

    emptyOrder.textContent =
      "Belum ada pesanan.";

    return;

  }


  emptyOrder.style.display =
    "none";


  list.forEach(
    order => {

      const status =
        order.status ||
        "Menunggu Konfirmasi";


      let buttons = "";


      /* MENUNGGU */

      if (
        status ===
        "Menunggu Konfirmasi"
      ) {

        buttons = `

          <button
            class="btn-confirm"
            onclick="ubahStatus(
              '${escapeAttr(
                order.firestoreId
              )}',
              'Dikonfirmasi'
            )"
          >
            ✓ Konfirmasi
          </button>


          <button
            class="btn-reject"
            onclick="ubahStatus(
              '${escapeAttr(
                order.firestoreId
              )}',
              'Ditolak'
            )"
          >
            ✕ Tolak
          </button>

        `;

      }


      /* DIKONFIRMASI */

      if (
        status ===
        "Dikonfirmasi"
      ) {

        buttons = `

          <button
            class="btn-done"
            onclick="ubahStatus(
              '${escapeAttr(
                order.firestoreId
              )}',
              'Selesai'
            )"
          >
            ✓ Tandai Selesai
          </button>

        `;

      }


      const card =
        document.createElement(
          "article"
        );


      card.className =
        "admin-order";


      card.innerHTML = `

        <div class="order-head">

          <div>

            <div class="order-id">
              ${escapeHTML(
                order.orderId ||
                order.id ||
                "-"
              )}
            </div>

            <div class="order-created">
              ${formatCreatedAt(
                order.createdAt
              )}
            </div>

          </div>


          <span
            class="status
              ${statusClass(status)}"
          >
            ${escapeHTML(status)}
          </span>

        </div>


        <div class="customer-box">

          <strong>
            ${escapeHTML(
              order.name ||
              "-"
            )}
          </strong>


          <p>

            WhatsApp:
            ${escapeHTML(
              order.phone ||
              "-"
            )}

            <br>

            Alamat:
            ${escapeHTML(
              order.address ||
              "-"
            )}

          </p>

        </div>


        <div class="order-detail">

          <div class="detail-row">

            <span>
              Layanan
            </span>

            <span>
              ${escapeHTML(
                order.service ||
                "-"
              )}
            </span>

          </div>


          <div class="detail-row">

            <span>
              Paket
            </span>

            <span>
              ${escapeHTML(
                order.package ||
                "-"
              )}
            </span>

          </div>


          <div class="detail-row">

            <span>
              Jumlah
            </span>

            <span>
              ${Number(
                order.qty
              ) || 1}
              item
            </span>

          </div>


          <div class="detail-row">

            <span>
              Jadwal
            </span>

            <span>
              ${formatTanggal(
                order.date
              )}

              <br>

              ${escapeHTML(
                order.time ||
                "-"
              )}
            </span>

          </div>


          ${
            order.note
              ? `

                <div class="detail-row">

                  <span>
                    Catatan
                  </span>

                  <span>
                    ${escapeHTML(
                      order.note
                    )}
                  </span>

                </div>

              `
              : ""
          }

        </div>


        <div class="order-total">

          <span>
            Total
          </span>

          <strong>
            ${rupiah(
              order.total
            )}
          </strong>

        </div>


        ${
          buttons
            ? `

              <div class="action-buttons">
                ${buttons}
              </div>

            `
            : ""
        }

      `;


      orderList.appendChild(
        card
      );

    }
  );

}


/* =====================================================
   UBAH STATUS FIRESTORE
===================================================== */

window.ubahStatus =
  async function (
    firestoreId,
    newStatus
  ) {

    if (!firestoreId) {

      alert(
        "ID pesanan tidak ditemukan."
      );

      return;

    }


    try {

      await updateDoc(

        doc(
          db,
          "orders",
          firestoreId
        ),

        {
          status:
            newStatus,

          updatedAt:
            serverTimestamp()
        }

      );


    } catch (error) {

      console.error(
        "Update status:",
        error
      );


      alert(
        "Status gagal diubah."
      );

    }

  };


/* =====================================================
   FILTER BUTTON
===================================================== */

document
  .querySelectorAll(
    ".filter-btn"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".filter-btn"
            )
            .forEach(
              btn =>
                btn.classList.remove(
                  "active"
                )
            );


          button.classList.add(
            "active"
          );


          currentFilter =
            button.dataset.filter;


          renderOrders();

        }
      );

    }
  );


/* =====================================================
   REFRESH
===================================================== */

if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    loadOrders
  );

}


/* =====================================================
   LOGOUT
===================================================== */

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async () => {

      try {

        await signOut(auth);

        window.location.replace(
          "admin-login.html"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Gagal keluar."
        );

      }

    }
  );

}


/* =====================================================
   ESCAPE ATTRIBUTE
===================================================== */

function escapeAttr(value) {

  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");

}