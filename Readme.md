# NotasLabU3 - PWA

NotasLabU3 es una aplicación web progresiva (PWA) diseñada para crear, gestionar y visualizar notas de manera rápida y sencilla. La app permite almacenar las notas localmente en el navegador y puede instalarse en dispositivos móviles, funcionando incluso sin conexión a internet.

---

## Características principales

- Crear notas con título y descripción.
- Visualizar las notas en tarjetas con un resumen.
- Ver detalles completos de cada nota en un modal.
- Guardado automático y persistente usando `localStorage`.
- Diseño responsive, adaptable a móviles y escritorio.
- Funcionalidad PWA con instalación desde navegador y soporte offline mediante Service Worker.
- Notificaciones nativas cuando se instala la aplicación.

---

## Tecnologías utilizadas

- HTML5 y CSS
- JavaScript 
- Material Design Lite (MDL) para UI
- Progressive Web App (manifest.webmanifest y Service Worker)

---

## Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone https://github.com/Giss1106/NotasLabU3.git


Luego abrir en el navegador:
 http://192.168.56.1:8080
 http://localhost:8080

 Instalación en dispositivos móviles

Gracias al Service Worker y al archivo manifest.webmanifest, esta app puede instalarse como una aplicación nativa desde navegadores compatibles (Chrome, Edge, Firefox). Aparecerá un banner de instalación en la app para facilitarlo.

El Service Worker registra el archivo sw.js para cachear recursos y permitir el uso offline.

Imagenes Ejecucion: 
