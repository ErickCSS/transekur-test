# Docs — Driver 10 minutes away

Documentación viva del proyecto. Todo dividido por tipo para encontrarlo rápido.

| Carpeta | Qué contiene |
| --- | --- |
| [decisions/](decisions/) | Decisiones de arquitectura (ADR). Una decisión por archivo, numeradas. |
| [architecture/](architecture/) | Convenciones de módulos, modelo de datos y flujos. |
| [design/](design/) | Especificación de cada pantalla. |
| [logbook/](logbook/) | Bitácora: una entrada por sesión de trabajo. |
| [ai-usage.md](ai-usage.md) | Herramientas (incluida IA) usadas — lo pide la prueba. |
| [one-pager.md](one-pager.md) | Plan de una página para el evaluador: qué se construye, supuestos, fuera de alcance y preguntas. |

## Decisiones

1. [0001 — Una app, tres módulos](decisions/0001-una-app-tres-modulos.md)
2. [0002 — Supabase como backend](decisions/0002-supabase.md)
3. [0003 — Aviso simulado + link WhatsApp](decisions/0003-aviso-simulado-whatsapp.md)
4. [0004 — Login del conductor con Supabase Auth](decisions/0004-login-conductor-supabase-auth.md)
5. [0005 — Convenciones modulares](decisions/0005-convenciones-modulares.md)
6. [0006 — Diseño primero con base de datos mock](decisions/0006-diseno-primero-con-mock.md)

## La prueba (resumen)

1. **Dispatch**: crear un servicio (cliente, teléfono, fecha/hora, punto de recogida) y asignar conductor.
2. **Driver app** (web móvil): el conductor inicia sesión, ve solo sus servicios del día y toca "10 min away".
3. **Aviso al cliente**: el cliente recibe un mensaje con nombre del conductor y vehículo. Dispatch ve que salió y a qué hora.

Reglas: herramientas libres (decir cuáles), planes gratis, SMS simulado, datos inventados.
