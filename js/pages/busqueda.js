import { fetchAllProducts, filterProducts, paginate } from "../products.js";
import { initAuth } from "../auth.js";
import { parseQueryParams } from "../format.js";
import { initLayout, renderProductCard } from "../ui.js";

initAuth();

const params = parseQueryParams();
const q = params.q || "";
const page = Number(params.page) || 1;
const sort = params.sort || "relevance";

initLayout({ activeNav: "categorias", searchQuery: q });

const form = document.getElementById("search-form");
const hiddenQ = document.getElementById("hidden-q");
hiddenQ.value = q;

if (params.minPrice) form.minPrice.value = params.minPrice;
if (params.maxPrice) form.maxPrice.value = params.maxPrice;
if (params.sort) document.getElementById("sort-select").value = params.sort;

const categories = params.category
  ? (Array.isArray(params.category) ? params.category : params.category.split(","))
  : [];
categories.forEach((c) => {
  const cb = form.querySelector(`input[name="category"][value="${c}"]`);
  if (cb) cb.checked = true;
});

const stocks = params.stock
  ? (Array.isArray(params.stock) ? params.stock : params.stock.split(","))
  : ["in", "low", "out"];
form.querySelectorAll('input[name="stock"]').forEach((cb) => {
  cb.checked = stocks.includes(cb.value);
});

document.getElementById("sort-select").addEventListener("change", (e) => {
  applyAndNavigate({ sort: e.target.value, page: 1 });
});

document.getElementById("clear-filters").addEventListener("click", () => {
  window.location.href = "busqueda.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  applyAndNavigate(getFormFilters());
});

function getFormFilters() {
  const fd = new FormData(form);
  const cats = fd.getAll("category");
  const stockVals = fd.getAll("stock");
  return {
    q: fd.get("q") || q,
    category: cats.length ? cats.join(",") : undefined,
    minPrice: fd.get("minPrice") || undefined,
    maxPrice: fd.get("maxPrice") || undefined,
    stock: stockVals.length ? stockVals.join(",") : undefined,
    sort: document.getElementById("sort-select").value,
    page: 1,
  };
}

function applyAndNavigate(filters) {
  const sp = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  window.location.href = `busqueda.html?${sp.toString()}`;
}

function renderChips(filters) {
  const chips = document.getElementById("active-chips");
  const items = [];
  if (filters.q) items.push({ label: `"${filters.q}"`, key: "q" });
  if (filters.category?.length) items.push({ label: filters.category.join(", "), key: "category" });
  if (filters.minPrice || filters.maxPrice) {
    items.push({
      label: `Precio: $${Number(filters.minPrice || 0).toLocaleString("es-CO")} - $${Number(filters.maxPrice || 500000).toLocaleString("es-CO")}`,
      key: "price",
    });
  }
  chips.innerHTML = items
    .map(
      (c) =>
        `<span class="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">${c.label} <button type="button" data-remove="${c.key}" class="hover:text-secondary">×</button></span>`
    )
    .join("");
}

function renderPagination(pag) {
  const nav = document.getElementById("pagination");
  if (pag.totalPages <= 1) {
    nav.innerHTML = "";
    return;
  }
  const mkLink = (p, label, disabled = false) => {
    if (disabled) return `<span class="px-3 py-1 text-on-surface-variant">${label}</span>`;
    const sp = new URLSearchParams(window.location.search);
    sp.set("page", p);
    return `<a href="busqueda.html?${sp.toString()}" class="px-3 py-1 rounded ${p === pag.page ? "bg-primary text-white" : "hover:bg-surface-container-low"}">${label}</a>`;
  };
  let html = mkLink(pag.page - 1, "Anterior", pag.page <= 1);
  for (let i = 1; i <= pag.totalPages; i++) html += mkLink(i, i);
  html += mkLink(pag.page + 1, "Siguiente", pag.page >= pag.totalPages);
  nav.innerHTML = html;
}

async function runSearch() {
  const products = await fetchAllProducts();
  const stockFilter = stocks.length ? stocks : undefined;
  const filters = {
    q,
    category: categories.length ? categories : undefined,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    stock: stockFilter,
    sort,
  };

  renderChips(filters);
  const filtered = filterProducts(products, filters);
  const pag = paginate(filtered, page, 12);

  const header = document.getElementById("results-header");
  const grid = document.getElementById("results-grid");
  const empty = document.getElementById("empty-state");

  if (pag.total === 0) {
    header.textContent = q ? `0 productos encontrados para "${q}"` : "0 productos encontrados";
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  empty.classList.add("hidden");
  header.innerHTML = q
    ? `<span class="font-bold text-primary">${pag.total}</span> productos encontrados para <span class="italic font-bold">"${q}"</span>`
    : `<span class="font-bold text-primary">${pag.total}</span> productos encontrados`;

  grid.innerHTML = pag.items.map((p) => renderProductCard(p, { linkName: true, compact: true })).join("");
  renderPagination(pag);
}

runSearch();
