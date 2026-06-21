import { getProductById, fetchAllProducts } from "../products.js";
import { addToCart } from "../cart.js";
import { initAuth } from "../auth.js";
import { formatCOP, getStockStatus, parseQueryParams } from "../format.js";
import { initLayout, renderProductCard, escapeHtml } from "../ui.js";

initAuth();
initLayout({ activeNav: "catalogo" });

const { id } = parseQueryParams();
let quantity = 1;
let product = null;

const content = document.getElementById("product-content");
const notFound = document.getElementById("not-found");
const modal = document.getElementById("description-modal");

async function load() {
  if (!id) {
    content.classList.add("hidden");
    notFound.classList.remove("hidden");
    return;
  }

  product = await getProductById(id);
  if (!product) {
    content.classList.add("hidden");
    notFound.classList.remove("hidden");
    return;
  }

  document.title = `FitZone | ${product.name}`;
  renderBreadcrumb(product);
  renderProduct(product);
  loadRelated(product);
}

function renderBreadcrumb(p) {
  document.getElementById("breadcrumb").innerHTML = `
    <a href="index.html" class="hover:text-primary">Inicio</a>
    <span>/</span>
    <a href="index.html" class="hover:text-primary">Catálogo</a>
    <span>/</span>
    <a href="busqueda.html?category=${encodeURIComponent(p.category)}" class="hover:text-primary">${escapeHtml(p.category)}</a>
    <span>/</span>
    <span class="text-primary font-semibold">${escapeHtml(p.name)}</span>`;
}

function renderProduct(p) {
  const stock = getStockStatus(p.stock);
  const specs = p.specs || {};
  const specList = Object.entries(specs)
    .map(([k, v]) => `<li><strong class="capitalize">${k}:</strong> ${escapeHtml(v)}</li>`)
    .join("");

  content.innerHTML = `
    <div>
      <button type="button" id="open-modal" class="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container-low group cursor-zoom-in">
        <img src="${p.imageUrl}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <span class="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">Click para ampliar descripción</span>
      </button>
      <div class="flex gap-3 mt-4">
        ${[p.imageUrl, p.imageUrl, p.imageUrl].map((url, i) => `<img src="${url}" alt="" class="w-20 h-20 object-cover rounded-lg border-2 ${i === 0 ? "border-primary" : "border-outline-variant"}">`).join("")}
      </div>
    </div>
    <div class="space-y-6">
      <span class="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded uppercase">${escapeHtml(p.category)}</span>
      <h1 class="text-3xl md:text-4xl font-bold text-primary">${escapeHtml(p.name)}</h1>
      <p class="text-secondary font-bold text-3xl">${formatCOP(p.price)}</p>
      <span class="inline-flex items-center gap-2 ${stock.badgeClass} text-sm font-bold px-3 py-1 rounded-full">
        <span class="w-2 h-2 rounded-full ${stock.dotClass}"></span>
        ${stock.label}${p.stock > 0 ? ` — ${p.stock} unidades disponibles` : ""}
      </span>
      <div>
        <h3 class="font-bold text-primary mb-2">Descripción</h3>
        <p class="text-on-surface-variant leading-relaxed">${escapeHtml(p.description)}</p>
        ${specList ? `<ul class="mt-4 space-y-1 text-sm text-on-surface-variant list-disc list-inside">${specList}</ul>` : ""}
      </div>
      <div class="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
        <label class="block font-bold text-primary mb-3">Cantidad</label>
        <div class="flex items-center gap-4 mb-4">
          <div class="flex items-center border border-outline-variant rounded-lg overflow-hidden">
            <button type="button" id="qty-minus" class="px-4 py-2 hover:bg-surface-container-low"><span class="material-symbols-outlined">remove</span></button>
            <span id="qty-display" class="px-6 font-bold">1</span>
            <button type="button" id="qty-plus" class="px-4 py-2 hover:bg-surface-container-low"><span class="material-symbols-outlined">add</span></button>
          </div>
          <p class="text-on-surface-variant">Subtotal: <strong id="subtotal" class="text-primary">${formatCOP(p.price)}</strong></p>
        </div>
        <button type="button" id="add-cart-btn" ${p.stock <= 0 ? "disabled" : ""} class="w-full bg-secondary-container text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          <span class="material-symbols-outlined">shopping_cart</span> Agregar al carrito
        </button>
      </div>
    </div>`;

  document.getElementById("qty-minus").addEventListener("click", () => updateQty(-1));
  document.getElementById("qty-plus").addEventListener("click", () => updateQty(1));
  document.getElementById("add-cart-btn").addEventListener("click", () => {
    if (p.stock <= 0) return;
    addToCart(p.id, quantity);
    window.location.href = "carrito.html";
  });
  document.getElementById("open-modal").addEventListener("click", () => openModal(p));
}

function updateQty(delta) {
  const max = product?.stock || 1;
  quantity = Math.max(1, Math.min(max, quantity + delta));
  document.getElementById("qty-display").textContent = quantity;
  document.getElementById("subtotal").textContent = formatCOP(product.price * quantity);
}

function openModal(p) {
  document.getElementById("modal-body").innerHTML = `
    <img src="${p.imageUrl}" alt="${escapeHtml(p.name)}" class="w-full rounded-lg mb-4 max-h-64 object-cover">
    <h2 class="text-2xl font-bold text-primary mb-2">${escapeHtml(p.name)}</h2>
    <p class="text-on-surface-variant mb-4">${escapeHtml(p.description)}</p>
    <p class="text-secondary font-bold text-xl mb-4">${formatCOP(p.price)}</p>
    <button type="button" id="modal-add-cart" class="w-full bg-secondary text-white py-3 rounded-lg font-bold">Agregar al carrito</button>`;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.getElementById("modal-add-cart")?.addEventListener("click", () => {
    addToCart(p.id, quantity);
    window.location.href = "carrito.html";
  });
}

document.getElementById("close-modal").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

async function loadRelated(p) {
  const all = await fetchAllProducts();
  const related = all.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  if (!related.length) return;
  document.getElementById("related-section").classList.remove("hidden");
  document.getElementById("related-grid").innerHTML = related.map((r) => renderProductCard(r)).join("");
}

load();
