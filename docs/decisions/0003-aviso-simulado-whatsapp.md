# 0003 — Aviso al cliente: bandeja simulada + link WhatsApp

- **Fecha:** 2026-10-27
- **Estado:** Aceptada

## Contexto
La prueba no pide SMS real; acepta simulación en pantalla, email o link de WhatsApp.

## Decisión
- Pantalla `/client` con aspecto de teléfono que muestra el mensaje recibido.
- Cada mensaje trae un botón **Open in WhatsApp** (`https://wa.me/<phone>?text=<mensaje>`), con el texto prellenado.
- Dispatch muestra el estado del aviso: *Not sent* / *Sent HH:MM*.

## Plantilla del mensaje
> Hi {client}, your driver {driver} is 10 minutes away. Vehicle: {color} {make} {model}, plate {plate}.

Vive en `modules/notifications/config/notifications-message-template.config.ts`.
