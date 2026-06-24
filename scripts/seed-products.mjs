/**
 * Pobla Firestore con los 20 productos del catálogo FitZone.
 *
 * Requisitos:
 * 1. Descargar service account JSON desde Firebase Console → Project Settings → Service accounts
 * 2. Guardarlo como serviceAccountKey.json en la raíz del proyecto
 * 3. npm install && npm run seed
 */
import { readFileSync, existsSync } from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const keyPath = join(__dirname, "..", "serviceAccountKey.json");
if (!existsSync(keyPath)) {
  console.error("Falta serviceAccountKey.json — descárgalo de Firebase Console.");
  process.exit(1);
}

const admin = require("firebase-admin");
const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const PRODUCTS = [
  { id: "tenis-running-elite-x", name: "Tenis Running Elite X", category: "Calzado", price: 489900, stock: 15, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", description: "Tenis Running Elite X de alto rendimiento con tecnología deportiva.", specs: { material: "Mesh + EVA", sizes: "38–44", color: "Negro/Naranja" } },
  { id: "camiseta-dry-fit-pro", name: "Camiseta Dry-Fit Pro", category: "Camisetas", price: 129900, stock: 2, imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600", description: "Camiseta Dry-Fit Pro con tecnología de secado rápido.", specs: { material: "Poliéster reciclado", sizes: "S, M, L, XL", color: "Azul marino" } },
  { id: "shorts-compression-2", name: "Shorts Compression 2.0", category: "Pantalones", price: 95000, stock: 0, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Shorts Compression 2.0 con compresión elástica.", specs: { material: "Nylon/Spandex", sizes: "S–XL", color: "Negro" } },
  { id: "chaqueta-cortavientos-ultra", name: "Chaqueta Cortavientos Ultra", category: "Chaquetas", price: 289900, stock: 12, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Chaqueta cortaviento impermeable ligera.", specs: { material: "Poliéster ripstop", sizes: "S–XXL", color: "Gris oscuro" } },
  { id: "tenis-training-max", name: "Tenis Training Max", category: "Calzado", price: 359900, stock: 5, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", description: "Tenis para cross-training con estabilidad lateral.", specs: { material: "Sintético + caucho", sizes: "38–43", color: "Blanco" } },
  { id: "camiseta-termica-tech", name: "Camiseta Térmica Tech", category: "Camisetas", price: 145000, stock: 20, imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600", description: "Camiseta térmica de segunda piel.", specs: { material: "Poliéster térmico", sizes: "S–XL", color: "Negro" } },
  { id: "leggings-high-rise", name: "Leggings High-Rise", category: "Pantalones", price: 159900, stock: 8, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Leggings cintura alta con compresión media.", specs: { material: "Nylon/Spandex", sizes: "XS–L", color: "Vino tinto" } },
  { id: "gorra-performance-mesh", name: "Gorra Performance Mesh", category: "Accesorios", price: 79900, stock: 1, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Gorra mesh ventilada.", specs: { material: "Poliéster mesh", sizes: "Única", color: "Negro" } },
  { id: "maleta-gym-pro-40l", name: "Maleta Gym Pro 40L", category: "Accesorios", price: 199900, stock: 10, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Maleta 40L con compartimento para calzado.", specs: { material: "Poliéster 600D", sizes: "40L", color: "Azul FitZone" } },
  { id: "tenis-futbol-turf-pro", name: "Tenis Futbol Turf Pro", category: "Calzado", price: 320000, stock: 0, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", description: "Tenis turf con tracción multi-taco.", specs: { material: "Sintético", sizes: "39–44", color: "Verde/Negro" } },
  { id: "pantalon-jogger-aero", name: "Pantalón Jogger Aero", category: "Pantalones", price: 175000, stock: 14, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Jogger fit relajado.", specs: { material: "Algodón/French Terry", sizes: "S–XXL", color: "Gris jaspe" } },
  { id: "saco-hoodie-sport", name: "Saco Hoodie Sport", category: "Chaquetas", price: 210000, stock: 3, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Hoodie con interior afelpado.", specs: { material: "Algodón/Poliéster", sizes: "S–XL", color: "Negro" } },
  { id: "tenis-walker-comfort", name: "Tenis Walker Comfort", category: "Calzado", price: 265000, stock: 9, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", description: "Tenis confort memory foam.", specs: { material: "Cuero sintético", sizes: "38–44", color: "Blanco/Gris" } },
  { id: "camiseta-tanque-power", name: "Camiseta Tanque Power", category: "Camisetas", price: 85000, stock: 18, imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600", description: "Tanque espalda nadadora.", specs: { material: "Poliéster Dry-Fit", sizes: "S–XL", color: "Naranja" } },
  { id: "shorts-basket-master", name: "Shorts Basket Master", category: "Pantalones", price: 115000, stock: 0, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Shorts basket above-knee.", specs: { material: "Poliéster mesh", sizes: "S–XXL", color: "Rojo" } },
  { id: "reloj-sport-digital", name: "Reloj Sport Digital", category: "Accesorios", price: 349900, stock: 4, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Reloj deportivo digital.", specs: { material: "Silicona + ABS", sizes: "Única", color: "Negro" } },
  { id: "tenis-trail-explorer", name: "Tenis Trail Explorer", category: "Calzado", price: 410000, stock: 11, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", description: "Tenis trail para terrenos irregulares.", specs: { material: "Mesh reforzado", sizes: "39–44", color: "Verde oliva" } },
  { id: "camiseta-polo-club", name: "Camiseta Polo Club", category: "Camisetas", price: 135000, stock: 6, imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600", description: "Polo cuello con botones ocultos.", specs: { material: "Algodón/Piqué", sizes: "S–XL", color: "Blanco" } },
  { id: "chaqueta-impermeable", name: "Chaqueta Impermeable", category: "Chaquetas", price: 325000, stock: 2, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Chaqueta membrana 10K.", specs: { material: "Nylon 10K", sizes: "S–XXL", color: "Amarillo flúor" } },
  { id: "medias-compresion-pack-3", name: "Medias Compresión (Pack 3)", category: "Accesorios", price: 45000, stock: 25, imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600", description: "Pack 3 medias compresión.", specs: { material: "Nylon/Spandex", sizes: "36–43", color: "Negro/Gris/Blanco" } },
];

async function seed() {
  const batch = db.batch();
  for (const product of PRODUCTS) {
    const { id, ...data } = product;
    batch.set(db.collection("products").doc(id), data);
  }
  await batch.commit();
  console.log(`✓ ${PRODUCTS.length} productos cargados en Firestore`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
