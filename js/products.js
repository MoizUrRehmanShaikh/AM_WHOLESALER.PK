/* ======================================================================
   AM_WHOLESALER.PK — products.js
   Renders product cards (home "featured" strip + the full listing
   page), and powers the listing page's search, category filter and
   sort controls.
====================================================================== */

/* Build the star-rating markup, e.g. ★★★★☆ */
function starString(rating) {
  var full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

/* Returns the HTML for a single product card */
function productCardHTML(p) {
  var discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  return (
    '<article class="product-card" data-id="' + p.id + '">' +
      '<a class="pc-media" href="product-details.html?id=' + p.id + '" aria-label="View ' + p.short + '">' +
        (p.badge ? '<span class="pc-badge">' + p.badge + "</span>" : "") +
        '<span class="pc-sale">-' + discount + '%</span>' +
        '<img src="' + p.image + '" alt="' + p.short + '" loading="lazy">' +
      "</a>" +
      '<button class="pc-quick" title="View details" aria-label="Quick view ' + p.short + '" onclick="window.location.href=\'product-details.html?id=' + p.id + '\'">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>' +
      "</button>" +
      '<div class="pc-body">' +
        '<span class="pc-cat">' + CATEGORIES[p.category] + "</span>" +
        '<a class="pc-title" href="product-details.html?id=' + p.id + '">' + p.short + "</a>" +
        '<div class="pc-rating"><span class="stars">' + starString(p.rating) + "</span><span>" + p.rating + " (" + p.reviews + ")</span></div>" +
        '<div class="pc-price-row"><span class="pc-price">' + formatPKR(p.price) + '</span><span class="pc-mrp">' + formatPKR(p.mrp) + "</span></div>" +
        '<div class="pc-footer">' +
          '<a class="btn btn-whatsapp btn-sm" href="' + buildWhatsAppOrderLink(p, 1) + '" target="_blank" rel="noopener noreferrer" aria-label="Order ' + p.short + ' on WhatsApp">' +
            WHATSAPP_ICON_SVG +
            '<span class="wa-label-full">Order on WhatsApp</span>' +
            '<span class="wa-label-short">Order Now</span>' +
          "</a>" +
        "</div>" +
      "</div>" +
    "</article>"
  );
}

/* ---------- Home page: featured + best sellers ---------- */
function renderHomeProducts() {
  var featuredEl = document.getElementById("featured-products");
  if (featuredEl) {
    var featured = PRODUCTS.slice(0, 8);
    featuredEl.innerHTML = featured.map(productCardHTML).join("");
  }
  var bestEl = document.getElementById("bestseller-products");
  if (bestEl) {
    var best = PRODUCTS.filter(function (p) { return p.badge === "Best Seller"; }).slice(0, 4);
    if (best.length < 4) best = PRODUCTS.slice().sort(function (a, b) { return b.rating - a.rating; }).slice(0, 4);
    bestEl.innerHTML = best.map(productCardHTML).join("");
  }
}

/* ---------- Product listing page ---------- */
var listingState = { category: "all", sort: "featured", query: "" };

function applyListingFilters() {
  var list = PRODUCTS.slice();

  if (listingState.query) {
    var q = listingState.query.toLowerCase();
    list = list.filter(function (p) {
      return p.short.toLowerCase().indexOf(q) !== -1 ||
             p.title.toLowerCase().indexOf(q) !== -1 ||
             CATEGORIES[p.category].toLowerCase().indexOf(q) !== -1;
    });
  }

  if (listingState.category !== "all") {
    list = list.filter(function (p) { return p.category === listingState.category; });
  }

  switch (listingState.sort) {
    case "price-asc": list.sort(function (a, b) { return a.price - b.price; }); break;
    case "price-desc": list.sort(function (a, b) { return b.price - a.price; }); break;
    case "rating": list.sort(function (a, b) { return b.rating - a.rating; }); break;
    case "newest": list.sort(function (a, b) { return (b.badge === "New") - (a.badge === "New"); }); break;
    default:
      list.sort(function (a, b) { return (b.badge === "Best Seller") - (a.badge === "Best Seller"); });
  }

  return list;
}

function renderListing() {
  var grid = document.getElementById("product-grid");
  var countEl = document.getElementById("result-count");
  if (!grid) return;

  var list = applyListingFilters();

  if (list.length === 0) {
    grid.innerHTML =
      '<div class="empty-state">' +
        '<div class="es-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>' +
        "<h3>No products found</h3>" +
        "<p>Try a different search term or clear your filters to see every item in the " + SALE_TAG + ".</p>" +
        '<button class="btn btn-outline" onclick="resetListingFilters()">Clear filters</button>' +
      "</div>";
  } else {
    grid.innerHTML = list.map(productCardHTML).join("");
  }

  if (countEl) countEl.textContent = list.length + (list.length === 1 ? " product" : " products");
}

function resetListingFilters() {
  listingState = { category: "all", sort: "featured", query: "" };
  var searchInput = document.getElementById("product-search-input");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("active", c.dataset.category === "all"); });
  var sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = "featured";
  renderListing();
}

function initProductsPage() {
  var grid = document.getElementById("product-grid");
  if (!grid) return;

  // read ?category= and ?q= from URL (e.g. coming from a category card or nav search)
  var params = new URLSearchParams(window.location.search);
  if (params.get("category")) listingState.category = params.get("category");
  if (params.get("q")) listingState.query = params.get("q");

  var searchInput = document.getElementById("product-search-input");
  if (searchInput) {
    searchInput.value = listingState.query;
    searchInput.addEventListener("input", function () {
      listingState.query = searchInput.value.trim();
      renderListing();
    });
  }

  var chips = document.querySelectorAll(".chip");
  chips.forEach(function (chip) {
    if (chip.dataset.category === listingState.category) chip.classList.add("active");
    else chip.classList.remove("active");
    chip.addEventListener("click", function () {
      listingState.category = chip.dataset.category;
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      renderListing();
    });
  });

  var sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      listingState.sort = sortSelect.value;
      renderListing();
    });
  }

  renderListing();
}

document.addEventListener("DOMContentLoaded", function () {
  renderHomeProducts();
  initProductsPage();
});
