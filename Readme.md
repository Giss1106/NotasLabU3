# Quick Jot - ESPE

## Descripción

Quick Jot es una aplicación web progresiva (PWA) diseñada para crear, almacenar y visualizar notas rápidas. Permite al usuario añadir notas con título y descripción, visualizar un resumen de cada nota y acceder a los detalles completos mediante un modal. Las notas se guardan en el almacenamiento local del navegador (localStorage), garantizando la persistencia entre sesiones sin necesidad de backend.

La interfaz está inspirada en Material Design Lite (MDL), adaptada con colores personalizados institucionales de la ESPE (Escuela Superior Politécnica de Ecuador).

---

## Funcionalidades

- Creación de notas con título y descripción.
- Visualización de notas en forma de tarjetas (cards) con una descripción corta.
- Modal para mostrar detalles completos de cada nota.
- Almacenamiento de notas en localStorage para persistencia.
- Modal para agregar nuevas notas con validación básica.
- Diseño responsive para dispositivos móviles.
- Registro de Service Worker para soporte básico de PWA.

---

## Tecnologías y herramientas utilizadas

- **HTML5** y **CSS3**: para la estructura y estilos visuales.
- **JavaScript (Vanilla)**: para la lógica de interacción, manejo de eventos, manipulación del DOM y almacenamiento local.
- **Material Design Lite (MDL)**: para componentes y estilos UI siguiendo la guía Material Design.
- **LocalStorage API**: para almacenar las notas localmente en el navegador.
- **Service Worker**: registro básico para habilitar funcionalidades offline y cacheo (archivo `sw.js`).
- **Google Fonts - Material Icons**: para iconografía en la interfaz.
- **Variables CSS personalizadas (`:root`)**: para definir la paleta de colores institucional.
- **Diseño responsivo**: mediante media queries para adaptarse a pantallas pequeñas.

---

## Estructura principal

- `index.html`: Contiene la estructura de la aplicación, incluidos los modales, botones y contenedores para notas.
- `src/css/app.css`: Estilos personalizados que definen la apariencia general, colores institucionales y estilos para modales y tarjetas.
- `src/js/app.js`: Lógica JavaScript que controla la creación, almacenamiento, visualización y modales de las notas.
- `manifest.webmanifest`: Declaración del manifiesto PWA para instalación y configuración básica.
- `sw.js`: (no incluido en el código) Servicio trabajador para funcionalidad offline.

---

## Cómo usar

1. Abrir la página web.
2. Presionar el botón flotante "+" para abrir el modal de creación de nota.
3. Ingresar título y descripción, luego enviar.
4. La nota aparecerá como una tarjeta en la vista principal.
5. Hacer clic en "Ver detalles" para ver la nota completa en un modal.
6. Las notas se guardan automáticamente en localStorage y se recuperan al recargar la página.