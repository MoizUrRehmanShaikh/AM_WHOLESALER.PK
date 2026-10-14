/* ======================================================================
   AM_WHOLESALER.PK — checkout.js
   Renders the order summary from the cart, validates the checkout
   form, and shows a demo order-confirmation screen. No real payment
   is processed — Stripe / PayPal are shown as placeholder options
   that clearly state a payment gateway must be configured.
====================================================================== */

function renderCheckoutSummary() {
  var el = document.getElementById("checkout-items");
  if (!el) return;

  var entries = getCartItemsWithData();

  if (entries.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  el.innerHTML = entries.map(function (e) {
    return (
      '<div class="order-item-row">' +
        '<span class="oi-name">' + e.product.short + ' <span class="oi-qty">× ' + e.qty + "</span></span>" +
        "<span>" + formatPKR(e.product.price * e.qty) + "</span>" +
      "</div>"
    );
  }).join("");

  var subtotal = entries.reduce(function (sum, e) { return sum + e.product.price * e.qty; }, 0);
  var shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  var total = subtotal + shipping;

  document.getElementById("checkout-subtotal").textContent = formatPKR(subtotal);
  document.getElementById("checkout-shipping").textContent = shipping === 0 ? "Free" : formatPKR(shipping);
  document.getElementById("checkout-total").textContent = formatPKR(total);
}

/* field validation is handled by the shared validateField() helper in main.js */

function setupCheckoutForm() {
  var form = document.getElementById("checkout-form");
  if (!form) return;

  // payment option visual selection
  var payOptions = document.querySelectorAll(".pay-option");
  payOptions.forEach(function (opt) {
    opt.addEventListener("click", function () {
      var radio = opt.querySelector('input[type="radio"]');
      radio.checked = true;
      payOptions.forEach(function (o) { o.classList.remove("selected"); });
      opt.classList.add("selected");
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.querySelector("#co-name");
    var email = form.querySelector("#co-email");
    var phone = form.querySelector("#co-phone");
    var address = form.querySelector("#co-address");
    var city = form.querySelector("#co-city");

    var validName = validateField(name, function (v) { return v.length >= 3; });
    var validEmail = validateField(email, function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
    var validPhone = validateField(phone, function (v) { return /^[0-9+\-\s]{7,15}$/.test(v); });
    var validAddress = validateField(address, function (v) { return v.length >= 8; });
    var validCity = validateField(city, function (v) { return v.length >= 2; });

    if (!(validName && validEmail && validPhone && validAddress && validCity)) {
      showToast("Please fix the highlighted fields", "error");
      return;
    }

    // Demo-only "order placement" — no real payment gateway is called.
    var orderId = "AMW-" + Math.floor(100000 + Math.random() * 900000);
    var entries = getCartItemsWithData();
    var subtotal = entries.reduce(function (sum, e) { return sum + e.product.price * e.qty; }, 0);
    var shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    var total = subtotal + shipping;

    sessionStorage.setItem("am_last_order", JSON.stringify({
      id: orderId, name: name.value.trim(), email: email.value.trim(), total: total,
    }));

    // clear the cart (this was a successful demo checkout)
    writeCart([]);

    document.getElementById("checkout-form-view").style.display = "none";
    document.getElementById("checkout-confirm-view").style.display = "block";
    document.getElementById("confirm-order-id").textContent = orderId;
    document.getElementById("confirm-email").textContent = email.value.trim();
    document.getElementById("confirm-total").textContent = formatPKR(total);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderCheckoutSummary();
  setupCheckoutForm();
});
