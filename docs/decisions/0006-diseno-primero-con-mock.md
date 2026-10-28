# 0006 — Diseño primero, con base de datos mock

- **Fecha:** 2026-10-27
- **Estado:** Aceptada

## Contexto
Queremos validar el diseño de las pantallas antes de conectar la lógica real.

## Decisión
- Fase 1: servicios y avisos se guardan en una **base mock en el navegador** (`localStorage`) que avisa a todas las pestañas abiertas. Así el flujo completo (dispatch → conductor → cliente) ya se puede probar.
- Los componentes nunca tocan la base mock directo: pasan por hooks y services. En la Fase 2 se cambia el interior de los services/hooks por actions + Supabase y los componentes no cambian.
- El login sí es real desde la Fase 1 ([0004](0004-login-conductor-supabase-auth.md)).

## Consecuencias
- En la fase mock, el flujo es **componente → hook → service (mock)**. La capa action entra en la Fase 2.
- Botón *Reset demo data* en dispatch para volver al estado inicial.
