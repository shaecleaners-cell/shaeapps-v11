/* =====================================================
   SHAE CLEANERS
   APP.JS - HOME / SERVICE
===================================================== */


/* =====================================================
   DATA LAYANAN
===================================================== */

const SERVICES = [

  {
    name: "Sofa",
    icon: "assets/icons/sofa.png",
    desc: "Cleaning sofa"
  },

  {
    name: "Kasur",
    icon: "assets/icons/kasur.png",
    desc: "Cleaning springbed"
  },

  {
    name: "Jok Mobil",
    icon: "assets/icons/jokmobil.png",
    desc: "Cleaning jok mobil"
  },

  {
    name: "Karpet",
    icon: "assets/icons/karpet.png",
    desc: "Cleaning karpet"
  },

  {
    name: "Gorden",
    icon: "assets/icons/gorden.png",
    desc: "Cleaning gorden"
  },

  {
    name: "Kursi",
    icon: "assets/icons/kursi.png",
    desc: "Cleaning kursi"
  },

  {
    name: "AC",
    icon: "assets/icons/ac.png",
    desc: "Cleaning AC"
  },

  {
    name: "Home Cleaning",
    icon: "assets/icons/homecleaning.png",
    desc: "Cleaning rumah"
  }

];


/* =====================================================
   ELEMENT
===================================================== */

const serviceGrid =
  document.getElementById("serviceGrid");

const searchInput =
  document.getElementById("searchInput");

const promoSlides =
  document.querySelectorAll(".promo-slide");

const sliderDots =
  document.getElementById("sliderDots");


/* =====================================================
   RENDER SERVICE
===================================================== */

function renderServices(list = SERVICES) {

  if (!serviceGrid) return;

  serviceGrid.innerHTML = "";

  if (!list.length) {

    serviceGrid.innerHTML = `
      <div class="no-service">
        Layanan tidak ditemukan.
      </div>
    `;

    return;
  }


  list.forEach(service => {

    const card =
      document.createElement("button");

    card.className = "service-card";

    card.type = "button";

    card.innerHTML = `
      <img
        src="${service.icon}"
        alt="${service.name}"
        class="service-icon"
        onerror="this.style.display='none'"
      >

      <span class="service-name">
        ${service.name}
      </span>
    `;


    card.addEventListener("click", () => {

      startOrder(service.name);

    });


    serviceGrid.appendChild(card);

  });

}


/* =====================================================
   SEARCH
===================================================== */

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const keyword =
      searchInput.value
        .trim()
        .toLowerCase();


    if (!keyword) {

      renderServices();

      return;
    }


    const result =
      SERVICES.filter(service =>
        service.name
          .toLowerCase()
          .includes(keyword)
      );


    renderServices(result);

  });

}


/* =====================================================
   PROMO SLIDER
===================================================== */

let promoIndex = 0;

function setupPromo() {

  if (!promoSlides.length) return;


  promoSlides.forEach(slide => {

    slide.classList.remove("active");

  });


  promoSlides[0].classList.add("active");


  if (sliderDots) {

    sliderDots.innerHTML = "";

    promoSlides.forEach((slide, index) => {

      const dot =
        document.createElement("span");

      dot.className = "slider-dot";

      if (index === 0) {

        dot.classList.add("active");

      }


      dot.addEventListener("click", () => {

        showPromo(index);

      });


      sliderDots.appendChild(dot);

    });

  }

}


function showPromo(index) {

  if (!promoSlides.length) return;


  promoIndex = index;


  promoSlides.forEach((slide, i) => {

    slide.classList.toggle(
      "active",
      i === promoIndex
    );

  });


  const dots =
    document.querySelectorAll(".slider-dot");


  dots.forEach((dot, i) => {

    dot.classList.toggle(
      "active",
      i === promoIndex
    );

  });

}


function nextPromo() {

  if (!promoSlides.length) return;

  promoIndex++;

  if (promoIndex >= promoSlides.length) {

    promoIndex = 0;

  }

  showPromo(promoIndex);

}


setupPromo();

setInterval(nextPromo, 4000);


/* =====================================================
   MULAI ORDER
===================================================== */

function startOrder(service = "") {

  if (service) {

    localStorage.setItem(
      "shae_selected_service",
      service
    );

  } else {

    localStorage.removeItem(
      "shae_selected_service"
    );

  }


  window.location.href = "order.html";

}


/* =====================================================
   NAVIGATION
===================================================== */

function goHome() {

  window.location.href = "index.html";

}


function goPesanan() {

  window.location.href = "pesanan.html";

}


function goPromo() {

  window.location.href = "promo.html";

}


function goAkun() {

  window.location.href = "akun.html";

}


function goLogin() {

  window.location.href = "login.html";

}


/* =====================================================
   LIHAT SEMUA
===================================================== */

function showAllServices() {

  renderServices(SERVICES);

  const section =
    document.querySelector(".services-section");

  if (section) {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


/* =====================================================
   INITIAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  renderServices();

});
/* =====================================================
   LAYANAN POPULAR
===================================================== */

const POPULAR_SERVICES = [

  {
    name: "Sofa",
    image: "assets/popular/sofa.png",
    desc: "Sofa bersih, nyaman dan bebas noda.",
    price: "Mulai Rp50.000"
  },

  {
    name: "Kasur",
    image: "assets/popular/kasur.png",
    desc: "Bersihkan kasur dari noda dan tungau.",
    price: "Mulai Rp150.000"
  },

  {
    name: "Jok Mobil",
    image: "assets/popular/jokmobil.png",
    desc: "Jok dan interior mobil kembali bersih.",
    price: "Mulai Rp250.000"
  },

  {
    name: "Kursi",
    image: "assets/popular/kursi.png",
    desc: "Cleaning kursi makan dan kantor.",
    price: "Mulai Rp30.000"
  }

];


function renderPopularServices() {

  const container =
    document.getElementById(
      "popularServices"
    );


  if (!container) return;


  container.innerHTML =
    POPULAR_SERVICES.map(
      service => `

        <article class="popular-card">

          <div class="popular-image">

            <img
              src="${service.image}"
              alt="${service.name}"
              loading="lazy"
              onerror="
                this.style.display='none'
              "
            >

          </div>


          <div class="popular-content">

            <h3>
              ${service.name}
            </h3>

            <p>
              ${service.desc}
            </p>


            <div class="popular-bottom">

              <span class="popular-price">
                ${service.price}
              </span>


              <button
                class="popular-add"
                onclick="
                  startOrder('${service.name}')
                "
                aria-label="Pesan ${service.name}"
              >
                +
              </button>

            </div>

          </div>

        </article>

      `
    )
    .join("");

}


/* =====================================================
   JALANKAN
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderPopularServices();

  }
);
