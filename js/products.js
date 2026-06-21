import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";
import { PRODUCTS, getProductById as localGetById } from "./products-data.js";

let app = null;
let auth = null;
let db = null;
let cache = null;

export function getFirebaseAuth() {
  if (!isFirebaseConfigured()) return null;
  if (!auth) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
  return auth;
}

export function getFirestoreDb() {
  if (!isFirebaseConfigured()) return null;
  if (!db) getFirebaseAuth();
  return db;
}

function normalizeProduct(data, id) {
  return {
    id,
    name: data.name,
    category: data.category,
    price: Number(data.price),
    stock: Number(data.stock),
    imageUrl: data.imageUrl,
    description: data.description || "",
    specs: data.specs || {},
  };
}

export async function fetchAllProducts() {
  if (cache) return cache;

  const firestore = getFirestoreDb();
  if (firestore) {
    try {
      const snap = await getDocs(collection(firestore, "products"));
      if (!snap.empty) {
        cache = snap.docs.map((d) => normalizeProduct(d.data(), d.id));
        return cache;
      }
    } catch (err) {
      console.warn("Firestore unavailable, using local catalog:", err);
    }
  }

  cache = [...PRODUCTS];
  return cache;
}

export async function getProductById(id) {
  const firestore = getFirestoreDb();
  if (firestore) {
    try {
      const snap = await getDoc(doc(firestore, "products", id));
      if (snap.exists()) return normalizeProduct(snap.data(), snap.id);
    } catch (err) {
      console.warn("Firestore getDoc failed:", err);
    }
  }
  return localGetById(id);
}

export function filterProducts(products, filters = {}) {
  let result = [...products];
  const q = (filters.q || "").trim().toLowerCase();

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    const cats = Array.isArray(filters.category)
      ? filters.category
      : [filters.category];
    if (cats.length) {
      result = result.filter((p) => cats.includes(p.category));
    }
  }

  const min = filters.minPrice != null && filters.minPrice !== "" ? Number(filters.minPrice) : null;
  const max = filters.maxPrice != null && filters.maxPrice !== "" ? Number(filters.maxPrice) : null;
  if (min != null && !Number.isNaN(min)) result = result.filter((p) => p.price >= min);
  if (max != null && !Number.isNaN(max)) result = result.filter((p) => p.price <= max);

  if (filters.stock) {
    const keys = Array.isArray(filters.stock) ? filters.stock : [filters.stock];
    result = result.filter((p) => {
      const key = p.stock <= 0 ? "out" : p.stock <= 5 ? "low" : "in";
      return keys.includes(key);
    });
  }

  const sort = filters.sort || "relevance";
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "es"));

  return result;
}

export function paginate(items, page = 1, perPage = 12) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: current,
    totalPages,
    total,
    perPage,
  };
}

export function invalidateProductCache() {
  cache = null;
}
