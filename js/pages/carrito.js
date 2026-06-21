import { resolveCartProducts, updateQuantity, removeFromCart, cartSubtotal } from "../cart.js";
import { getProductById } from "../products.js";
import { initAuth, isLoggedIn, onAuthChange } from "../auth.js";
import { formatCOP } from "../format.js";
import { initLayout, escapeHtml } from "../ui.js";

initAuth();
initLayout({ activeNav: "catalogo" });

const emptyEl = document.getElementById("empty-cart");
const layoutEl = document.getElementById("cart-layout");
const itemsEl = document.getElementById("cart-items");
const headerEl = document.getElementById("cart-header");
const checkoutBtn = document.getElementById("checkout-btn");
const tooltip = document.getElementById("checkout-tooltip");

function updateCheckoutButton() {
  const loggedIn = isLoggedIn();
  checkoutBtn.disabled = !loggedIn;
  tooltip.classList.toggle("hidden", loggedIn);
  if (loggedIn) {
    checkoutBtn.onclick = () => {
      alert("¡Pedido simulado confirmado! Gracias por comprar en FitZone.");
    };
  } else {
    checkoutBtn.onclick = () => {
      window.location.href = "auth.html?redirect=carrito.html";
    };
  }
}

onAuthChange(updateCheckoutButton);

async function renderCart() {
  const lines = await resolveCartProducts(getProductById);
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  if (!lines.length) {
    emptyEl.classList.remove("hidden");
    layoutEl.classList.add("hidden");
    headerEl.innerHTML = "";
    return;
  }

  emptyEl.classList.add("hidden");
  layoutEl.classList.remove("hidden");
  headerEl.innerHTML = `
    <h1 class="text-3xl font-bold text-primary">Carrito de compras</h1>
    <p class="text-on-surface-variant mt-1">${count} artículo${count !== 1 ? "s" : ""} en tu carrito</p>`;

  itemsEl.innerHTML = lines
    .map((line) => {
      const p = line.product;
      const lineTotal = p.price * line.quantity;
      const lowStock = p.stock > 0 && line.quantity >= p.stock;
      return `
        <article class="bg-surface-container-lowest border border-outline-variant p-4 flex flex-col md:flex-row gap-6 items-center rounded-lg">
          <a href="producto.html?id=${encodeURIComponent(p.id)}" class="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0">
            <img src="${p.imageUrl}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover">
          </a>
          <div class="flex-grow flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
            <div>
              <h3 class="font-bold text-primary">${escapeHtml(p.name)}</h3>
              <p class="text-sm text-on-surface-variant">${formatCOP(p.price)}</p>
              ${lowStock ? `<p class="text-amber-600 text-xs mt-1">Solo quedan ${p.stock} unidades</p>` : ""}
            </div>
            <div class="flex items-center gap-6">
              <div class="flex items-center border border-outline-variant rounded-lg overflow-hidden">
                <button type="button" data-qty-minus="${p.id}" class="px-3 py-1 hover:bg-surface-container-low"><span class="material-symbols-outlined text-sm">remove</span></button>
                <span class="px-4 font-bold">${line.quantity}</span>
                <button type="button" data-qty-plus="${p.id}" class="px-3 py-1 hover:bg-surface-container-low"><span class="material-symbols-outlined text-sm">add</span></button>
              </div>
              <div class="text-right min-w-[100px]">
                <p class="font-bold text-primary">${formatCOP(lineTotal)}</p>
                <button type="button" data-remove="${p.id}" class="flex items-center gap-1 text-error text-sm mt-1 hover:underline ml-auto">
                  <span class="material-symbols-outlined text-base">delete</span> Eliminar
                </button>
              </div>
            </div>
          </div>
        </article>`;
    })
    .join("");

  const subtotal = cartSubtotal(lines);
  document.getElementById("summary-subtotal").textContent = formatCOP(subtotal);
  document.getElementById("summary-total").textContent = formatCOP(subtotal);

  itemsEl.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.qtyMinus;
      const line = lines.find((l) => l.productId === id);
      updateQuantity(id, (line?.quantity || 1) - 1);
      await renderCart();
    });
  });
  itemsEl.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.qtyPlus;
      const line = lines.find((l) => l.productId === id);
      const p = line?.product;
      const next = (line?.quantity || 0) + 1;
      if (p && next > p.stock) return;
      updateQuantity(id, next);
      await renderCart();
    });
  });
  itemsEl.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      removeFromCart(btn.dataset.remove);
      await renderCart();
    });
  });
}

renderCart();
updateCheckoutButton();
