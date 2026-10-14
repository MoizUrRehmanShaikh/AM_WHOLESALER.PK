/* ===================================================================
   AM_WHOLESALER.PK — Product Catalog
   Single source of truth for every product on the site.
   Every item is part of the "100/= Rupees Sale" as requested, so the
   base title is shared across all products with a short descriptor
   appended for search, filtering and readability.
=================================================================== */

const STORE_NAME = "AM_WHOLESALER.PK";
const SALE_TAG = "100/= Rupees Sale";
const WHATSAPP_NUMBER = "923110211468";
const WHATSAPP_PREFILL = "Hello! I would like to know more about your products.";

/* category keys used for filtering */
const CATEGORIES = {
  earrings: "Earrings",
  rings: "Rings",
  hairties: "Hair Accessories",
  beauty: "Beauty Tools",
};

const PRODUCTS = [
  {
    id: "p01",
    title: `${STORE_NAME} ${SALE_TAG} — Crystal Star Drop Earrings`,
    short: "Crystal Star Drop Earrings",
    category: "earrings",
    price: 100,
    mrp: 450,
    rating: 4.8,
    reviews: 132,
    stock: 42,
    image: "assets/images/p01-crystal-star-earrings.jpg",
    images: ["assets/images/p01-crystal-star-earrings.jpg"],
    badge: "Best Seller",
    description:
      "Sparkling star-cut crystal drop earrings on a dainty huggie hoop. Catches the light beautifully and dresses up any outfit in seconds.",
    specs: { Material: "Alloy + Cubic Zirconia", Closure: "Huggie hoop", Color: "Rose Gold / Clear", Weight: "6 g (pair)" },
  },
  {
    id: "p02",
    title: `${STORE_NAME} ${SALE_TAG} — Gold Leaf Stud Earrings`,
    short: "Gold Leaf Stud Earrings",
    category: "earrings",
    price: 100,
    mrp: 380,
    rating: 4.6,
    reviews: 87,
    stock: 55,
    image: "assets/images/p02-gold-leaf-studs.jpg",
    images: ["assets/images/p02-gold-leaf-studs.jpg"],
    badge: "New",
    description:
      "Delicate leaf-shaped studs lined with sparkling stones on a 925 silver post. Lightweight enough for everyday wear.",
    specs: { Material: "Gold-plated, 925 Silver Post", Closure: "Push back", Color: "Gold", Weight: "3 g (pair)" },
  },
  {
    id: "p03",
    title: `${STORE_NAME} ${SALE_TAG} — Silver Curve Drop Earrings`,
    short: "Silver Curve Drop Earrings",
    category: "earrings",
    price: 100,
    mrp: 420,
    rating: 4.5,
    reviews: 64,
    stock: 30,
    image: "assets/images/p03-silver-drop-earrings.jpg",
    images: ["assets/images/p03-silver-drop-earrings.jpg"],
    badge: "",
    description:
      "Sculptural wave-curve drop earrings finished in polished silver with twin crystal accents. A modern, minimal statement piece.",
    specs: { Material: "925 Silver Post Alloy", Closure: "Fish hook", Color: "Silver", Weight: "5 g (pair)" },
  },
  {
    id: "p04",
    title: `${STORE_NAME} ${SALE_TAG} — Rose Gold Hoop & Ball Drops`,
    short: "Rose Gold Hoop & Ball Drops",
    category: "earrings",
    price: 100,
    mrp: 500,
    rating: 4.7,
    reviews: 98,
    stock: 25,
    image: "assets/images/p04-rosegold-hoop-earrings.jpg",
    images: ["assets/images/p04-rosegold-hoop-earrings.jpg"],
    badge: "Trending",
    description:
      "Statement hammered-disc studs paired with a beaded two-tone hoop and gold ball drop — bold enough for a night out.",
    specs: { Material: "Alloy", Closure: "Push back", Color: "Rose Gold / Silver", Weight: "12 g (pair)" },
  },
  {
    id: "p05",
    title: `${STORE_NAME} ${SALE_TAG} — Olive Pompom Logo Earrings`,
    short: "Olive Pompom Logo Earrings",
    category: "earrings",
    price: 100,
    mrp: 350,
    rating: 4.4,
    reviews: 41,
    stock: 38,
    image: "assets/images/p05-olive-pompom-earrings.jpg",
    images: ["assets/images/p05-olive-pompom-earrings.jpg"],
    badge: "",
    description:
      "Cozy wool pompom drop earrings with a chic emblem charm. A soft-texture statement piece for the cooler months.",
    specs: { Material: "Wool + Alloy", Closure: "Fish hook", Color: "Olive Green", Weight: "8 g (pair)" },
  },
  {
    id: "p06",
    title: `${STORE_NAME} ${SALE_TAG} — Pearl & Gold Bar Drop Earrings`,
    short: "Pearl & Gold Bar Drop Earrings",
    category: "earrings",
    price: 100,
    mrp: 480,
    rating: 4.9,
    reviews: 156,
    stock: 20,
    image: "assets/images/p06-pearl-drop-earrings.jpg",
    images: ["assets/images/p06-pearl-drop-earrings.jpg"],
    badge: "Best Seller",
    description:
      "Oversized pearl studs anchor an openwork gold ladder bar with a dramatic pearl drop. Elegant, vintage-inspired design.",
    specs: { Material: "Alloy + Faux Pearl", Closure: "Push back", Color: "Gold / Ivory", Weight: "14 g (pair)" },
  },
  {
    id: "p07",
    title: `${STORE_NAME} ${SALE_TAG} — Crystal Bar Ear Climbers`,
    short: "Crystal Bar Ear Climbers",
    category: "earrings",
    price: 100,
    mrp: 400,
    rating: 4.6,
    reviews: 73,
    stock: 46,
    image: "assets/images/p07-crystal-bar-studs.jpg",
    images: ["assets/images/p07-crystal-bar-studs.jpg"],
    badge: "",
    description:
      "A row of five sparkling crystals forms a sleek ear-climber silhouette. Minimal, elegant and easy to dress up or down.",
    specs: { Material: "Silver 925", Closure: "Push back", Color: "Gold / Pink Crystal", Weight: "2 g (pair)" },
  },
  {
    id: "p08",
    title: `${STORE_NAME} ${SALE_TAG} — Matte Gold Twist Hoops`,
    short: "Matte Gold Twist Hoops",
    category: "earrings",
    price: 100,
    mrp: 420,
    rating: 4.5,
    reviews: 58,
    stock: 33,
    image: "assets/images/p08-matte-gold-hoops.jpg",
    images: ["assets/images/p08-matte-gold-hoops.jpg"],
    badge: "New",
    description:
      "Brushed matte-gold hoops with a sculptural twist. Lightweight, comfortable and a wardrobe staple for everyday wear.",
    specs: { Material: "925 Silver Post Alloy", Closure: "Fish hook", Color: "Matte Gold", Weight: "9 g (pair)" },
  },
  {
    id: "p09",
    title: `${STORE_NAME} ${SALE_TAG} — Butterfly Crystal Open Rings (Set of 2)`,
    short: "Butterfly Crystal Open Rings",
    category: "rings",
    price: 100,
    mrp: 300,
    rating: 4.7,
    reviews: 112,
    stock: 60,
    image: "assets/images/p09-butterfly-rings.jpg",
    images: ["assets/images/p09-butterfly-rings.jpg"],
    badge: "Best Seller",
    description:
      "Adjustable butterfly open rings with a sparkling textured wing and crystal tip. Set of two in silver and gold tones.",
    specs: { Material: "Alloy", Size: "Adjustable (free size)", Color: "Silver + Gold", Weight: "4 g (pair)" },
  },
  {
    id: "p10",
    title: `${STORE_NAME} ${SALE_TAG} — Stainless Steel Ear Cleaning Kit`,
    short: "Stainless Steel Ear Cleaning Kit",
    category: "beauty",
    price: 100,
    mrp: 280,
    rating: 4.3,
    reviews: 29,
    stock: 70,
    image: "assets/images/p10-ear-cleaning-kit.jpg",
    images: ["assets/images/p10-ear-cleaning-kit.jpg"],
    badge: "",
    description:
      "A 6-piece reusable stainless-steel ear cleaning set in a slim leather carry case with snap-flip closure. Gentle and travel-ready.",
    specs: { Material: "Stainless Steel", Pieces: "6 tools + case", Color: "Yellow Case", Reusable: "Yes" },
  },
  {
    id: "p11",
    title: `${STORE_NAME} ${SALE_TAG} — Coral Satin Bow Hair Ties (Pack of 2)`,
    short: "Coral Satin Bow Hair Ties",
    category: "hairties",
    price: 100,
    mrp: 250,
    rating: 4.6,
    reviews: 47,
    stock: 80,
    image: "assets/images/p11-coral-bow-hairties.jpg",
    images: ["assets/images/p11-coral-bow-hairties.jpg"],
    badge: "",
    description:
      "Soft satin bow hair ties that are gentle on hair and add a pretty finishing touch to any hairstyle. Pack of 2.",
    specs: { Material: "Satin Ribbon + Elastic", Pack: "2 pieces", Color: "Coral Pink" },
  },
  {
    id: "p12",
    title: `${STORE_NAME} ${SALE_TAG} — Emerald Satin Bow Hair Ties (Pack of 2)`,
    short: "Emerald Satin Bow Hair Ties",
    category: "hairties",
    price: 100,
    mrp: 250,
    rating: 4.6,
    reviews: 39,
    stock: 80,
    image: "assets/images/p12-emerald-bow-hairties.jpg",
    images: ["assets/images/p12-emerald-bow-hairties.jpg"],
    badge: "",
    description:
      "Rich emerald-green satin bow hair ties — a deep jewel tone that pairs perfectly with both casual and dressy looks. Pack of 2.",
    specs: { Material: "Satin Ribbon + Elastic", Pack: "2 pieces", Color: "Emerald Green" },
  },
  {
    id: "p13",
    title: `${STORE_NAME} ${SALE_TAG} — Lilac Satin Bow Hair Ties (Pack of 2)`,
    short: "Lilac Satin Bow Hair Ties",
    category: "hairties",
    price: 100,
    mrp: 250,
    rating: 4.5,
    reviews: 33,
    stock: 80,
    image: "assets/images/p13-lilac-bow-hairties.jpg",
    images: ["assets/images/p13-lilac-bow-hairties.jpg"],
    badge: "",
    description:
      "Soft lilac satin bow hair ties with a smooth sheen finish. A gentle pastel pick that suits every hair color. Pack of 2.",
    specs: { Material: "Satin Ribbon + Elastic", Pack: "2 pieces", Color: "Lilac" },
  },
  {
    id: "p14",
    title: `${STORE_NAME} ${SALE_TAG} — Sky Blue Satin Bow Hair Ties (Pack of 2)`,
    short: "Sky Blue Satin Bow Hair Ties",
    category: "hairties",
    price: 100,
    mrp: 250,
    rating: 4.7,
    reviews: 51,
    stock: 80,
    image: "assets/images/p14-skyblue-bow-hairties.jpg",
    images: ["assets/images/p14-skyblue-bow-hairties.jpg"],
    badge: "New",
    description:
      "Crisp sky-blue satin bow hair ties, finished with a neat knot and secure elastic band. Pack of 2.",
    specs: { Material: "Satin Ribbon + Elastic", Pack: "2 pieces", Color: "Sky Blue" },
  },
  {
    id: "p15",
    title: `${STORE_NAME} ${SALE_TAG} — 36H Waterproof Eyeliner Pen`,
    short: "36H Waterproof Eyeliner Pen",
    category: "beauty",
    price: 100,
    mrp: 320,
    rating: 4.4,
    reviews: 68,
    stock: 90,
    image: "assets/images/p15-eyeliner-pen.jpg",
    images: ["assets/images/p15-eyeliner-pen.jpg"],
    badge: "",
    description:
      "Long-lasting, smudge-proof liquid eyeliner pen with a fine precision tip for sharp wings or a soft everyday line.",
    specs: { Type: "Liquid Eyeliner Pen", Finish: "Matte Black", "Wear Time": "Up to 36 hours", "Net Wt": "2.5 g" },
  },
  {
    id: "p16",
    title: `${STORE_NAME} ${SALE_TAG} — Handmade Glitter Star Press-On Nails`,
    short: "Glitter Star Press-On Nails",
    category: "beauty",
    price: 100,
    mrp: 300,
    rating: 4.5,
    reviews: 44,
    stock: 50,
    image: "assets/images/p16-nail-art-set.jpg",
    images: ["assets/images/p16-nail-art-set.jpg"],
    badge: "",
    description:
      "Handmade coffin-shaped press-on nails with a soft nude glitter finish and star accents. Includes both left and right sets.",
    specs: { Type: "Press-On Nails", Shape: "Coffin", Pieces: "Full set (L+R)", Finish: "Glitter Nude" },
  },
];

/* Helper: format a price as PKR currency string */
function formatPKR(amount) {
  return "Rs. " + Number(amount).toLocaleString("en-PK");
}

/* Helper: get a product by id */
function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* Shared, recognizable WhatsApp glyph (inline SVG, no external image request) —
   reused by every "Order on WhatsApp" button across the product cards,
   product detail page and the navbar/floating buttons. */
const WHATSAPP_ICON_SVG =
  '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.004 3C9.38 3 4 8.373 4 15c0 2.646.86 5.097 2.33 7.09L5 29l7.1-2.27A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.07c-.3.84-1.47 1.55-2.42 1.75-.64.13-1.47.24-4.27-.92-3.58-1.48-5.89-5.1-6.07-5.34-.18-.24-1.45-1.93-1.45-3.68 0-1.75.91-2.6 1.24-2.96.32-.35.7-.44.94-.44.23 0 .47.002.68.012.22.01.51-.082.8.61.3.72.99 2.5 1.08 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.36.93 1.54 2 2.49 1.37 1.22 2.52 1.6 2.88 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.86-.21 1.7Z"/></svg>';

/* Builds a WhatsApp "wa.me" link pre-filled with an order message for a
   specific product (and quantity), so a click goes straight into a chat
   that already names what the customer wants to buy. */
function buildWhatsAppOrderLink(product, qty) {
  qty = qty || 1;
  var lineTotal = product.price * qty;
  var message =
    "Hello! I would like to order:\n" +
    "- " + product.short + " (Qty: " + qty + ")\n" +
    "Price: " + formatPKR(lineTotal) + "\n\n" +
    "Please confirm availability.";
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}
