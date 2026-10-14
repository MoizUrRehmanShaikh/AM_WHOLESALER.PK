/* ======================================================================
   AM_WHOLESALER.PK — product-details.js
   Renders a single product's detail page based on ?id= in the URL,
   handles the image gallery, quantity stepper, the "Order on WhatsApp"
   button and the related-products strip.
====================================================================== */

var currentQty = 1;

function getQueryId() {
  var params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProductDetail() {
  var root = document.getElementById("pd-root");
  if (!root) return;

  var id = getQueryId();
  var product = getProductById(id) || PRODUCTS[0];

  document.title = product.short + " | " + STORE_NAME;

  var discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  document.getElementById("pd-crumb-name").textContent = product.short;

  document.getElementById("pd-main-img").src = product.image;
  document.getElementById("pd-main-img").alt = product.short;

  var thumbs = document.getElementById("pd-thumbs");
  thumbs.innerHTML = product.images.map(function (img, i) {
    return '<button class="' + (i === 0 ? "active" : "") + '" data-img="' + img + '" aria-label="Show image ' + (i + 1) + '"><img src="' + img + '" alt=""></button>';
  }).join("");
  thumbs.querySelectorAll("button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("pd-main-img").src = btn.dataset.img;
      thumbs.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
  });

  document.getElementById("pd-cat").textContent = CATEGORIES[product.category];
  document.getElementById("pd-title").textContent = product.short;
  document.getElementById("pd-stars").textContent = starString(product.rating);
  document.getElementById("pd-rating-text").textContent = product.rating + " out of 5 · " + product.reviews + " reviews";
  document.getElementById("pd-price").textContent = formatPKR(product.price);
  document.getElementById("pd-mrp").textContent = formatPKR(product.mrp);
  document.getElementById("pd-save").textContent = "Save " + discount + "%";
  document.getElementById("pd-desc").textContent = product.description;
  document.getElementById("pd-stock-text").textContent = product.stock > 0 ? "In stock — " + product.stock + " left" : "Out of stock";

  var specsBody = document.getElementById("pd-specs-body");
  specsBody.innerHTML = Object.keys(product.specs).map(function (key) {
    return "<tr><td>" + key + "</td><td>" + product.specs[key] + "</td></tr>";
  }).join("");

  // "Order on WhatsApp" button — label + link carry the product name,
  // quantity and price, and refresh whenever the quantity changes.
  var waBtn = document.getElementById("pd-whatsapp-order");
  function refreshWhatsAppOrderButton() {
    waBtn.innerHTML = WHATSAPP_ICON_SVG + "Order on WhatsApp";
    waBtn.href = buildWhatsAppOrderLink(product, currentQty);
  }

  // quantity stepper
  currentQty = 1;
  var qtyInput = document.getElementById("pd-qty");
  qtyInput.value = currentQty;
  document.getElementById("pd-qty-minus").onclick = function () {
    if (currentQty > 1) { currentQty--; qtyInput.value = currentQty; refreshWhatsAppOrderButton(); }
  };
  document.getElementById("pd-qty-plus").onclick = function () {
    if (currentQty < product.stock) { currentQty++; qtyInput.value = currentQty; refreshWhatsAppOrderButton(); }
  };
  qtyInput.addEventListener("change", function () {
    var v = parseInt(qtyInput.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > product.stock) v = product.stock;
    currentQty = v;
    qtyInput.value = v;
    refreshWhatsAppOrderButton();
  });

  refreshWhatsAppOrderButton();

  renderRelatedProducts(product);
}

function renderRelatedProducts(product) {
  var el = document.getElementById("related-products");
  if (!el) return;
  var related = PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; }).slice(0, 4);
  if (related.length === 0) related = PRODUCTS.filter(function (p) { return p.id !== product.id; }).slice(0, 4);
  el.innerHTML = related.map(productCardHTML).join("");
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
