# 0004 — Login del conductor con Supabase Auth

- **Fecha:** 2026-10-27
- **Estado:** Aceptada

## Contexto
El conductor debe iniciar sesión y ver **solo** sus servicios.

## Opciones
- **Supabase Auth email + password** — elegida.
- PIN contra tabla `drivers` con cookie propia — más simple, pero reinventa sesiones.
- Magic link / OTP — depende de correos reales y límites del plan gratis.

## Decisión
- Cuentas de prueba inventadas creadas con `scripts/seed-driver-accounts.mjs` (usa la service role key, solo local).
- Sesión en cookies con `@supabase/ssr`.
- `proxy.ts` (en Next 16 *middleware* pasó a llamarse *proxy*) refresca la sesión y hace la redirección optimista `/driver/services` ↔ `/driver`.
- La página vuelve a verificar al usuario en el servidor (`getClaims`) antes de mostrar datos.
- El usuario de Auth se enlaza al conductor por email en la fase mock; en la fase real, por `drivers.auth_user_id`.

## Consecuencias
- Con `cacheComponents` activo, todo lo que lee cookies va dentro de `<Suspense>`.
