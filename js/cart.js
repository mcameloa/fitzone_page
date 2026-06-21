const CART_KEY = "fitzone_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCartItems() {
  return readCart();
}

export function getCartCount() {
  return readCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(productId, quantity = 1) {
  const items = readCart();
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  writeCart(items);
  window.dispatchEvent(new CustomEvent("fitzone:cart-updated"));
  return items;
}

export function updateQuantity(productId, quantity) {
  let items = readCart();
  if (quantity <= 0) {
    items = items.filter((i) => i.productId !== productId);
  } else {
    const item = items.find((i) => i.productId === productId);
    if (item) item.quantity = quantity;
  }
  writeCart(items);
  window.dispatchEvent(new CustomEvent("fitzone:cart-updated"));
  return items;
}

export function removeFromCart(productId) {
  const items = readCart().filter((i) => i.productId !== productId);
  writeCart(items);
  window.dispatchEvent(new CustomEvent("fitzone:cart-updated"));
  return items;
}

export function clearCart() {
  writeCart([]);
  window.dispatchEvent(new CustomEvent("fitzone:cart-updated"));
}

export async function resolveCartProducts(getProductById) {
  const items = readCart();
  const resolved = [];
  for (const item of items) {
    const product = await getProductById(item.productId);
    if (product) resolved.push({ ...item, product });
  }
  return resolved;
}

export function cartSubtotal(lines) {
  return lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
}
