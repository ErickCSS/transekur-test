# 0002 — Supabase como backend

- **Fecha:** 2026-10-27
- **Estado:** Aceptada

## Contexto
Las tres pantallas deben verse actualizadas entre sí (el conductor toca "10 min" y dispatch/cliente lo ven). Necesitamos datos persistentes, auth y tiempo real, en plan gratis.

## Opciones
- **Supabase** (Postgres + Auth + Realtime) — elegida.
- Archivo JSON + polling — no persiste en Vercel (serverless).
- localStorage + BroadcastChannel — solo funciona en un navegador.

## Decisión
Supabase plan gratis. Variables en `.env` (ignorado por git).

## Consecuencias
- Paquetes `@supabase/supabase-js` y `@supabase/ssr` (sesión en cookies).
- Escrituras solo desde server actions; Realtime para refrescar pantallas.
- Mientras validamos el diseño, servicios y avisos viven en una base mock (ver [0006](0006-diseno-primero-con-mock.md)); el login ya es real.
