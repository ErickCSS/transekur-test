# 0005 — Convenciones modulares

- **Fecha:** 2026-10-27
- **Estado:** Aceptada

## Decisión
- Todo el código de producto vive en `modules/<módulo>/`. Cada módulo es su mundo.
- Archivos con nombre `<módulo>-<qué hace>.<tipo>.ts(x)` y sufijo por tipo: `.components`, `.hooks`, `.actions`, `.services`, `.config`, `.data`, `.types`, `.utils`.
- Flujo en una sola dirección: **componente → hook → action → service**.
- Nombres descriptivos siempre (`sendDriverTenMinutesAwayNotice`, nunca `fn1`).

## Nota de vocabulario
En la prueba la palabra *service* significa "un viaje/recogida". Para no chocar con el sufijo `.services.ts`, en el código la entidad se llama **`Trip`**. En la interfaz se sigue diciendo *Service*.

Detalle completo en [architecture/module-conventions.md](../architecture/module-conventions.md).
