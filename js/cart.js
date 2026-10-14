/* ======================================================================
   AM_WHOLESALER.PK — cart.js
   Renders the shopping cart table, handles quantity changes, item
   removal, subtotal/total calculation, and the free-shipping
   progress bar. Cart data is persisted in localStorage (see main.js).
====================================================================== */

var FREE_SHIPPING_THRESHOLD = 1000; // PKR — demo threshold
var SHIPPING_FEE = 150;

function getCartItemsWithData() {
  return readCart()
    .map(function (item) {
      var product = getProductById(item.id);
      return product ? { product: product, qty: item.qty } : null;
    })
    .filter(Boolean);
}

function cartRowHTML(entry) {
  var p = entry.product;
  var lineTotal = p.price * entry.qty;
  return (
    '<tr class="cart-row" data-id="' + p.id + '">' +
      "<td>" +
        '<div class="cart-prod">' +
          '<a href="product-details.html?id=' + p.id + '"><img src="' + p.image + '" alt="' + p.short + '"></a>' +
          "<div>" +
            '<a class="cp-name" href="product-details.html?id=' + p.id + '">' + p.short + "</a>" +
            '<div class="cp-cat">' + CATEGORIES[p.category] + "</div>" +
            '<button class="cart-remove" onclick="removeCartItem(\'' + p.id + '\')">Remove</button>' +
          "</div>" +
        "</div>" +
      "</td>" +
      "<td>" + formatPKR(p.price) + "</td>" +
      "<td>" +
        '<div class="qty-stepper">' +
          '<button aria-label="Decrease quantity" onclick="changeCartQty(\'' + p.id + '\', -1)">−</button>' +
          '<input type="number" min="1" max="' + p.stock + '" value="' + entry.qty + '" onchange="setCartQty(\'' + p.id + '\', this.value)">' +
          '<button aria-label="Increase quantity" onclick="changeCartQty(\'' + p.id + '\', 1)">+</button>' +
        "</div>" +
      "</td>" +
      '<td class="line-total">' + formatPKR(lineTotal) + "</td>" +
    "</tr>"
  );
}

function renderCart() {
  var tbody = document.getElementById("cart-body");
  var emptyState = document.getElementById("cart-empty-state");
  var tableWrap = document.getElementById("cart-table-wrap");
  if (!tbody) return;

  var entries = getCartItemsWithData();

  if (entries.length === 0) {
    tableWrap.style.display = "none";
    emptyState.style.display = "block";
    document.getElementById("cart-summary").style.display = "none";
    return;
  }

  tableWrap.style.display = "block";
  emptyState.style.display = "none";
  document.getElementById("cart-summary").style.display = "block";

  tbody.innerHTML = entries.map(cartRowHTML).join("");

  var subtotal = entries.reduce(function (sum, e) { return sum + e.product.price * e.qty; }, 0);
  var shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  var total = subtotal + shipping;

  document.getElementById("cart-subtotal").textContent = formatPKR(subtotal);
  document.getElementById("cart-shipping").textContent = shipping === 0 ? "Free" : formatPKR(shipping);
  document.getElementById("cart-total").textContent = formatPKR(total);

  // shipping progress bar
  var remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  var pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  var progLabel = document.getElementById("shipping-progress-label");
  document.getElementById("shipping-progress-fill").style.width = pct + "%";
  progLabel.textContent = remaining > 0
    ? "Add " + formatPKR(remaining) + " more for FREE shipping!"
    : "🎉 You've unlocked free shipping!";
}

function changeCartQty(id, delta) {
  var cart = readCart();
  var item = cart.find(function (i) { return i.id === id; });
  if (!item) return;
  var product = getProductById(id);
  item.qty = Math.min(Math.max(item.qty + delta, 1), product.stock);
  writeCart(cart);
  renderCart();
}

function setCartQty(id, value) {
  var cart = readCart();
  var item = cart.find(function (i) { return i.id === id; });
  if (!item) return;
  var product = getProductById(id);
  var v = parseInt(value, 10);
  if (isNaN(v) || v < 1) v = 1;
  if (v > product.stock) v = product.stock;
  item.qty = v;
  writeCart(cart);
  renderCart();
}

function removeCartItem(id) {
  var cart = readCart().filter(function (i) { return i.id !== id; });
  writeCart(cart);
  renderCart();
  showToast("Item removed from cart", "success");
}

document.addEventListener("DOMContentLoaded", renderCart);
