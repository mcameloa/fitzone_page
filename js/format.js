export function formatCOP(amount) {
  return `$${Number(amount).toLocaleString("es-CO")}`;
}

export function getStockStatus(stock) {
  if (stock <= 0) {
    return {
      label: "Agotado",
      classes: "text-red-600 bg-red-50",
      dotClass: "bg-red-600",
      badgeClass: "bg-red-100 text-red-800",
      key: "out",
    };
  }
  if (stock <= 5) {
    return {
      label: "Últimas unidades",
      classes: "text-amber-600 bg-amber-50",
      dotClass: "bg-amber-500",
      badgeClass: "bg-amber-100 text-amber-800",
      key: "low",
    };
  }
  return {
    label: "En stock",
    classes: "text-green-600 bg-green-50",
    dotClass: "bg-green-600",
    badgeClass: "bg-green-100 text-green-800",
    key: "in",
  };
}

export function stockLabelWithCount(stock) {
  const status = getStockStatus(stock);
  if (stock <= 0) return status.label;
  return `${status.label} (${stock})`;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseQueryParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

export function buildSearchUrl(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") q.set(k, v);
  });
  const s = q.toString();
  return s ? `busqueda.html?${s}` : "busqueda.html";
}
