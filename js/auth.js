/* ======================================================================
   AM_WHOLESALER.PK — auth.js
   Frontend-only login / registration DEMO. This validates input and
   shows success/error states, but it does NOT create real accounts
   or authenticate against any backend/database. A production site
   needs a real backend (and hashed password storage) wired up.
====================================================================== */

function setupLoginForm() {
  var form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = form.querySelector("#login-email");
    var password = form.querySelector("#login-password");
    var msg = document.getElementById("login-msg");

    var validEmail = validateField(email, function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
    var validPassword = validateField(password, function (v) { return v.length >= 6; });

    if (!(validEmail && validPassword)) {
      msg.textContent = "Please correct the highlighted fields.";
      msg.className = "form-msg error";
      return;
    }

    msg.textContent = "Demo sign-in successful — redirecting...";
    msg.className = "form-msg success";
    setTimeout(function () { window.location.href = "index.html"; }, 900);
  });
}

function setupRegisterForm() {
  var form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.querySelector("#reg-name");
    var email = form.querySelector("#reg-email");
    var password = form.querySelector("#reg-password");
    var confirm = form.querySelector("#reg-confirm");
    var msg = document.getElementById("register-msg");

    var validName = validateField(name, function (v) { return v.length >= 2; });
    var validEmail = validateField(email, function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); });
    var validPassword = validateField(password, function (v) { return v.length >= 6; });
    var validConfirm = validateField(confirm, function (v) { return v === password.value.trim() && v.length >= 6; });

    if (!(validName && validEmail && validPassword && validConfirm)) {
      msg.textContent = "Please correct the highlighted fields.";
      msg.className = "form-msg error";
      return;
    }

    msg.textContent = "Demo account created — redirecting to sign in...";
    msg.className = "form-msg success";
    setTimeout(function () { window.location.href = "login.html"; }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupLoginForm();
  setupRegisterForm();
});
