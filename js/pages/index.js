import { HERO_IMAGE } from "../products-data.js";
import { fetchAllProducts, filterProducts } from "../products.js";
import { initAuth } from "../auth.js";
import { buildSearchUrl } from "../format.js";
import { initLayout, renderProductCard } from "../ui.js";

initAuth();

document.getElementById("hero-bg").style.backgroundImage = `url('${HERO_IMAGE}')`;

initLayout({ activeNav: "catalogo" });

const grid = document.getElementById("product-grid");
const countEl = document.getElementById("catalog-count");
const filterPanel = document.getElementById("filter-panel");
const filterForm = document.getElementById("filter-form");

document.getElementById("toggle-filters").addEventListener("click", () => {
  filterPanel.classList.toggle("hidden");
});

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(filterForm);
  window.location.href = buildSearchUrl({
    category: fd.get("category"),
    minPrice: fd.get("minPrice"),
    maxPrice: fd.get("maxPrice"),
  });
});

async function loadCatalog() {
  const products = await fetchAllProducts();
  countEl.textContent = `Mostrando ${products.length} productos`;
  grid.innerHTML = products.map((p) => renderProductCard(p)).join("");
}

loadCatalog();
