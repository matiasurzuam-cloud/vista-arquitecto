# 3vertices Architecture

Crea un sitio web para 3vertices, una oficina de arquitectura especializada en diseño de vivienda unifamiliar y permisología (regularización de proyectos y normativa municipal). ESTILO: minimalista, editorial, profesional. Mucho espacio en blanco, tipografía como protagonista, paleta neutra (blanco, negro, grises, un solo color de acento). Fuente: Neutra Text TF (si no está disponible como webfont, usar Instrument Sans o Public Sans de Google Fonts como alternativa geométrica similar). Sin gradientes, sin sombras decorativas, sin iconos genéricos de stock. ARQUITECTURA: Single Page Application (SPA) — un solo archivo/proyecto. La navegación entre secciones se hace vía JavaScript, sin recargar la página. Cada sección ocupa el 100% de la pantalla al ser seleccionada (no scroll largo, cambio de vista completo como si fuera otra página). La URL puede reflejar la sección activa con hash routing (#regularizacion, #proyectos, etc.) para que los enlaces sean compartibles y el botón "atrás" funcione. NAVBAR (fijo arriba): Inicio | Nosotros | Regularización | Proyectos | Impresión | Contacto SECCIONES: 1. INICIO Hero con foto de oficina (placeholder), frase: "Oficina especializada en diseño de vivienda unifamiliar y permisología: gestión de obra, regularización de proyectos y normativa municipal". Botones de acceso directo a "Regularización" e "Impresión". 2. NOSOTROS Fotos de la oficina (placeholders). Bloque de "Metodología de trabajo" en 4 etapas (estilo editorial, numeradas, con breve descripción cada una — dejar textos placeholder tipo "Etapa 1: Diagnóstico", etc. para completar después). 3. REGULARIZACIÓN Página índice con tarjetas (cards) que al hacer clic despliegan un panel/vista con el detalle de cada servicio, dentro de la misma sección sin salir de ella: - Ley del mono (90m² / 140m²) - Vivienda social y económica - Obra nueva (vivienda o local comercial) - Ampliación de obra menor (hasta 100m²) - Regularización de locales comerciales - Asesoría técnica previa (presencial en oficina) - Visita técnica a terreno (solo Región del Maule, duración 1 hora) Cada tarjeta con: título, descripción breve (placeholder), botón "Agendar por WhatsApp" que enlace a wa.me con mensaje predefinido según el servicio. 4. PROYECTOS Galería tipo portafolio en grid, cada proyecto con foto de portada (placeholder), al hacer clic abre vista de detalle con más fotos + info + plano (placeholder). 5. IMPRESIÓN Tratada visualmente como una mini-tienda, con leve cambio de paleta si se desea diferenciarla del resto (mismo minimalismo, pero more "e-commerce"): - Plotter de planos (hasta A0, ancho 90cm, largo 2m) - Impresión fotográfica profesional (A4 a A0, A2 solo mate) - Carrito de compra simple con: selección de tamaño, opción de retiro o envío (Blue Express), estado de pago en cuotas (inicio/compromiso → aprobación) Placeholder de productos con precios de ejemplo. 6. CONTACTO Formulario simple (nombre, email, mensaje), datos de contacto, botón grande de WhatsApp, mapa (placeholder, Región del Maule). FUNCIONALIDAD: - Totalmente responsive (mobile-first) - Transiciones suaves entre secciones (fade, no scroll) - Botones de WhatsApp con wa.me y mensaje predefinido según la sección - Sin backend por ahora — solo frontend, datos de ejemplo/placeholde. FUENTE: Neutra Text TF, con 3 variantes según jerarquía:

   - Neutra Text TF Light: textos largos, párrafos, descripciones de servicios 

     (cuerpo de texto general)

   - Neutra Text TF Regular: títulos de sección, nombres de servicios, navbar, 

     botones (peso intermedio, uso general/UI)

   - Neutra Text TF Bold Italic: frases destacadas, citas, el eslogan del hero 

     en Inicio, llamados a la acción puntuales (uso exclusivo para énfasis, 

     no para bloques largos)

Nota: Neutra Text TF es una fuente comercial (House Industries). Si no cuentan 

con la licencia webfont, usar como alternativa Instrument Sans o Public Sans 

(Google Fonts), aplicando la misma lógica de pesos: Light para cuerpo, Regular 

para títulos/UI, y el itálico bold del family para énfasis puntual.
PALETA DE COLOR:

   - Azul principal (acento): #1B3A5C (azul petróleo/marino oscuro) — para 

     botones, enlaces activos, títulos destacados, líneas divisorias

   - Azul secundario (hover/detalles suaves): #4A7A9C

   - Fondo: blanco (#FFFFFF) o gris muy claro (#F7F8FA)

   - Texto principal: gris oscuro casi negro (#1A1A1A), no negro puro

   - Texto secundario: gris medio (#6B6F76)

   - Sin gradientes — bloques de color planos únicamente

Esta paleta debe mantenerse consistente en todas las secciones, incluida 

"Impresión" (misma familia de azules, sin cambiar a otra gama de color).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/63de83d4-ed0b-4986-ad44-4993858c1a2a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
