/* ======================================================================
   AM_WHOLESALER.PK — Floating WhatsApp Button (shared component)
   Included on every page via <script src="js/whatsapp.js"></script>.
   This is the ONLY place the button is defined, so it can never be
   duplicated: each page just loads this one file and the button is
   injected once, after checking it isn't already present.
====================================================================== */

(function () {
  "use strict";

  // Guard: never insert the button twice, even if this script
  // accidentally gets included more than once on a page.
  if (document.getElementById("wa-float-btn")) return;

  var phoneNumber = (typeof WHATSAPP_NUMBER !== "undefined") ? WHATSAPP_NUMBER : "923110211468";
  var prefillMessage = (typeof WHATSAPP_PREFILL !== "undefined")
    ? WHATSAPP_PREFILL
    : "Hello! I would like to know more about your products.";

  var waLink = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(prefillMessage);

  // Build the button as an <a> tag so it works even if JS click handling
  // ever fails — it is a real link, not just a JS-only interaction.
  var btn = document.createElement("a");
  btn.id = "wa-float-btn";
  btn.className = "wa-float-btn";
  btn.href = waLink;
  btn.target = "_blank";
  btn.rel = "noopener noreferrer";
  btn.setAttribute("aria-label", "Chat with us on WhatsApp");

  // Official WhatsApp glyph (inline SVG so no external image request is needed)
  btn.innerHTML =
    '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
    '<path d="M16.004 3C9.38 3 4 8.373 4 15c0 2.646.86 5.097 2.33 7.09L5 29l7.1-2.27A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.07c-.3.84-1.47 1.55-2.42 1.75-.64.13-1.47.24-4.27-.92-3.58-1.48-5.89-5.1-6.07-5.34-.18-.24-1.45-1.93-1.45-3.68 0-1.75.91-2.6 1.24-2.96.32-.35.7-.44.94-.44.23 0 .47.002.68.012.22.01.51-.082.8.61.3.72.99 2.5 1.08 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.93 1.54 2 2.49 1.37 1.22 2.52 1.6 2.88 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.86-.21 1.7Z"/>' +
    "</svg>" +
    '<span class="wa-tooltip" role="tooltip">Chat with us on WhatsApp</span>';

  document.body.appendChild(btn);
})();
