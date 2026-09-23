/* =====================================================
   EIGENGRAU NFC — SETTINGS (edit only this section)
   ===================================================== */
const CONFIG = {
  email: "Eigengrau.nfc@gmail.com",           // YOUR_EMAIL

  // Social links. Replace each YOUR_..._URL with the full https:// link.
  instagram: "YOUR_INSTAGRAM_URL",            // e.g. https://instagram.com/EigengrauNFC
  facebook:  "YOUR_FACEBOOK_URL",             // e.g. https://facebook.com/yourpage
  tiktok:    "YOUR_TIKTOK_URL",               // e.g. https://tiktok.com/@EigengrauNFC

  // Where the demo / order / custom buttons go.
  // Default is email. To use Messenger instead, set the value to
  // "YOUR_MESSENGER_URL" (e.g. https://m.me/yourpage).
  demoLink:   "email",
  orderLink:  "email",
  customLink: "email",

  // Pricing (single place to change prices, in pesos).
  currency: "₱",
  plans: [
    { name: "Standard", price: 399, featured: false,
      items: ["NFC card", "Acrylic stand", "Eigengrau design", "NFC setup"] },
    { name: "Customized", price: 499, featured: true,
      items: ["NFC card", "Acrylic stand", "Customized design", "Business logo", "NFC setup"] }
  ],

  // Product photos. Put files in the images/ folder and match the names here.
  images: {
    hero:     "images/product-hero.jpg",      // YOUR_PRODUCT_IMAGE
    product:  "images/product-main.jpg",
    gallery1: "images/design-1.jpg",
    gallery2: "images/design-2.jpg",
    gallery3: "images/design-3.jpg"
  }
};
/* ===================== END SETTINGS ===================== */

(function () {
  const mail = (subject) => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}`;
  const target = (mode, subject) => mode === "email" ? mail(subject) : mode;
  const links = {
    email: mail("Eigengrau NFC inquiry"),
    instagram: CONFIG.instagram, facebook: CONFIG.facebook, tiktok: CONFIG.tiktok,
    demo: target(CONFIG.demoLink, "Demo request"),
    order: target(CONFIG.orderLink, "Order inquiry"),
    custom: target(CONFIG.customLink, "Custom design request")
  };

  // Links
  document.querySelectorAll("[data-link]").forEach((a) => { a.href = links[a.dataset.link]; });
  document.querySelectorAll("[data-text=email]").forEach((a) => { a.textContent = CONFIG.email; });

  // Pricing cards
  document.getElementById("plans").innerHTML = CONFIG.plans.map((p) => `
    <article class="card plan${p.featured ? " feat" : ""}">
      <h3>${p.name}</h3>
      <p class="price">${CONFIG.currency}${p.price}</p>
      <ul>${p.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      <a class="btn ${p.featured ? "btn-primary" : "btn-ghost"}" href="${links.order}">Order / Inquire</a>
    </article>`).join("");

  // Photos: use the real image if the file exists, otherwise keep the placeholder
  document.querySelectorAll("[data-img]").forEach((box) => {
    const img = new Image();
    img.alt = box.dataset.alt || "";
    img.loading = "lazy";
    img.onload = () => { box.appendChild(img); box.classList.add("loaded"); };
    img.src = CONFIG.images[box.dataset.img];
  });

  // Mobile menu
  const burger = document.getElementById("burger"), menu = document.getElementById("menu");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
})();
