# FitZone — Estructura de navegación

Diagrama basado en el prototipo interactivo de Stitch (`docs/stitch-exports/prototype/`) y el flujo documentado en `manifest.json`.

## Mapa de pantallas

| Pantalla | Archivo prototipo | Rol |
|----------|-------------------|-----|
| **Catálogo** (home) | `catalogo-interactivo.html` | Punto de entrada principal |
| **Búsqueda avanzada** | `busqueda-interactiva.html` | Resultados con filtros |
| **Detalle de producto** | `detalle-interactivo.html` | Ficha del artículo |
| **Carrito** | `carrito-interactivo.html` | Resumen de compra |
| **Autenticación** | `auth-interactiva.html` | Login / Registro (tabs) |

---

## 1. Navegación global (header — presente en todas las pantallas)

```mermaid
flowchart LR
    subgraph Header["Header sticky"]
        Logo["Logo FitZone"]
        Nav["Inicio · Catálogo · Categorías"]
        Search["Barra de búsqueda"]
        Auth["Iniciar sesión"]
        Cart["Carrito (badge)"]
    end

    Logo --> Catalogo
    Search --> Busqueda
    Auth -.-> AuthScreen["Auth (sin enlace en prototipo)"]
    Cart -.-> Carrito["Carrito (sin enlace en prototipo)"]

    Catalogo["Catálogo"]
    Busqueda["Búsqueda avanzada"]
    AuthScreen["Autenticación"]
```

> **Nota:** En el prototipo Stitch, `Inicio`, `Catálogo` y `Categorías` del menú principal no tienen enlaces activos (excepto el logo, que vuelve al catálogo). El icono de carrito tampoco navega desde el header; el acceso al carrito es por el flujo de compra.

---

## 2. Flujo principal entre pantallas

```mermaid
flowchart TD
    Start([Usuario entra]) --> Catalogo

    Catalogo["Catálogo<br/><small>Grid 20 productos · filtros colapsables</small>"]

    Catalogo -->|"Barra búsqueda / Búsqueda avanzada / Aplicar filtros"| Busqueda
    Catalogo -->|"Click producto (diseño)"| Detalle

    Busqueda["Búsqueda avanzada<br/><small>Sidebar filtros · paginación</small>"]
    Busqueda -->|"Click nombre producto"| Detalle
    Busqueda -->|"Logo / Aplicar filtros"| Catalogo

    Detalle["Detalle de producto<br/><small>Breadcrumb · cantidad · stock</small>"]
    Detalle -->|"Agregar al carrito"| Carrito
    Detalle -->|"Logo / breadcrumb Catálogo"| Catalogo

    Carrito["Carrito<br/><small>3 ítems · resumen sticky</small>"]
    Carrito -->|"Seguir comprando / Logo"| Catalogo
    Carrito -->|"Proceder al pedido"| Auth

    Auth["Autenticación unificada<br/><small>Tab: Iniciar sesión · Registrarse</small>"]
    Auth -->|"Logo"| Catalogo

    style Catalogo fill:#1E3A5F,color:#fff
    style Busqueda fill:#1E3A5F,color:#fff
    style Detalle fill:#FF6B35,color:#fff
    style Carrito fill:#FF6B35,color:#fff
    style Auth fill:#6C757D,color:#fff
```

---

## 3. Estructura del sitio (árbol de secciones)

```mermaid
flowchart TB
    Root["FitZone"]

    Root --> Tienda
    Root --> Cuenta
    Root --> Info

    subgraph Tienda["Tienda (flujo e-commerce)"]
        T1["Catálogo / Home"]
        T2["Búsqueda básica"]
        T3["Búsqueda avanzada"]
        T4["Detalle de producto"]
        T5["Carrito de compras"]
        T1 --> T2
        T1 --> T3
        T1 --> T4
        T2 --> T3
        T3 --> T4
        T4 --> T5
    end

    subgraph Cuenta["Cuenta de usuario"]
        C1["Iniciar sesión"]
        C2["Registrarse"]
        C3["¿Olvidaste tu contraseña?"]
        C1 --- C2
    end

    subgraph Info["Enlaces informativos (footer)"]
        I1["Sobre nosotros"]
        I2["Contacto"]
        I3["Términos y condiciones"]
        I4["Privacidad"]
        I5["Guía de tallas"]
        I6["Envíos y entregas"]
        I7["Preguntas frecuentes"]
        I8["Devoluciones"]
    end

    T5 -->|"Checkout requiere sesión"| C1
```

---

## 4. Resumen de transiciones (prototipo)

| Origen | Acción | Destino |
|--------|--------|---------|
| Catálogo | Barra de búsqueda (header) | Búsqueda avanzada |
| Catálogo | Enlace «Búsqueda avanzada» | Búsqueda avanzada |
| Catálogo | Botón «Aplicar» (filtros) | Búsqueda avanzada |
| Catálogo | Click en producto | Detalle *(definido en diseño)* |
| Búsqueda | Click en nombre de producto | Detalle |
| Búsqueda | Logo / «Aplicar filtros» | Catálogo |
| Detalle | «Agregar al carrito» | Carrito |
| Detalle | Logo / breadcrumb «Catálogo» | Catálogo |
| Carrito | «Seguir comprando» / Logo | Catálogo |
| Carrito | «Proceder al pedido» | Auth (tab Iniciar sesión) |
| Auth | Logo | Catálogo |

---

## 5. Pantallas fuera del flujo activo

Según `docs/stitch-exports/PANTALLAS-A-ELIMINAR.md`, las versiones legacy de Login y Registro como pantallas separadas fueron reemplazadas por la **Autenticación unificada con tabs**.
