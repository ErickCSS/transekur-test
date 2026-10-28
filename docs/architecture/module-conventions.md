# Convenciones de módulos

## Estructura de un módulo
```
modules/<módulo>/
  components/   UI. Solo pintan, sin lógica.
  hooks/        Lógica del lado del cliente (estado, eventos, derivar datos).
  actions/      Lógica del servidor ('use server'). Validan sesión y orquestan services.
  services/     Hablan con la fuente de datos (Supabase, base mock, APIs).
  config/       Constantes y textos configurables del módulo.
  data/         Datos mock / semilla.
  types/        Tipos del módulo.
  utils/        Funciones puras y pequeñas.
```
Solo se crean las carpetas que el módulo necesita.

## Nombres de archivo
`<módulo>-<qué hace>.<tipo>.ts(x)`

| Tipo | Ejemplo |
| --- | --- |
| Componente | `dispatch-trip-form.components.tsx` |
| Hook | `use-dispatch-trip-form.hooks.ts` |
| Action | `driver-auth.actions.ts` |
| Service | `dispatch-trips.services.ts` |
| Config | `notifications-message-template.config.ts` |
| Data | `shared-drivers-mock.data.ts` |
| Types | `shared-trip.types.ts` |
| Utils | `shared-date-format.utils.ts` |

## Flujo de dependencias
```
app/**/page.tsx  →  <Módulo>Screen (componente)
componente       →  hook            (cliente)
hook             →  action          (servidor)   ← Fase 2
action           →  service         (datos)
```
- Un componente **no** importa services ni actions directo; usa su hook.
- Un service **no** conoce React.
- Lo compartido entre módulos vive en `modules/shared`.
- Excepción documentada: los Server Components que leen la sesión llaman a la action directamente (no existen hooks en el servidor).

## Nombres de funciones
Verbo + qué + contexto: `createDispatchTrip`, `assignDriverToTrip`, `sendDriverTenMinutesAwayNotice`, `buildWhatsAppNoticeLink`.

## Módulos del proyecto
| Módulo | Responsabilidad |
| --- | --- |
| `home` | Página de inicio con las tres opciones. |
| `dispatch` | Crear servicios, asignar conductor, ver estado del aviso. |
| `driver-auth` | Login / logout del conductor (Supabase Auth). |
| `driver` | Servicios del día del conductor y botón "10 min away". |
| `client-notice` | Bandeja del cliente (simulación de teléfono). |
| `notifications` | Plantilla del mensaje, link WhatsApp, registro del aviso. |
| `shared` | UI base, tipos de dominio, Supabase, base mock, utilidades. |
