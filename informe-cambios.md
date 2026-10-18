# Informe de cambios en el código

Después de la última entrega me marcaron varias cosas y me puse a revisarlas una por una. Lo que voy a contar aquí es qué cambié, cómo lo dejé y qué decidí no tocar. Al final dejo una tabla con el antes y el después de cada punto.

## 1. Los `!important`

Ese era el punto que más me preocupaba porque era el que daba el problema más fuerte. En el CSS había **9 `!important`** y los nueve estaban en la misma regla: el bloque final de `base.css`, el que apaga las animaciones cuando el sistema tiene activada la opción de "reducir movimiento".

Lo que hice fue reescribir esa regla en vez de ir quitando los `!important` de a uno. Antes la lista todos los tags (`html, body, div, span, h1, h2...`) y les ponía `!important` a fuerza. Ahora uso el selector universal `*`, `*::before` y `*::after`, que es lo que se hace normalmente para esto, y aparte mención de forma explícita los tres elementos que sí tienen animación propia (`.reveal`, `.reveal--left` y `.loading-spinner`), para que no dependan de nadie.

Resultado: **0 `!important` en todo el proyecto.**

## 2. Los `z-index`

Antes los valores estaban por las nubes: 200 en la cabecera, 500 en el menú móvil, 600 en el botón de hamburguesa y 100 en el visor de certificados. Funcionaba, pero no tiene sentido tener números así de grandes y además es de lo que más resalta cuando alguien revisa el código de arriba abajo.

Los bajé todos a una escala chiquita y ordenada:

| Elemento | Antes | Ahora |
|---|---|---|
| Cabecera (escritorio) | 200 | 10 |
| Cabecera (móvil) | 200 | 10 |
| Menú móvil | 500 | 9 |
| Botón hamburguesa | 600 | 10 |
| Visor de certificados | 100 | 8 |

El más grande de todo el proyecto ahora es 10. Como todo queda en el mismo orden de capas, la jerarquía visual no se movió: el menú sigue encima del contenido y el visor sigue encima de todo lo que está en pantalla.

## 3. Tamaño mínimo de letra

Revisé uno por uno todos los `font-size` de los tres archivos CSS. Encontré cinco declaraciones por debajo de 14px: el `0.7rem` y el `0.75rem` que estaban en la etiqueta pequeña, en la ayuda flotante, en el cargo del logo, en la categoría de las tarjetas de proyecto y en las etiquetas de tecnología. Todas las pasé a `0.875rem`, que son 14px.

Aparte de eso encontré uno que no aparecía a simple vista porque estaba escondido en una variable: `--font-size-xs` valía `0.75rem` (12px) y la usaba el año de las certificaciones. Lo cambié al tamaño pequeño (`14px`) y borré la variable, porque así no queda un valor chico colgado ahí esperando a que alguien lo use.

También revisé los que se declaran en `em` o con `clamp()`: el más chico de todos da 14px o más. Hoy no queda ningún texto por debajo del mínimo.

## 4. Encabezados de las páginas

Revisé las 7 páginas para ver cómo quedaban los encabezados. Cada página tiene **un solo `<h1>`**: en la página principal es el título del hero, y en cada subpágina es el título del proyecto. Después siguen `h2` y `h3` en orden. Ninguna página se quedó con dos `h1` ni sin `h1`.

## 5. Datos para redes sociales

Las páginas ya tenían las etiquetas de Open Graph (`og:url`, `og:image`, etc.) pero les faltaba `twitter:url`, que es la que corresponde cuando el enlace se comparte en Twitter. Ya la tienen las 7 páginas.

## 6. Formulario de contacto

Le agregué `autocomplete` a los cuatro campos: `name` y `email` los dejo autocompletar y en `subject` y `message` puse `off`, que es lo que se hace cuando no conviene que el navegador rellene esos campos solo.

## 7. Comentarios en el HTML

Agregué comentarios explicando qué hay en cada parte: el video del hero, el overlay, la marquesina, las columnas de "sobre mí", los contadores, y en los servicios un comentario por tarjeta diciendo cuál es cuál. Los dejé en español y en el mismo formato que ya se usaba en el resto del archivo, con `<!-- ... -->`.

## 8. CSS: quité lo que no se usaba

Acá fue donde más cambió el código. Revisé clase por clase contra el HTML y JS, y fui borrando lo que no tenía ningún uso.

**`base.css`: 503 líneas → 336 líneas**

- Eliminé un montón de clases de utilidad que no estaban en ningún HTML (`.grid--*`, `.flex--*`, `.align-*`, `.justify-*`, `.mt-*`, `.mb-*`, `.p-*`, `.divider`, `.card`, `.mx-auto`, `.container--narrow`, `.container--wide`, `.section--compact`).
- Eliminé 5 animaciones que no se llamaban en ningún lado (`fadeInUp`, `fadeIn`, `blinkCaret`, `slideInRight`, `slideInLeft`).
- Eliminé `.hover-lift`.

**`main.css`: 1349 líneas → 1259 líneas**

- Eliminé componentes que no se usaban en ninguna parte: `.badge` y sus variantes, `.tooltip`, `.avatar`, `.progress`, `.skeleton`, `.separator`, `.btn--ghost`, `.btn--icon` y `.tag__icon`. Con eso también borré las variables de color que solo servían para esas reglas.

**`responsive.css`: 551 líneas → 549 líneas**

- Solo le saqué la referencia a `.badge` de la regla de contraste forzado, que estaba ahí por lo que eliminé arriba.

**Y sobre las clases de utilidad que sí se usaban**, en vez de dejarlas las reemplacé por clases con nombre propio:

- `text-center` en los títulos de sección → `.section__title`
- `text-center mb-3xl` en los subtítulos → `.section__subtitle`
- `flex flex--gap-md` en un contenedor de enlaces de una subpágina → `.project-detail__links`

También pasó que las reglas de las migas de pan estaban escritas en dos archivos distintos (`base.css` y `main.css`), con algunas reglas repetidas. Las junté todas en `main.css`, que es donde van los componentes.

El CSS en total pasó de **2403 a 2144 líneas** (259 menos) y la página se ve igual que antes.

## 9. Documentación

Reescribí el `README.md`: pasó de 129 a 85 líneas. Le quité los títulos con emoji, saqué las frases de marketing que no decían nada concreto (lo de "100% en Lighthouse", "hecho artesanalmente", etc.) y lo dejé explicando en palabras normales qué es el proyecto, cómo está organizado y en qué está hecho cada cosa. De paso corregí la dirección de `git clone`, que apuntaba a un repositorio que no existe.

También agregué un `.gitignore` con lo de siempre (archivos de sistema, carpetas de editores y logs).

## Qué no toqué y por qué

- **El JavaScript** (`main.js` e `interactions.js`): no lo modifiqué. Ya estaba en español, con funciones con nombre, comentarios explicando qué hace cada cosa y cada archivo encerrado en su IIFE. Las observaciones eran de CSS y HTML, y cambiar código que funciona sin necesidad solo sirve para meter un error.
- **La estructura de carpetas**: sigue igual, con 3 hojas de estilo y 2 scripts. No los uní en un solo archivo.
- **Las animaciones**: todas se quedan. El tecleo del título, la marquesina, el parallax del video, las apariciones al hacer scroll, los contadores, el carrusel, las tarjetas que se despliegan y el visor de certificados.
- **Los iconos**: `icons.svg` ya estaba bien, con 36 `<symbol>` que se llaman desde `<use>`. No hacía falta nada.
- **Los videos**: las seis demos ya tienen su `.mp4` junto al `.webm`, así que el respaldo ya existía.
- **Las listas**: revisé navegación, servicios, habilidades, pie de página, estadísticas y etiquetas. Todas usan `<ul>` u `<ol>` con sus `<li>` adentro, y no hay ningún `<div>` metido dentro de una lista ni ninguna lista envuelta en un `<div>`.
- **`.htaccess`**: estaba bien, no lo toqué.

## Resumen

| Qué se revisó | Antes | Ahora |
|---|---|---|
| `!important` en CSS | 9 | 0 |
| Valor de `z-index` más alto | 600 | 10 |
| Textos por debajo de 14px | 6 | 0 |
| `<h1>` por página | 1 | 1 (igual) |
| Páginas con `twitter:url` | 0 de 7 | 7 de 7 |
| Campos con `autocomplete` | 0 de 4 | 4 de 4 |
| Líneas de CSS | 2403 | 2144 |
| Líneas del README | 129 | 85 |
| JS modificado | — | sin cambios |

En total son 11 archivos modificados: los 3 CSS, la página principal, las 6 subpáginas y el README.
