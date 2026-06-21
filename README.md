# FitZone — Catálogo Virtual

Tienda de ropa deportiva premium para el proyecto **TSP — Politécnico Grancolombiano** (Semana 5).

**Tagline:** Rendimiento con estilo.

## Stack

- HTML5, CSS3, JavaScript (ES modules)
- Tailwind CSS (CDN)
- Firebase Authentication + Firestore
- Firebase Hosting (deploy recomendado)

## Pantallas

| Ruta | Descripción |
|------|-------------|
| `index.html` | Catálogo (home) — grid 20 productos |
| `busqueda.html` | Búsqueda avanzada con filtros |
| `producto.html?id=` | Detalle de producto |
| `carrito.html` | Carrito de compras |
| `auth.html` | Login / Registro (tabs) |

Flujo de navegación: [`docs/navegacion.md`](docs/navegacion.md)

Prototipo Stitch: [FitZone Design System](https://stitch.withgoogle.com/projects/922251080156382484)

## Desarrollo local

```bash
# Servir archivos estáticos (ejemplo con Python)
python3 -m http.server 8080
# Abrir http://localhost:8080
```

Sin Firebase configurado, el sitio usa el **catálogo local** embebido en `js/products-data.js` (20 productos).

## Configurar Firebase

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com) → **FitZone TSP**
2. Habilitar **Authentication** → Email/Password
3. Crear **Firestore Database**
4. Registrar app Web → copiar credenciales
5. Copiar plantilla y completar credenciales:

```bash
cp js/firebase-config.example.js js/firebase-config.js
# Editar js/firebase-config.js con tus valores
```

6. Desplegar reglas Firestore:

```bash
npm install -g firebase-tools
firebase login
cp .firebaserc.example .firebaserc   # editar project ID
firebase deploy --only firestore:rules
```

7. Poblar productos en Firestore:

```bash
npm install
# Descargar serviceAccountKey.json desde Firebase Console
npm run seed
```

## Desplegar (Firebase Hosting)

```bash
firebase init hosting   # public directory: . (raíz), SPA: No
firebase deploy --only hosting
```

URL resultante: `https://<project-id>.web.app`

## Estructura

```
├── index.html, busqueda.html, producto.html, carrito.html, auth.html
├── css/styles.css
├── js/
│   ├── firebase-config.js      (no commitear — ver .gitignore)
│   ├── products-data.js        (catálogo local + seed)
│   ├── products.js, cart.js, auth.js, ui.js, format.js
│   └── pages/                  (lógica por pantalla)
├── scripts/seed-products.js
├── firebase.json
└── docs/                       (documentación TSP)
```

## Sitio en producción

<!-- Actualizar tras deploy -->
_URL pendiente — ejecutar `firebase deploy --only hosting`_

## Licencia

Proyecto académico TSP — © 2026 FitZone
