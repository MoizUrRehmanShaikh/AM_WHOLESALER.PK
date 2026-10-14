/* ======================================================================
   AM_WHOLESALER.PK — main.js
   Shared behaviour used on every page: theme toggle, mobile nav,
   cart badge sync, toast notifications and the newsletter form.
====================================================================== */

/* ---------- Theme (light / dark) ---------- */
(function initTheme() {
  var saved = localStorage.getItem("am_theme");
  var theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  var next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("am_theme", next);
}

/* ---------- Shared form-field validator (used by checkout + auth forms) ---------- */
function validateField(input, rule) {
  var field = input.closest(".field");
  var errorEl = field.querySelector(".error-msg");
  var valid = rule(input.value.trim());
  field.classList.toggle("has-error", !valid);
  if (errorEl) errorEl.style.display = valid ? "none" : "block";
  return valid;
}

/* ---------- Toast notifications ---------- */
function showToast(message, type) {
  type = type || "success";
  var container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  var toast = document.createElement("div");
  toast.className = "toast " + type;
  var icon = type === "success"
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  toast.innerHTML = icon + "<span>" + message + "</span>";
  container.appendChild(toast);
  setTimeout(function () {
    toast.classList.add("hide");
    setTimeout(function () { toast.remove(); }, 250);
  }, 2600);
}

/* ---------- Cart helpers shared across pages (storage + badge) ---------- */
var CART_KEY = "am_cart";

function readCart() {
  try {
    var raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  syncCartBadge();
}

function cartItemCount() {
  return readCart().reduce(function (sum, item) { return sum + item.qty; }, 0);
}

function syncCartBadge() {
  var badges = document.querySelectorAll("[data-cart-badge]");
  var count = cartItemCount();
  badges.forEach(function (el) {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function addToCart(productId, qty) {
  qty = qty || 1;
  var cart = readCart();
  var existing = cart.find(function (i) { return i.id === productId; });
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  writeCart(cart);
}

/* ---------- Mobile menu ---------- */
function setupMobileMenu() {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
    var expanded = menu.classList.contains("open");
    toggle.setAttribute("aria-expanded", expanded);
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { menu.classList.remove("open"); });
  });
}

/* ---------- Nav search: redirect to products page with query ---------- */
function setupNavSearch() {
  var form = document.querySelector("[data-nav-search]");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector("input");
    var q = encodeURIComponent(input.value.trim());
    window.location.href = "products.html" + (q ? "?q=" + q : "");
  });
}

/* ---------- Newsletter (demo, stores nothing server-side) ---------- */
function setupNewsletter() {
  var form = document.querySelector("[data-newsletter-form]");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector("input[type=email]");
    var msg = form.querySelector(".newsletter-msg");
    if (!input.value || !input.checkValidity()) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "newsletter-msg error";
      return;
    }
    msg.textContent = "Thanks for subscribing! Watch your inbox for our next sale.";
    msg.className = "newsletter-msg success";
    form.reset();
  });
}

/* ---------- Highlight the active nav link ---------- */
function highlightActiveNav() {
  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === page) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  syncCartBadge();
  setupMobileMenu();
  setupNavSearch();
  setupNewsletter();
  highlightActiveNav();

  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
