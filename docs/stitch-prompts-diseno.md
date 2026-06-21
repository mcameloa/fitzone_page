# Prompts Google Stitch — FitZone

Prompts para generar los diseños de la tienda virtual **FitZone** (catálogo de ropa deportiva) en [Google Stitch](https://stitch.withgoogle.com).

**Proyecto:** TSP — Entrega Semana 5  
**Stack:** HTML5, CSS3, JavaScript, Firebase

---

## Estrategia recomendada

1. Generar primero el **DESIGN.md** (Prompt 1) para mantener coherencia visual.
2. Generar cada pantalla por separado (Prompts 2–6), referenciando el design system.
3. Conectar las pantallas en un prototipo multi-pantalla o usar el Prompt 7 para generar todo de una vez.

---

## Prompt 1 — DESIGN.md (sistema de diseño)

Generar primero para fijar la identidad visual de FitZone.

```
Create a DESIGN.md design system for a premium sportswear e-commerce web app called "FitZone".

Brand: FitZone — high-end athletic apparel store (Colombia). Tagline: "Rendimiento con estilo".

Visual identity:
- Style: Modern, athletic, premium, clean. Inspired by Nike/Adidas online stores but original.
- Primary color: Deep electric blue (#0A3D62)
- Accent color: Vibrant orange (#FF6B35) for CTAs and highlights
- Background: Off-white (#F8F9FA) and white (#FFFFFF)
- Text: Dark charcoal (#1A1A2E) for headings, gray (#6C757D) for body
- Success/stock available: Green (#28A745)
- Low stock warning: Amber (#FFC107)
- Out of stock: Red (#DC3545)

Typography:
- Headings: Bold sans-serif (Inter or Poppins), large and impactful
- Body: Clean sans-serif, readable at 16px
- Prices: Bold, accent color

Components:
- Rounded buttons (8px radius), primary filled, secondary outlined
- Product cards with image, name, price, stock badge, "Agregar al carrito" button
- Search bar with icon, prominent in header
- Filter sidebar/panel for advanced search
- Modal for expanded product description
- Shopping cart icon with item count badge in header
- Form inputs with clear labels and validation states
- Responsive: desktop (1280px), tablet (768px), mobile (375px)

Language: All UI text in Spanish (Colombia).
Currency: Colombian Pesos (COP) formatted as $189.900
Product categories: Calzado, Camisetas, Accesorios, Pantalones, Chaquetas

Do NOT use placeholder lorem ipsum — use realistic sportswear product names in Spanish.
```

---

## Prompt 2 — Pantalla principal / Home + catálogo

**Módulos:** búsqueda básica, búsqueda avanzada, artículos (grid), navegación.

```
Design the main catalog page for "FitZone", a premium sportswear e-commerce web application (desktop 1280px, responsive).

HEADER (sticky):
- FitZone logo (left)
- Navigation: Inicio | Catálogo | Categorías
- Search bar center: placeholder "Buscar productos por nombre..."
- Right side: user icon "Iniciar sesión" / "Mi cuenta", shopping cart icon with red badge showing item count (e.g. "3")

HERO SECTION:
- Full-width banner with athletic lifestyle image
- Headline: "Equipa tu rendimiento"
- Subtitle: "Ropa deportiva de alta gama para atletas exigentes"
- CTA button: "Ver catálogo"

SEARCH & FILTERS BAR:
- Basic search input with magnifying glass icon
- "Búsqueda avanzada" toggle/link that expands filter panel
- Advanced filters (collapsible panel):
  - Categoría dropdown: Calzado, Camisetas, Pantalones, Chaquetas, Accesorios
  - Precio mínimo and Precio máximo inputs
  - "Aplicar filtros" and "Limpiar" buttons

PRODUCT GRID:
- Show 20 product cards in a responsive 4-column grid
- Each card contains:
  - Product image (sportswear: shoes, shirts, shorts, jackets, accessories)
  - Category tag (small badge)
  - Product name (e.g. "Camiseta Dry-Fit Pro", "Tenis Running Elite X")
  - Price in COP (e.g. $129.900)
  - Stock indicator: "En stock (15)" in green, or "Últimas unidades (2)" in amber, or "Agotado" in red
  - Button: "Agregar al carrito"
  - Clicking the product image opens detail view

FOOTER:
- FitZone logo, links: Sobre nosotros | Contacto | Términos
- Copyright: "© 2026 FitZone — Proyecto TSP Politécnico Grancolombiano"

Style: Premium athletic aesthetic, blue and orange palette, clean whitespace, modern UI. All text in Spanish.
```

---

## Prompt 3 — Login y registro

**Módulo:** registro e inicio de sesión.

```
Design authentication screens for "FitZone" sportswear e-commerce app. Two states on same page with tab toggle: "Iniciar sesión" and "Registrarse".

LAYOUT:
- Split screen: left side (40%) athletic hero image with FitZone branding overlay; right side (60%) form panel on white background

LOGIN TAB ("Iniciar sesión"):
- Title: "Bienvenido de vuelta"
- Subtitle: "Ingresa a tu cuenta para realizar pedidos"
- Email input field with label "Correo electrónico"
- Password input with label "Contraseña" and show/hide toggle
- "¿Olvidaste tu contraseña?" link
- Primary button: "Iniciar sesión"
- Divider: "o"
- Link: "¿No tienes cuenta? Regístrate aquí"

REGISTER TAB ("Registrarse"):
- Title: "Crea tu cuenta"
- Subtitle: "Regístrate para acceder al catálogo y realizar pedidos"
- Fields: Nombre completo, Correo electrónico, Contraseña, Confirmar contraseña
- Checkbox: "Acepto los términos y condiciones"
- Primary button: "Crear cuenta"
- Link: "¿Ya tienes cuenta? Inicia sesión"

VALIDATION STATES (show examples):
- Red border + error message under field for invalid email
- Green checkmark for valid fields

Note at bottom: "Debes estar registrado para realizar un pedido"

Style: Consistent with FitZone design system — deep blue (#0A3D62), orange accents, Inter/Poppins typography. Mobile responsive (375px): stacked single column. All text in Spanish.
```

---

## Prompt 4 — Detalle de producto + compra por artículo

**Módulos:** artículos y características, compra por artículo.

```
Design a product detail page for "FitZone" sportswear e-commerce (desktop 1280px).

HEADER: Same as catalog page (logo, nav, search, cart badge, user menu)

BREADCRUMB: Inicio > Catálogo > Camisetas > Camiseta Dry-Fit Pro

MAIN CONTENT (two columns):

LEFT (55%):
- Large product image (clickable — show tooltip "Click para ampliar descripción")
- Thumbnail gallery below (3-4 small images)

RIGHT (45%):
- Category badge: "Camisetas"
- Product name (H1): "Camiseta Dry-Fit Pro"
- Price: $89.900 COP (large, bold, orange)
- Stock status: green badge "En stock — 24 unidades disponibles"
- Description section:
  - Title: "Descripción"
  - Text: "Camiseta de alto rendimiento con tecnología Dry-Fit. Material 100% poliéster reciclado, costuras planas para evitar rozaduras. Ideal para running y entrenamiento funcional."
  - Specs list: Material, Tallas disponibles (S, M, L, XL), Color
- PURCHASE MODULE ("Compra por artículo"):
  - Label: "Cantidad"
  - Quantity selector: minus button, number input (default 1), plus button
  - Subtotal display: "Subtotal: $89.900"
  - Primary CTA: "Agregar al carrito" (large orange button)
  - Secondary: "Comprar ahora"

EXPANDED DESCRIPTION MODAL (show as overlay state):
- Triggered when user clicks product image
- Modal with larger image, full extended description, material details, size chart
- Close button (X) top right
- "Agregar al carrito" button inside modal

RELATED PRODUCTS section below: "Productos relacionados" — 4 product cards horizontal scroll

Style: FitZone premium athletic design, Spanish text, COP currency.
```

---

## Prompt 5 — Carrito de compras

**Módulo:** carro de compras.

```
Design a shopping cart page for "FitZone" sportswear e-commerce app (desktop 1280px, responsive).

HEADER: FitZone logo, navigation, search, cart icon with badge, user account

PAGE TITLE: "Carrito de compras" with item count subtitle "3 artículos en tu carrito"

CART ITEMS LIST (left 65%):
Each row/card shows:
- Product thumbnail image
- Product name: e.g. "Tenis Running Elite X"
- Unit price: $349.900
- Quantity controls: [-] [2] [+] buttons
- Line subtotal: $699.800
- Remove button (trash icon): "Eliminar"
- Stock warning if applicable: "Solo quedan 3 unidades"

Show 3 example items with different products (shoes, shirt, accessory).

EMPTY STATE (show as alternate):
- Illustration of empty cart
- Text: "Tu carrito está vacío"
- Button: "Explorar catálogo"

ORDER SUMMARY (right 35%, sticky card):
- Title: "Resumen del pedido"
- Subtotal: $1.079.700
- Envío: "Calculado al confirmar"
- Divider
- TOTAL (large, bold): $1.079.700 COP
- Primary button: "Proceder al pedido" (disabled if not logged in, with tooltip "Debes iniciar sesión")
- Secondary link: "Seguir comprando"

Note: This is a simulated purchase catalog (no real payment gateway).

Style: FitZone design system, clean table/card layout, Spanish text, COP formatting.
```

---

## Prompt 6 — Búsqueda avanzada (resultados)

**Módulo:** búsqueda avanzada.

```
Design an advanced search results page for "FitZone" sportswear e-commerce.

HEADER: Standard FitZone header with search bar showing active query "camiseta"

LAYOUT: Sidebar filters (left 25%) + Results grid (right 75%)

SIDEBAR — "Filtros avanzados":
- Active filters chips at top: "Camisetas x" "Precio: $50.000 - $150.000 x"
- Categoría: checkboxes — Calzado, Camisetas, Pantalones, Chaquetas, Accesorios
- Rango de precio: dual slider or min/max inputs ($0 — $500.000)
- Disponibilidad: En stock, Últimas unidades, Todos
- Buttons: "Aplicar filtros" (primary), "Limpiar todo" (text link)

RESULTS AREA:
- Results header: "12 productos encontrados para 'camiseta'"
- Sort dropdown: "Ordenar por: Relevancia | Precio menor | Precio mayor | Nombre"
- Product grid (3 columns) with filtered sportswear items
- Each card: image, name, price, stock, "Agregar al carrito"
- Pagination: "Anterior | 1 | 2 | 3 | Siguiente"

NO RESULTS STATE:
- Icon + "No se encontraron productos"
- Suggestion: "Intenta con otros filtros o términos de búsqueda"
- Button: "Ver todo el catálogo"

Style: FitZone blue/orange palette, Spanish UI, desktop 1280px responsive.
```

---

## Prompt 7 — Prototipo completo (multi-pantalla)

Usar cuando ya exista el DESIGN.md y se quiera generar todas las pantallas de una vez.

```
Generate a complete 5-screen prototype for "FitZone", a premium sportswear virtual catalog e-commerce web app for a university TSP project.

Screens to generate with consistent design:
1. Home/Catalog — product grid with 20+ items, basic search bar, advanced filter toggle
2. Login/Register — split layout authentication with tab toggle
3. Product Detail — image, description, stock, quantity selector, add to cart, expandable description modal
4. Advanced Search Results — sidebar filters (category, price range), results grid
5. Shopping Cart — item list with quantities, prices, total, checkout button

Functional modules required:
- User registration and login (Firebase auth)
- Basic search by product name
- Advanced search with category and price filters
- Product cards showing: name, price (COP), description, stock, image
- Click image to expand full product description
- Purchase by item with quantity selector
- Shopping cart with item count and total price

Tech context: Will be implemented with HTML5, CSS3, JavaScript, Firebase.
Target: Responsive web (desktop + mobile).
Language: Spanish (Colombia).
Brand: FitZone — athletic, premium, modern.

Product categories: Calzado, Camisetas, Pantalones, Chaquetas, Accesorios.
Use realistic Colombian sportswear product names and COP prices ($50.000 - $500.000 range).
```

---

## Checklist: módulos vs. pantallas

| Módulo requerido              | Pantalla Stitch   |
|-------------------------------|-------------------|
| Registro e inicio de sesión   | Prompt 3          |
| Búsqueda básica               | Prompt 2          |
| Búsqueda avanzada             | Prompt 2 + 6      |
| Artículos y características   | Prompt 2 + 4      |
| Compra por artículo           | Prompt 4          |
| Carrito de compras            | Prompt 5          |
| Mínimo 20 artículos           | Prompt 2          |

---

## Tips de uso en Stitch

- **Iteración:** Si una pantalla no queda bien, pedir por ejemplo: *"Make the product cards more compact and add stock badges"*.
- **Consistencia:** En prompts 2–6, añadir: *"Consistent with FitZone DESIGN.md"*.
- **Mobile:** Pedir variantes: *"Also generate mobile version (375px) of this screen"*.
- **Exportación:** Exportar a Figma o descargar HTML/CSS como referencia para la implementación.
- **Evidencia Semana 5:** Guardar capturas de cada pantalla y el enlace del prototipo Stitch para el consolidado TSP.

---

## Proyecto Stitch generado (Semana 5)

**Proyecto:** FitZone Design System  
**Project ID:** `922251080156382484`  
**Enlace:** [stitch.withgoogle.com/projects/922251080156382484](https://stitch.withgoogle.com/projects/922251080156382484)  
**Design System asset:** `assets/28c113746c4e4e7f880e42e8e7dd25d7`  
**Exportaciones locales:** `docs/stitch-exports/` (HTML + `manifest.json`)

### Cambio respecto al Prompt 3 original

Login e inicio de sesión se unificaron en **una sola pantalla con tabs** (`Iniciar sesión` | `Registrarse`), en lugar de dos pantallas separadas. Las pantallas legacy de Login/Registro quedaron obsoletas.

### Pantallas finales (diseño estático)

| Pantalla | Screen ID | Título Stitch |
|----------|-----------|---------------|
| Catálogo | `4f38f64d58bd42338cbc6621690f6461` | FitZone - Catálogo Unificado y Filtros Avanzados |
| Detalle producto | `2a01db5e9fe74c12b84fba723c56ef42` | FitZone - Detalle de Producto |
| Carrito | `1007e06eb2cd4725b7838260e7bd0ec9` | FitZone - Carrito Completo y Estado Vacío |
| Búsqueda avanzada | `dd052f6795cd4d6891e704789ff91f94` | FitZone - Resultados de Búsqueda Completo |
| Auth unificada | `c38ddecc04404ebea63ed7b66f8c9ec6` | FitZone - Autenticación Unificada |

### Prototipo interactivo (navegación entre pantallas)

| Pantalla | Screen ID | Flujo |
|----------|-----------|-------|
| Catálogo | `4dde6679ea5a4b1593aff6bf89158fec` | Home → click producto → Detalle |
| Detalle | `27224358d0c94d718cfeab132c1f3420` | Agregar al carrito → Carrito |
| Carrito | `1899616c351144a1ae07958088ac45a2` | Proceder al pedido → Auth |
| Búsqueda | `9f47a25084fc4e7188ccc3eb2fd5b15e` | Desde header o filtros avanzados |
| Auth | `3df1ff537af14a10bc306c42a50a50b2` | Tab Iniciar sesión activo por defecto |

### Assets de marca

| Asset | Screen ID |
|-------|-----------|
| Logo canónico (header) | `5640cbfbb47441f987f15d3041c0c39c` |
| Logo invertido (footer) | `4e431014bd9e4268b5c32ba0782426e6` |

### Mejoras aplicadas (auditoría TSP)

- Design System: tokens de stock (`#28A745`, `#FFC107`, `#DC3545`), categorías TSP (Calzado, Camisetas, Pantalones, Chaquetas, Accesorios), regla COP (`$XXX.XXX` sin sufijo en cards).
- Logo unificado en header/footer de todas las pantallas (SVG canónico, nav `Inicio | Catálogo | Categorías`).
- Carrito: resumen sticky, checkout deshabilitado con tooltip, empty state.
- Búsqueda: sidebar con chips, paginación, estado sin resultados.
- Catálogo: 20 cards, footer TSP, búsqueda avanzada colapsable.
- Detalle: breadcrumb, precio naranja `#FF6B35` en formato `$89.900`.
- Alcance: **solo desktop** (1280px target); sin variantes mobile.
