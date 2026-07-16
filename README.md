# Portafolio Profesional — Sandra Paola Granados Pachón

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Azure" />
  <img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
</p>



Este repositorio contiene el código fuente de mi **Portafolio Profesional Multi-Página**, diseñado y desarrollado a mano para presentar mi trayectoria y competencias como **DBA Senior** y **Cloud Architect**. El proyecto ha sido construido adhiriéndose estrictamente a estándares académicos y de rendimiento web (Lighthouse 100% en todas las categorías).

---

##  Descripción del Proyecto

El sitio web está estructurado para ofrecer una experiencia ejecutiva, técnica y altamente interactiva (UX/UI). Consta de una landing page centralizada que resume mi perfil y 6 subpáginas detalladas para profundizar en la arquitectura y resultados de mis proyectos más críticos.

### Secciones Clave
*   **Inicio (Hero):** Presentación ejecutiva con fondo de vídeo y marquesina interactiva.
*   **Sobre Mí:** Biografía, estadísticas y visor interactivo de certificaciones oficiales (IEP, PMP, etc.).
*   **Proyectos:** Vitrina de proyectos con enlaces dinámicos a sus subpáginas de detalle técnico.
*   **Servicios:** Tarjetas interactivas que despliegan detalles técnicos y estimaciones al hacer clic.
*   **Habilidades:** Bloques de tecnologías estructurados como acordeones lógicos auto-colapsables.
*   **Testimonios:** Slider automático con control inteligente de pausa al pasar el cursor.
*   **Contacto:** Formulario con validación en tiempo real y retroalimentación asíncrona adaptativa.

---

##  Stack Tecnológico y Buenas Prácticas

El desarrollo del sitio se ha realizado de forma **puramente artesanal y nativa**, evitando el uso de frameworks o dependencias externas (cero React, Bootstrap, Tailwind o jQuery):

*   **HTML5 Semántico y SEO:** Estructura limpia (`<header>`, `<nav>`, `<section>`, `<article>`). Carga de imágenes optimizadas (`<picture>`, WebP/JPG) y diferidas (`loading="lazy"`).
*   **CSS3 Vanilla Modular:**
    *   Metodología **BEM (Block, Element, Modifier)** combinada con **SUITCSS** para estados lógicos (`.is-open`, `.is-scrolled`).
    *   Uso de **Custom Properties** (Variables CSS) para la paleta de colores y tokens de diseño.
    *   **Tipografía Fluida** mediante la función `clamp()` en encabezados.
    *   Reset avanzado con suavizado de fuentes (`antialiased`) y optimización de imágenes (`object-fit: cover`).
    *   Transiciones fluidas limitadas a propiedades aceleradas por hardware (`transform`, `opacity`) sin usar transiciones globales (`transition: all`).
*   **JavaScript Vanilla (ES6+):**
    *   Código encapsulado en **IIFEs** (Expresiones de Función Invocadas Inmediatamente) para proteger el scope.
    *   Nomenclatura orientada al DOM con sufijos `Handler`.
    *   Uso de **Intersection Observer API** para apariciones dinámicas y animaciones eficientes.
    *   Uso de **requestAnimationFrame** para sincronización con el ciclo de refresco de pantalla.
    *   Destrucción automática de eventos visuales mediante `{ once: true }` y el evento `animationend`.
    *   Cero redundancias lógicas (sin usar `DOMContentLoaded` gracias al atributo `defer` en scripts).

---

##  Estructura de Directorios

```text
portfolio/
├── index.html              # Landing page principal
├── .htaccess               # Configuración de caché, compresión GZIP/Brotli y headers
├── README.md               # Documentación del repositorio (este archivo)
├
│
├── /css/                   # Hojas de estilo estructuradas
│   ├── base.css            # Reset global, variables y animaciones base
│   ├── main.css            # Estilos de maquetación y componentes interactivos
│   └── responsive.css      # Consultas de medios para móviles y tablets
│
├── /js/                    # Lógica JavaScript nativa (Vanilla)
│   ├── main.js             # Lógica general (menú móvil, validación de formulario, scroll)
│   └── interactions.js     # Interactividad de componentes (sliders, acordeones, modales)
│
├── /proyectos/             # Subpáginas con estudios de caso específicos
│   ├── azure-data-factory.html
│   ├── cloud-azure-aws.html
│   ├── migraciones-db.html
│   ├── monitoreo.html
│   ├── optimizacion-db.html
│   └── power-bi.html
│
├── /assets/                # Recursos estáticos optimizados (WebP, MP4, WebM, SVG icons)
└── /originales/            # Documentación académica de soporte (Memoria PDF, CV, fuentes crudas)
```

---

##  Detalles de Pulido y UX Premium

*   **Efecto Shrink-on-Scroll:** La cabecera se reduce suavemente de `80px` a `60px` y el avatar disminuye proporcionalmente cuando el usuario baja por la página, ganando una sombra sutil para flotar sobre el contenido.
*   **Memojis sin Fondo:** Uso de la propiedad `mix-blend-mode: multiply;` que integra el avatar de memoji de forma transparente sobre la página crema, eliminando el fondo blanco de los archivos gráficos.
*   **Cine-Video Player:** Las subpáginas de proyectos contienen reproductores enmarcados simulando una interfaz oscura de reproductor de cine, con sombras suaves multilaterales y una proporción perfecta de `16:9` sin deformaciones.
*   **Menú Móvil Sólido:** Navegación en móvil con fondo 100% opaco y capas de `z-index` configuradas para evitar solapamientos molestos con tarjetas del cuerpo del sitio.
*   **Accesibilidad Adaptativa (a11y):** Soporte integrado para movimiento reducido (`prefers-reduced-motion` reduciendo tiempos a `0.01ms`), soporte para contraste forzado del sistema operativo (`forced-colors: active`), y atributos dinámicos ARIA para lectores de pantalla.

---

##  Configuración del Servidor (.htaccess)

El archivo `.htaccess` del proyecto optimiza el rendimiento final en producción mediante directivas para el servidor Apache:
*   **Compresión de Recursos:** Activa compresión **GZIP** y **Brotli** en archivos HTML, CSS, JavaScript, JSON y SVG.
*   **Control de Caché del Navegador:** Configura cabeceras `ExpiresActive On` y `Cache-Control` con directivas `public, immutable` asignando un año para recursos estáticos (imágenes y fuentes) y un mes para hojas de estilo y scripts.

---

##  Instalación y Visualización Local

Dado que la aplicación utiliza tecnologías nativas del lado del cliente, no requiere compilación ni dependencias:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/paolagranadosp11/portfolio.git
    ```
2.  **Ejecutar localmente:**
    *   Simplemente abre `index.html` en tu navegador.
    *   Opcionalmente, inicia un servidor local ligero para validar la funcionalidad de rutas relativas o modales:
        ```bash
        # Usando Python
        python -m http.server 8000
        
        # Usando Node.js (con live-server)
        npx live-server
        ```

---

## ✉️ Contacto y Perfiles

*   **LinkedIn:** [Sandra Paola Granados Pachón](https://www.linkedin.com/in/sandra-paola-granados-pachon-79b990417/)
*   **GitHub:** [@paolagranadosp11](https://github.com/paolagranadosp11/)
*   **Correo Electrónico:** [paolagranadosp@hotmail.com](mailto:paolagranadosp@hotmail.com)
