# Pantallas a eliminar en Stitch — FitZone

Proyecto: [FitZone Design System](https://stitch.withgoogle.com/projects/922251080156382484) (`922251080156382484`)

La API de Stitch **no permite borrar** pantallas. Las obsoletas/duplicadas llevan **banner rojo** arriba:

> **ELIMINAR — Duplicado (conservar versión Interactiva)**

---

## Por qué ves duplicados

Cada módulo existe **dos veces**: versión **estática** (diseño) y versión **Interactiva** (prototipo con links). Visualmente son casi idénticas.

**Conservar solo la versión Interactiva** (5 pantallas) + logos (2) = **7 pantallas finales**.

Los HTML estáticos ya están exportados en `docs/stitch-exports/design/` por si los necesitas para la entrega TSP.

---

## ELIMINAR — banner rojo (7 pantallas)

### Duplicados estáticos (conservar la pareja «Interactivo»)

| Eliminar (estática) | ID | Conservar (interactiva) | ID |
|---------------------|-----|-------------------------|-----|
| Catálogo Unificado y Filtros Avanzados | `4f38f64d58bd42338cbc6621690f6461` | Catálogo Interactivo y Flujo Unificado | `4dde6679ea5a4b1593aff6bf89158fec` |
| Detalle de Producto | `2a01db5e9fe74c12b84fba723c56ef42` | Detalle de Producto Interactivo | `27224358d0c94d718cfeab132c1f3420` |
| Carrito Completo y Estado Vacío | `1007e06eb2cd4725b7838260e7bd0ec9` | Carrito Interactivo | `1899616c351144a1ae07958088ac45a2` |
| Resultados de Búsqueda Completo | `dd052f6795cd4d6891e704789ff91f94` | Resultados de Búsqueda Interactivo | `9f47a25084fc4e7188ccc3eb2fd5b15e` |
| Autenticación Unificada | `c38ddecc04404ebea63ed7b66f8c9ec6` | Autenticación Interactiva | `3df1ff537af14a10bc306c42a50a50b2` |

### Assets sobrantes

| Eliminar | ID | Motivo |
|----------|-----|--------|
| FitZone Logo (legacy) | `6a4ecb64dc584d0e9c4280231a0264ab` | Reemplazado por Logo Canonical / Inverted |
| Hero image (banner atlético) | `046a89032a024eb39cc3f0648a5d370f` | Asset suelto, no es pantalla TSP |

---

## CONSERVAR — sin banner rojo (7 pantallas)

| Pantalla | ID |
|----------|-----|
| Catálogo Interactivo y Flujo Unificado | `4dde6679ea5a4b1593aff6bf89158fec` |
| Detalle de Producto Interactivo | `27224358d0c94d718cfeab132c1f3420` |
| Carrito Interactivo | `1899616c351144a1ae07958088ac45a2` |
| Resultados de Búsqueda Interactivo | `9f47a25084fc4e7188ccc3eb2fd5b15e` |
| Autenticación Interactiva | `3df1ff537af14a10bc306c42a50a50b2` |
| FitZone Logo - Canonical | `5640cbfbb47441f987f15d3041c0c39c` |
| FitZone Logo - Inverted | `4e431014bd9e4268b5c32ba0782426e6` |

---

## Cómo borrar en Stitch

1. Abre el [proyecto](https://stitch.withgoogle.com/projects/922251080156382484).
2. Identifica las pantallas con **franja roja** arriba (o usa la tabla).
3. Menú ⋮ → **Delete**.

Resultado: **7 pantallas**, sin duplicados visuales.
