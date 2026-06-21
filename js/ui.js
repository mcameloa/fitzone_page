import { LOGO_URL } from "./products-data.js";
import { getCartCount } from "./cart.js";
import { onAuthChange, logout, isLoggedIn } from "./auth.js";
import { formatCOP, getStockStatus, stockLabelWithCount } from "./format.js";

export const TAILWIND_CONFIG = `
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0a3d62",
        "on-primary": "#ffffff",
        secondary: "#FF6B35",
        "secondary-container": "#FF6B35",
        "on-secondary": "#ffffff",
        background: "#f9f9fc",
        "on-background": "#1a1c1e",
        surface: "#f9f9fc",
        "on-surface": "#1a1c1e",
        "surface-variant": "#e2e2e5",
        "on-surface-variant": "#42474e",
        outline: "#72777f",
        "outline-variant": "#c2c7cf",
        "surface-container": "#eeedf1",
        "surface-container-low": "#f4f3f6",
        "surface-container-lowest": "#ffffff",
        error: "#ba1a1a",
        "inverse-surface": "#2f3033",
      },
      borderRadius: { DEFAULT: "8px", lg: "8px", xl: "12px", full: "9999px" },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "16px",
        gutter: "24px",
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
      fontSize: {
        "display-xl": ["48px", { lineHeight: "56px", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px" }],
        "body-sm": ["14px", { lineHeight: "20px" }],
        "price-display": ["18px", { lineHeight: "24px", fontWeight: "700" }],
        "label-bold": ["12px", { lineHeight: "16px", fontWeight: "700" }],
      },
    },
  },
};
`;

export function injectHead(title) {
  document.title = title;
}

export function renderHeader(options = {}) {
  const { activeNav = "catalogo", searchQuery = "" } = options;
  const count = getCartCount();
  const el = document.getElementById("site-header");
  if (!el) return;

  const navClass = (key) =>
    key === activeNav
      ? "text-primary font-bold border-b-2 border-primary"
      : "text-on-surface-variant hover:text-primary transition-colors font-semibold";

  el.innerHTML = `
    <div class="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 max-w-full">
      <div class="flex items-center gap-8">
        <a href="index.html"><img src="${LOGO_URL}" alt="FitZone Logo" class="h-10 w-auto object-contain"></a>
        <nav class="hidden lg:flex items-center gap-6">
          <a class="${navClass("inicio")}" href="index.html">Inicio</a>
          <a class="${navClass("catalogo")}" href="index.html">Catálogo</a>
          <a class="${navClass("categorias")}" href="busqueda.html">Categorías</a>
        </nav>
      </div>
      <form class="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 w-64 lg:w-96 border border-outline-variant focus-within:border-primary transition-all mx-4" action="busqueda.html" method="get">
        <span class="material-symbols-outlined text-on-surface-variant">search</span>
        <input name="q" class="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/60" placeholder="Buscar productos por nombre..." type="search" value="${escapeHtml(searchQuery)}">
      </form>
      <div class="flex items-center gap-4 md:gap-6">
        <a id="auth-link" class="flex items-center gap-2 px-3 py-2 hover:bg-surface-container rounded-lg transition-colors" href="auth.html">
          <span class="material-symbols-outlined text-primary">person</span>
          <span id="auth-label" class="text-sm font-semibold text-primary hidden sm:inline">Iniciar sesión</span>
        </a>
        <a href="carrito.html" class="p-2 hover:bg-surface-container rounded-full transition-colors relative" aria-label="Carrito">
          <span class="material-symbols-outlined text-primary">shopping_bag</span>
          <span id="cart-badge" class="absolute top-1 right-1 bg-secondary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ${count ? "" : "hidden"}">${count || ""}</span>
        </a>
      </div>
    </div>`;

  updateAuthUI();
}

export function updateAuthUI() {
  const label = document.getElementById("auth-label");
  const link = document.getElementById("auth-link");
  if (!label || !link) return;

  if (isLoggedIn()) {
    label.textContent = "Cerrar sesión";
    link.href = "#";
    link.onclick = async (e) => {
      e.preventDefault();
      await logout();
      window.location.href = "index.html";
    };
  } else {
    label.textContent = "Iniciar sesión";
    link.href = "auth.html";
    link.onclick = null;
  }
}

export function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <footer class="bg-primary text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 md:px-margin-desktop py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="${LOGO_URL}" alt="FitZone" class="h-8 w-auto mb-4 brightness-0 invert opacity-90">
          <p class="text-sm opacity-80">Rendimiento con estilo. Ropa deportiva premium para atletas exigentes.</p>
        </div>
        <div class="space-y-2">
          <h4 class="font-bold mb-2">Tienda</h4>
          <a class="block opacity-80 hover:opacity-100 hover:text-secondary text-sm" href="index.html">Catálogo</a>
          <a class="block opacity-80 hover:opacity-100 hover:text-secondary text-sm" href="busqueda.html">Búsqueda avanzada</a>
          <a class="block opacity-80 hover:opacity-100 hover:text-secondary text-sm" href="carrito.html">Carrito</a>
        </div>
        <div class="space-y-2">
          <h4 class="font-bold mb-2">Información</h4>
          <a class="block opacity-80 hover:text-secondary text-sm" href="#">Sobre nosotros</a>
          <a class="block opacity-80 hover:text-secondary text-sm" href="#">Contacto</a>
          <a class="block opacity-80 hover:text-secondary text-sm" href="#">Términos</a>
          <a class="block opacity-80 hover:text-secondary text-sm" href="#">Privacidad</a>
        </div>
      </div>
      <div class="border-t border-white/10 text-center py-4 text-sm opacity-70">
        © 2026 FitZone — Proyecto TSP Politécnico Grancolombiano
      </div>
    </footer>`;
}

export function renderProductCard(product, options = {}) {
  const { linkName = false, compact = false } = options;
  const stock = getStockStatus(product.stock);
  const nameHtml = linkName
    ? `<a href="producto.html?id=${encodeURIComponent(product.id)}" class="hover:underline">${escapeHtml(product.name)}</a>`
    : escapeHtml(product.name);

  const btnDisabled = product.stock <= 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary";
  const btnAttrs = product.stock <= 0 ? "disabled" : `data-add-cart="${product.id}"`;

  if (compact) {
    return `
      <div class="group border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <a href="producto.html?id=${encodeURIComponent(product.id)}" class="relative aspect-[4/5] bg-surface-container-low overflow-hidden block">
          <img src="${product.imageUrl}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
          <span class="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">${escapeHtml(product.category)}</span>
        </a>
        <div class="p-4 space-y-3 flex-1 flex flex-col">
          <div class="flex justify-between items-start gap-2">
            <h4 class="text-body-lg font-bold text-primary line-clamp-1">${nameHtml}</h4>
            <span class="${stock.badgeClass} text-[10px] font-bold px-2 py-0.5 rounded shrink-0">${stock.label}</span>
          </div>
          <p class="text-secondary font-bold text-price-display">${formatCOP(product.price)}</p>
          <button ${btnAttrs} class="w-full mt-auto bg-primary text-white py-3 rounded-lg font-bold uppercase text-xs flex items-center justify-center gap-2 transition-all ${btnDisabled}">
            <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span> Agregar al carrito
          </button>
        </div>
      </div>`;
  }

  return `
    <div class="group bg-white rounded-xl border border-outline-variant overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <a href="producto.html?id=${encodeURIComponent(product.id)}" class="relative aspect-square bg-surface-container-low overflow-hidden block">
        <img src="${product.imageUrl}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <span class="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">${escapeHtml(product.category)}</span>
      </a>
      <div class="p-5 flex flex-col flex-1">
        <h3 class="font-title-md text-primary mb-1 line-clamp-1">${nameHtml}</h3>
        <div class="flex items-center gap-1 mb-3">
          ${[1, 2, 3, 4].map(() => '<span class="material-symbols-outlined text-[16px] text-yellow-500" style="font-variation-settings:\'FILL\' 1">star</span>').join("")}
          <span class="material-symbols-outlined text-[16px] text-on-surface-variant/40">star</span>
        </div>
        <div class="flex justify-between items-end mt-auto gap-2">
          <div>
            <p class="text-secondary font-bold text-xl">${formatCOP(product.price)}</p>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${stock.classes} mt-1">${stockLabelWithCount(product.stock)}</span>
          </div>
          <button ${btnAttrs} class="bg-primary text-white h-12 px-4 flex items-center justify-center gap-2 rounded-lg transition-colors active:scale-95 ${btnDisabled}">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <span class="hidden xl:inline text-xs font-bold uppercase">Agregar</span>
          </button>
        </div>
      </div>
    </div>`;
}

export function bindAddToCart(container) {
  container?.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-add-cart]");
    if (!btn || btn.disabled) return;
    const { addToCart } = await import("./cart.js");
    addToCart(btn.dataset.addCart, 1);
    updateCartBadge();
    btn.classList.add("ring-2", "ring-secondary");
    setTimeout(() => btn.classList.remove("ring-2", "ring-secondary"), 400);
  });
}

export function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0);
}

export function initLayout(options = {}) {
  renderHeader(options);
  renderFooter();
  bindAddToCart(document.body);
  window.addEventListener("fitzone:cart-updated", updateCartBadge);
  onAuthChange(() => updateAuthUI());
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export { escapeHtml };
