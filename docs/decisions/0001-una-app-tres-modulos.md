# 0001 — Una app, tres módulos

- **Fecha:** 2026-10-27
- **Estado:** Aceptada

## Contexto
La prueba tiene tres actores: dispatch, conductor y cliente. Se podía hacer un monorepo con tres apps o una sola app.

## Decisión
Una sola app Next.js 16 con una **home de tres opciones** (`/dispatch`, `/driver`, `/client`). Cada actor es su propio módulo en `modules/`.

## Por qué
- Un solo deploy y una sola URL para quien evalúa.
- Los módulos ya dan el aislamiento que buscamos sin la configuración extra de un monorepo.
- Si mañana hay que separar, cada módulo se puede mover a su propia app casi sin cambios.

## Consecuencias
- Las rutas en `app/` son delgadas: solo montan la pantalla del módulo.
- Lo que comparten (UI base, tipos de dominio, Supabase) vive en `modules/shared`.
