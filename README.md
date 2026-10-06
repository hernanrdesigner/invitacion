# Invitación Teckio ERP · Expo CIHAC 2026

Landing page de invitación para visitar a **Teckio ERP** en **Expo CIHAC 2026** (Stand C 609, 14–16 de octubre, Centro Banamex, CDMX).

Diseño original en [Figma](https://www.figma.com/design/T6CXSRhI5VFHMqgrbTErtI/backgound_figma?node-id=233-88&m=dev).

Es un sitio estático (HTML, CSS y JavaScript sin frameworks): no necesita compilación ni dependencias.

## Estructura

```
├── index.html               Página única con todas las secciones
├── css/styles.css           Estilos (tokens de color/tipografía al inicio del archivo)
├── js/main.js               Formulario, cuenta regresiva y animaciones de scroll
├── assets/                  Imágenes (WebP), íconos SVG, imagen para redes y archivo .ics
└── tools/serve.ps1          Servidor local para desarrollo (Windows)
```

## Ver en local

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Después abre http://localhost:5500. Cualquier otro servidor estático también funciona (por ejemplo la extensión *Live Server* de VS Code).

> Abrir `index.html` con doble clic funciona casi por completo, pero algunos navegadores bloquean la descarga del `.ics` desde `file://`.

## Publicar con GitHub Pages

1. En el repositorio, ve a **Settings → Pages**.
2. En **Source** elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
3. En un par de minutos el sitio queda en `https://<usuario>.github.io/<repositorio>/`.

## Pendientes antes de lanzar

- [ ] **URL para redes sociales:** en `index.html`, reemplaza `https://teckio.mx/expo-cihac-2026/` (etiquetas `og:url` y `og:image`) por la URL final. WhatsApp y Facebook requieren la URL absoluta para mostrar la imagen de vista previa.
- [ ] **Formulario:** en `js/main.js`, asigna `FORM_ENDPOINT` a un servicio que guarde los registros (Formspree, Google Apps Script o una API propia). Mientras esté vacío, el formulario solo valida y muestra el mensaje de éxito.

## Personalizar

| Qué | Dónde |
| --- | --- |
| Colores y tamaños de texto | Variables en `:root`, inicio de `css/styles.css` |
| Fecha de la cuenta regresiva | Atributos `data-start` / `data-end` de `#countdown` en `index.html` |
| Evento de calendario | `assets/expo-cihac-2026.ics` y el enlace de Google Calendar en `index.html` |
| Captura del ERP en la laptop | Reemplaza `assets/erp-dashboard.webp` (proporción ~2.1:1) |
