# Pantallas

Interfaz en inglés. Mobile-first. Paleta: tinta oscura (`ink`) + acento ámbar (taxi) + verde para "enviado".

## Home `/`
- Título del producto y una línea de qué hace.
- Tres tarjetas grandes: **Dispatch**, **Driver app**, **Client phone**. Cada una con icono, descripción y flecha.

## Dispatch `/dispatch`
- Header con nombre, fecha de hoy y botón *Reset demo data*.
- Resumen: servicios hoy · asignados · avisos enviados.
- Formulario **New service**: client name, phone, date, time, pickup point, driver (select con vehículo).
- Lista **Today's services**: hora, cliente + teléfono, recogida, conductor (o select para asignar si no tiene), estado del aviso (*Not sent* gris / *Sent 14:32* verde).
- En móvil la lista son tarjetas; en desktop, tabla.

## Driver `/driver` (login)
- Pantalla de teléfono: logo, "Driver sign in", email, password, botón *Sign in*. Error inline.
- Ayuda: cuentas de prueba disponibles (en el README).

## Driver `/driver/services`
- Saludo con nombre y vehículo del conductor, botón *Sign out*.
- Lista de servicios **de hoy y del conductor**: hora grande, cliente, recogida.
- Botón principal ámbar **I'm 10 min away**. Al tocarlo: estado verde *Client notified at 14:32* y botón deshabilitado.
- Estado vacío: "No services assigned for today".

## Client `/client`
- Marco de teléfono (en desktop centrado; en móvil pantalla completa).
- Selector del cliente (simula "de quién es el teléfono").
- Mensajes tipo chat: texto del aviso + hora + botón *Open in WhatsApp*.
- Estado vacío: "No messages yet".
