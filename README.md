# Portafolio de Sandra Paola Granados Pachón

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Azure" />
  <img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
</p>

Este es mi portafolio web personal. Es un sitio estático hecho a mano con HTML, CSS y JavaScript, sin frameworks ni librerías externas. Sirve para presentar mi perfil como DBA Senior y Cloud Architect, y para mostrar en detalle 6 de mis proyectos.

## Qué contiene

El sitio se divide en una página principal y seis subpáginas, una por proyecto:

- **Página principal** con las secciones de inicio, sobre mí, proyectos, servicios, habilidades, testimonios y contacto.
- **Seis subpáginas de proyectos** dentro de la carpeta `proyectos/`, cada una con un video de demostración, la arquitectura usada, los resultados obtenidos y una galería de capturas.

Algunas cosas que hacen el sitio más amigable:

- El menú se vuelve hamburguesa en móvil.
- Los números de experiencia suben con una animación cuando los ves.
- Los certificados se abren en un visor de pantalla completa (lightbox).
- Los servicios y las habilidades son tarjetas que se despliegan al hacer clic.
- Todo respeta la preferencia del sistema de reducir movimiento.

## Cómo está organizado

```text
portafolio-web/
├── index.html              # Página principal
├── README.md               # Este archivo
├── .htaccess               # Compresión y caché para el servidor Apache
│
├── css/
│   ├── base.css            # Reset, variables de diseño y animaciones
│   ├── main.css            # Estilos de cada componente y sección
│   └── responsive.css      # Ajustes para móvil y tablet
│
├── js/
│   ├── main.js             # Menú, scroll suave, animaciones y formulario
│   └── interactions.js     # Carrusel, lightbox, pestañas y acordeones
│
├── proyectos/              # Las 6 subpáginas de proyectos
│
├── assets/                 # Imágenes, videos e iconos
└── originales/             # Videos e imágenes sin optimizar (el resto ya está convertido)
```

## De qué está hecho

No uso React, Bootstrap, Tailwind ni jQuery: todo se escribe directamente.

**En HTML** uso las etiquetas semánticas (`<header>`, `<nav>`, `<section>`, `<article>`), las imágenes con `<picture>` para entregar WebP con respaldo en JPG, y `loading="lazy"` para no cargar lo que no se ve.

**En CSS** uso la metodología BEM: cada bloque tiene su nombre (`service-card`), sus elementos dentro (`service-card__title`) y sus modificadores (`service-card--featured`). Los colores, espacios y tamaños de letra viven en variables (`--color-accent-primary`) definidas una sola vez en `base.css`. Los tamaños de los títulos usan `clamp()` para crecer según la pantalla sin necesidad de muchas reglas.

**En JavaScript** uso funciones con nombre (`closeMenuHandler`, `submitHandler`) dentro de un IIFE, que es una función que se ejecuta sola para que sus variables no se mezclen con las de otros archivos. Los dos scripts se cargan con `defer`, así que no hace falta esperar a `DOMContentLoaded`. Para las animaciones de aparición uso `IntersectionObserver` en vez de recalcular en cada evento de scroll.

## Cómo verlo en local

No necesita compilación ni dependencias. Primero se obtiene el código y luego se sirve:

```bash
git clone https://github.com/paolagranadosp11/portafolio-web.git
cd portafolio-web
```

Se puede abrir directo con `index.html` en el navegador, pero para que funcionen bien las rutas relativas de las subpáginas conviene servirlo con un servidor local:

```bash
python -m http.server 8000
# o
npx live-server
```

Luego abre `http://localhost:8000`.

## Contacto

- **LinkedIn:** [Sandra Paola Granados Pachón](https://www.linkedin.com/in/sandra-paola-granados-pachon-79b990417/)
- **GitHub:** [@paolagranadosp11](https://github.com/paolagranadosp11/)
- **Correo:** [paolagranadosp@hotmail.com](mailto:paolagranadosp@hotmail.com)
