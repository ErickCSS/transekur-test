# Flujos

## 1. Dispatch crea un servicio
1. `DispatchTripForm` → `useDispatchTripForm` valida campos.
2. Hook llama `createDispatchTrip` (service) → se guarda el trip con `status = scheduled`.
3. Todas las pantallas abiertas reciben el cambio (mock: evento `storage`; Fase 2: Supabase Realtime).

## 2. Conductor inicia sesión
1. `/driver` → `DriverAuthLoginForm` → `useDriverAuthLoginForm` → action `loginDriverWithEmail`.
2. Action → service `signInDriverWithPassword` (Supabase Auth). Cookie de sesión.
3. Redirige a `/driver/services`. `proxy.ts` protege la ruta; la página verifica de nuevo con `getCurrentDriver`.

## 3. Conductor toca "10 min away"
1. `DriverTripCard` → `useDriverTodayTrips.markTripTenMinutesAway(tripId)`.
2. Service `sendDriverTenMinutesAwayNotice`: arma el mensaje con la plantilla, crea el `notice` con `sent_at`, cambia el trip a `driver_ten_minutes_away`.
3. `/client` muestra el mensaje + botón WhatsApp. `/dispatch` muestra *Sent HH:MM*.
