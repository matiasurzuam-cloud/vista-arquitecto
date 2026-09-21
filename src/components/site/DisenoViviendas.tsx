import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Reveal } from "./motion";

const IMAGENES = import.meta.glob<string>("../../assets/viviendas/*/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

function imagen(carpeta: string, archivo: string) {
  return IMAGENES[`../../assets/viviendas/${carpeta}/${archivo}.jpg`];
}

type Vista = {
  archivo: string;
  etiqueta: string;
  /** Los planos se muestran completos sobre fondo blanco; los renders a pantalla completa. */
  tipo: "render" | "plano";
  /** Imagen vertical: se muestra completa sobre un fondo difuminado. */
  vertical?: boolean;
};

type Proyecto = {
  id: string;
  nombre: string;
  carpeta: string;
  vistas: Vista[];
};

type ModeloVivienda = {
  id: string;
  numero: string;
  superficie: string;
  proyectos: Proyecto[];
};

const MODELOS: ModeloVivienda[] = [
  {
    id: "vivienda-140",
    numero: "01",
    superficie: "Hasta 140 m²",
    proyectos: [
      {
        id: "fj",
        nombre: "Vivienda F+J",
        carpeta: "140-fj",
        vistas: [
          { archivo: "01-vista-frontal", etiqueta: "Vista frontal", tipo: "render" },
          { archivo: "02-hall-acceso", etiqueta: "Hall de acceso", tipo: "render" },
          { archivo: "03-cocina", etiqueta: "Cocina", tipo: "render" },
          { archivo: "04-planta", etiqueta: "Planta de arquitectura", tipo: "plano" },
        ],
      },
    ],
  },
  {
    id: "vivienda-200",
    numero: "02",
    superficie: "Hasta 200 m²",
    proyectos: [
      {
        id: "ch",
        nombre: "Vivienda CH",
        carpeta: "200-ch",
        vistas: [
          { archivo: "01-visualizacion-1", etiqueta: "Visualización 1", tipo: "render" },
          { archivo: "02-visualizacion-2", etiqueta: "Visualización 2", tipo: "render" },
          { archivo: "03-isometrica", etiqueta: "Isométrica", tipo: "plano" },
          { archivo: "04-elevaciones", etiqueta: "Elevaciones", tipo: "plano" },
          { archivo: "05-planta", etiqueta: "Planta de arquitectura", tipo: "plano" },
        ],
      },
      {
        id: "pm",
        nombre: "Vivienda PM",
        carpeta: "200-pm",
        vistas: [
          { archivo: "01-vista-general", etiqueta: "Vista general", tipo: "render" },
          { archivo: "02-elevacion-frontal", etiqueta: "Elevación frontal", tipo: "render" },
          { archivo: "03-elevacion-posterior", etiqueta: "Elevación posterior", tipo: "render" },
          { archivo: "04-planta", etiqueta: "Planta de arquitectura", tipo: "plano" },
        ],
      },
    ],
  },
  {
    id: "vivienda-250",
    numero: "03",
    superficie: "Hasta 250 m²",
    proyectos: [
      {
        id: "campo",
        nombre: "Vivienda de campo",
        carpeta: "250-campo",
        vistas: [
          { archivo: "01-vista-frontal", etiqueta: "Vista frontal", tipo: "render" },
          { archivo: "02-acceso", etiqueta: "Acceso", tipo: "render" },
          { archivo: "03-hall-acceso", etiqueta: "Hall de acceso", tipo: "render", vertical: true },
          {
            archivo: "04-sala-de-estar",
            etiqueta: "Sala de estar",
            tipo: "render",
            vertical: true,
          },
          { archivo: "05-comedor", etiqueta: "Comedor", tipo: "render" },
          { archivo: "06-planta", etiqueta: "Planta de arquitectura", tipo: "plano" },
        ],
      },
    ],
  },
  {
    id: "vivienda-300",
    numero: "04",
    superficie: "Hasta 300 m²",
    proyectos: [],
  },
];

type Parte = string | { b: string };

const PROCESO: { titulo: string; texto: Parte[] }[] = [
  {
    titulo: "Entendimiento y Análisis del Entorno (Tu visión primero)",
    texto: [
      "Todo gran proyecto comienza con una buena conversación. Nos reunimos contigo para entender exactamente qué necesitas (cantidad de dormitorios, distribución, cocina, baños, etc.). Luego, realizamos una ",
      { b: "visita a terreno" },
      " para hacer un análisis solar, estudio topográfico inicial y un levantamiento fotográfico. Tu casa se diseñará para aprovechar al máximo las características naturales de tu terreno.",
    ],
  },
  {
    titulo: "Diseño Arquitectónico y Precisión Técnica",
    texto: [
      "Desarrollamos el dibujo técnico completo de tu futura casa. Esto incluye planos de arquitectura (cortes, plantas y elevaciones) y ",
      { b: "planos de detalles técnicos" },
      " donde definimos con precisión las terminaciones, revestimientos y detalles constructivos.",
    ],
  },
  {
    titulo: "Visualización 3D: Vive tu casa antes de construirla",
    texto: [
      "No tendrás que imaginar los espacios, los vas a ver. Modelamos tu proyecto en 3D en tiempo real para que visualices la habitabilidad, los materiales y el mobiliario. Trabajamos las correcciones contigo y te entregamos ",
      { b: "10 imágenes semi-realistas (Renders)" },
      " y un ",
      { b: "video de recorrido virtual de 10 minutos" },
      " para que camines por tu futura casa.",
    ],
  },
  {
    titulo: "Planificación, Presupuesto y Especialidades",
    texto: [
      "Cuidamos tu inversión. Realizamos la ",
      { b: "cubicación exacta" },
      " (cálculo de cantidades de materiales a utilizar) y elaboramos las Especificaciones Técnicas con todas las normativas y procesos necesarios.",
    ],
  },
  {
    titulo: "Supervisión y Acompañamiento en Obra",
    texto: [
      "Nuestro compromiso no termina en el papel. Incluimos la inspección técnica inicial del trazado y emplazamiento del proyecto (primera visita a terreno incluida), asegurando que la construcción comience cumpliendo con lo estipulado en planos y especificaciones técnicas.",
    ],
  },
];

const ENTREGABLES = [
  {
    titulo: "2 copias de Planos impresos de Alta Calidad",
    texto:
      "Te entregamos dos juegos físicos completos de tu proyecto. Cada carpeta contiene aproximadamente 20 planos constructivos y de arquitectura.",
  },
  {
    titulo: "Documentación Legal y Técnica",
    texto:
      "Especificaciones técnicas completas, todo firmado y respaldado por nuestros profesionales responsables.",
  },
  {
    titulo: "Imágenes del Proyecto",
    texto: "Tus renders 3D impresos en alta calidad para que empieces a visualizar tu nuevo hogar.",
  },
  {
    titulo: "Respaldo Digital",
    texto:
      "Un pendrive con todos los archivos, planos en formato digital, documentos, imágenes y el recorrido virtual de tu vivienda.",
  },
];

const PLANOS = [
  "PLANO DE UBICACION",
  "PLANTA DE EMPLAZAMIENTO",
  "CUADRO Y POLIGONO DE SUPERFICIES",
  "PLANTA DE ARQUITECTURA",
  "PLANTA DE FUNDACIONES",
  "PLANTA DE DISTRIBUCION DE CERCHAS O VIGAS",
  "PLANTA DE CUBIERTAS",
  "ELEVACIONES – FRONTAL – POSTERIOR - LATERAL DERECHA- LATERAL IZQUIERDA",
  "2 CORTES LONGITUDINALES – 4 CORTES TRANSVERSALES",
  "DETALLES DE PUERTAS Y VENTANAS.",
  "DETALLES DE CERCHAS, VIGAS Y PILARES.",
  "DETALLES TECNICOS Y ENCANTILLONES.",
  "PLANO DE ISOMETRICAS",
  "PLANO DE VIZUALIZACIONES 3D",
  "PLANO DE RENDERS",
  "BOCETO DE ELECTRICIDAD – (LUCES, INTERRUPTORES Y ENCHUFES)",
];

const easing = [0.22, 1, 0.36, 1] as const;

function Rich({ partes }: { partes: Parte[] }) {
  return (
    <>
      {partes.map((parte, i) =>
        typeof parte === "string" ? (
          parte
        ) : (
          <strong key={i} className="font-medium text-[#173b5d]">
            {parte.b}
          </strong>
        ),
      )}
    </>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`h-px w-10 ${light ? "bg-white/50" : "bg-[#0f5da8]"}`} />
      <span
        className={`text-[10px] uppercase tracking-[0.24em] ${
          light ? "text-white/60" : "text-[#0f5da8]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/** Rectángulo cerrado, usado para dibujar muros con espesor. */
const muro = (x: number, y: number, w: number, h: number) => `M${x} ${y}h${w}v${h}h${-w}Z`;

const MUROS_EXTERIORES = "M60 80H500V330H60Z M66 86H494V324H66Z";

const MUROS_INTERIORES = [
  muro(247, 86, 6, 147),
  muro(66, 227, 54, 6),
  muro(155, 227, 95, 6),
  muro(377, 86, 6, 44),
  muro(377, 165, 6, 159),
  muro(383, 197, 42, 6),
  muro(460, 197, 34, 6),
  muro(167, 233, 6, 91),
].join(" ");

const PUERTAS = [
  "M155 230V195 M120 230A35 35 0 0 1 155 195",
  "M380 165H345 M380 130A35 35 0 0 0 345 165",
  "M460 200V165 M425 200A35 35 0 0 1 460 165",
  "M270 324V289 M305 324A35 35 0 0 0 270 289 M270 324V330 M305 324V330",
].join(" ");

const VENTANAS = [
  [95, 80, 60, 6],
  [285, 80, 60, 6],
  [415, 80, 50, 6],
  [494, 240, 6, 60],
  [60, 110, 6, 60],
  [60, 262, 6, 40],
  [90, 324, 50, 6],
  [420, 324, 60, 6],
]
  .map(([x, y, w, h]) =>
    w > h ? `${muro(x, y, w, h)} M${x} ${y + 3}h${w}` : `${muro(x, y, w, h)} M${x + 3} ${y}v${h}`,
  )
  .join(" ");

const ESCALERA = Array.from({ length: 9 }, (_, i) => `M180 ${248 + i * 8}H240`).join(" ");

const MOBILIARIO = [
  // Cocina
  muro(72, 92, 168, 16),
  muro(72, 108, 16, 82),
  muro(130, 150, 70, 26),
  "M105 96h16v8h-16Z",
  // Living y comedor
  muro(270, 104, 82, 26),
  "M270 112h82",
  muro(292, 146, 38, 20),
  muro(305, 205, 56, 34),
  "M312 199h10v6h-10Z M340 199h10v6h-10Z M312 239h10v6h-10Z M340 239h10v6h-10Z",
  // Dormitorio principal
  muro(415, 100, 70, 72),
  muro(421, 104, 26, 12),
  muro(453, 104, 26, 12),
  "M415 132h70",
  // Dormitorio secundario
  muro(390, 210, 96, 14),
  muro(415, 262, 60, 48),
  muro(421, 266, 22, 10),
  muro(447, 266, 22, 10),
  // Baño
  muro(72, 240, 90, 30),
  "M78 246h78v18h-78Z",
  "M140 292h14v10h-14Z M147 302a9 7 0 1 0 .01 0Z",
  "M96 300a8 8 0 1 0 .01 0Z",
  // Escalera
  muro(180, 240, 60, 76),
  ESCALERA,
].join(" ");

const COTAS = [
  // Superior
  "M60 48H500 M60 42V76 M250 42V76 M380 42V76 M500 42V76",
  "M56 52l8-8 M246 52l8-8 M376 52l8-8 M496 52l8-8",
  // Inferior
  "M60 356H500 M60 334V362 M250 334V362 M380 334V362 M500 334V362",
  "M56 360l8-8 M246 360l8-8 M376 360l8-8 M496 360l8-8",
  // Lateral
  "M534 80V330 M504 80H540 M504 330H540",
  "M530 84l8-8 M530 334l8-8",
].join(" ");

const EJES = [60, 250, 380, 500];

const ETIQUETAS: { x: number; y: number; texto: string; anchor?: "middle" }[] = [
  { x: 76, y: 219, texto: "COCINA" },
  { x: 268, y: 184, texto: "LIVING" },
  { x: 418, y: 190, texto: "DORMITORIO" },
  { x: 76, y: 286, texto: "BAÑO" },
];

const COTAS_TEXTO = [
  { x: 155, y: 44, texto: "4.75" },
  { x: 315, y: 44, texto: "3.25" },
  { x: 440, y: 44, texto: "3.00" },
  { x: 280, y: 352, texto: "11.00" },
];

/** Plano de planta de una vivienda dibujado con líneas: muros, puertas, ventanas, mobiliario, cotas y ejes. */
function PlanoVivienda({ className }: { className: string }) {
  const trazo = (delay: number, duration = 2.4) => ({
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration, delay, ease: easing },
  });

  const aparece = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1.2, delay, ease: easing },
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 560 380"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      className={className}
    >
      <motion.g {...aparece(0.1)} strokeWidth="0.6" strokeDasharray="10 3 2 3">
        {EJES.map((x) => (
          <path key={x} d={`M${x} 26V366`} />
        ))}
      </motion.g>

      <motion.g
        {...aparece(0.4)}
        stroke="none"
        fill="currentColor"
        fontSize="8"
        textAnchor="middle"
      >
        {EJES.map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <text x={x} y="19">
              {i + 1}
            </text>
          </g>
        ))}
      </motion.g>

      <motion.path d={MUROS_EXTERIORES} strokeWidth="1.3" {...trazo(0)} />
      <motion.path d={MUROS_INTERIORES} strokeWidth="1.1" {...trazo(0.5)} />
      <motion.path d={VENTANAS} strokeWidth="0.9" {...trazo(1.1, 1.6)} />
      <motion.path d={PUERTAS} strokeWidth="0.8" {...trazo(1.3, 1.6)} />
      <motion.path d={MOBILIARIO} strokeWidth="0.7" {...trazo(1.6, 2.6)} />
      <motion.path d={COTAS} strokeWidth="0.6" {...trazo(1.9, 1.8)} />

      <motion.g
        {...aparece(2.4)}
        stroke="none"
        fill="currentColor"
        fontSize="7"
        letterSpacing="1.2"
      >
        {ETIQUETAS.map((e) => (
          <text key={e.texto} x={e.x} y={e.y}>
            {e.texto}
          </text>
        ))}
      </motion.g>

      <motion.g
        {...aparece(2.4)}
        stroke="none"
        fill="currentColor"
        fontSize="8"
        textAnchor="middle"
      >
        {COTAS_TEXTO.map((c) => (
          <text key={c.texto} x={c.x} y={c.y}>
            {c.texto}
          </text>
        ))}
        <text transform="translate(547 210) rotate(-90)">6.25</text>
      </motion.g>
    </svg>
  );
}

function BlueprintBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.45) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <PlanoVivienda className="pointer-events-none absolute -left-16 top-[4%] hidden h-[460px] w-[680px] text-[#0f5da8] opacity-[0.16] lg:block" />
    </>
  );
}

/** Se muestra mientras un modelo aún no tiene imágenes cargadas. */
function PlaceholderVisual({ modelo }: { modelo: ModeloVivienda }) {
  return (
    <div className="relative flex min-h-[360px] items-end overflow-hidden bg-gradient-to-br from-[#173b5d]/15 to-[#071625]/75 p-6 sm:p-8">
      <PlanoVivienda className="absolute inset-0 h-full w-full p-4 text-white opacity-40" />

      <div className="relative">
        <span className="text-[8px] uppercase tracking-[0.2em] text-white/60">
          Imágenes próximamente
        </span>
        <p className="mt-2 text-4xl font-light tracking-[-0.04em] text-white sm:text-5xl">
          {modelo.superficie}
        </p>
      </div>
    </div>
  );
}

function Foto({ src, vista, alt }: { src: string; vista: Vista; alt: string }) {
  if (vista.tipo === "plano") {
    return (
      <img
        src={src}
        alt={alt}
        decoding="async"
        className="absolute inset-0 h-full w-full bg-white object-contain p-2 sm:p-6"
      />
    );
  }

  if (vista.vertical) {
    return (
      <div className="absolute inset-0 bg-[#101828]">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
        />
        <img
          src={src}
          alt={alt}
          decoding="async"
          className="relative h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function Visor({
  proyecto,
  indice,
  onCambiar,
  onCerrar,
}: {
  proyecto: Proyecto;
  indice: number;
  onCambiar: (i: number) => void;
  onCerrar: () => void;
}) {
  const total = proyecto.vistas.length;
  const vista = proyecto.vistas[indice];
  const anterior = useCallback(
    () => onCambiar((indice - 1 + total) % total),
    [indice, total, onCambiar],
  );
  const siguiente = useCallback(() => onCambiar((indice + 1) % total), [indice, total, onCambiar]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anterior, siguiente, onCerrar]);

  const botonBase =
    "flex h-12 w-12 items-center justify-center border border-white/25 bg-black/30 text-lg text-white backdrop-blur transition-colors hover:bg-white hover:text-[#101828]";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${proyecto.nombre}: ${vista.etiqueta}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#050d16]/95 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
        <div>
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">{proyecto.nombre}</p>
          <p className="mt-1 text-sm font-light tracking-wide">{vista.etiqueta}</p>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-[10px] tracking-[0.2em] text-white/60">
            {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            autoFocus
            aria-label="Cerrar"
            onClick={(e) => {
              e.stopPropagation();
              onCerrar();
            }}
            className={botonBase}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={vista.archivo}
            src={imagen(proyecto.carpeta, vista.archivo)}
            alt={`${proyecto.nombre} — ${vista.etiqueta}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easing }}
            onClick={(e) => e.stopPropagation()}
            className={`max-h-full max-w-full object-contain ${
              vista.tipo === "plano" ? "bg-white p-3 sm:p-6" : ""
            }`}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              className={`${botonBase} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={(e) => {
                e.stopPropagation();
                siguiente();
              }}
              className={`${botonBase} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
            >
              →
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function Galeria({ modelo }: { modelo: ModeloVivienda }) {
  const [proyectoIdx, setProyectoIdx] = useState(0);
  const [indice, setIndice] = useState(0);
  const [visorAbierto, setVisorAbierto] = useState(false);

  const proyecto = modelo.proyectos[proyectoIdx];
  const cerrarVisor = useCallback(() => setVisorAbierto(false), []);

  if (!proyecto) {
    return <PlaceholderVisual modelo={modelo} />;
  }

  const total = proyecto.vistas.length;
  const vista = proyecto.vistas[indice];
  const src = imagen(proyecto.carpeta, vista.archivo);
  const alt = `${proyecto.nombre} — ${vista.etiqueta}`;

  const elegirProyecto = (i: number) => {
    setProyectoIdx(i);
    setIndice(0);
  };

  const flecha =
    "flex h-11 w-11 items-center justify-center border border-white/30 bg-[#101828]/40 text-base text-white backdrop-blur transition-colors hover:bg-white hover:text-[#101828]";

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6 border-b border-black/10 p-6 sm:p-8 lg:px-10">
        <div>
          <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
            {modelo.numero} · Diseño de vivienda
          </span>
          <h3 className="mt-5 text-3xl font-light leading-[1.05] tracking-[-0.045em] text-[#101828] sm:text-4xl lg:text-5xl">
            Diseño de vivienda
            <span className="block font-medium italic text-[#173b5d]">{modelo.superficie}</span>
          </h3>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
            {modelo.proyectos.length > 1 ? "Proyectos de referencia" : "Proyecto de referencia"}
          </span>

          <div className="flex flex-wrap gap-2">
            {modelo.proyectos.map((p, i) => {
              const activo = i === proyectoIdx;

              return modelo.proyectos.length > 1 ? (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => elegirProyecto(i)}
                  className={`min-h-10 border px-4 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    activo
                      ? "border-[#173b5d] bg-[#173b5d] text-white"
                      : "border-black/15 text-[#475467] hover:border-[#0f5da8] hover:text-[#0f5da8]"
                  }`}
                >
                  {p.nombre}
                </button>
              ) : (
                <span
                  key={p.id}
                  className="inline-flex min-h-10 items-center border border-[#173b5d] bg-[#173b5d] px-4 text-[10px] uppercase tracking-[0.16em] text-white"
                >
                  {p.nombre}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eef3f8] sm:aspect-[16/9] lg:aspect-[2/1]">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${proyecto.id}-${vista.archivo}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: easing }}
            className="absolute inset-0"
          >
            <Foto src={src} vista={vista} alt={alt} />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label={`Ampliar: ${alt}`}
          onClick={() => setVisorAbierto(true)}
          className="absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#0f5da8]"
        />

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t p-5 pt-16 sm:p-7 ${
            vista.tipo === "plano"
              ? "from-white via-white/85 to-transparent text-[#101828]"
              : "from-[#050d16]/70 via-[#050d16]/25 to-transparent text-white"
          }`}
        >
          <div>
            <span
              className={`text-[8px] uppercase tracking-[0.22em] ${
                vista.tipo === "plano" ? "text-[#0f5da8]" : "text-white/65"
              }`}
            >
              {vista.tipo === "plano" ? "Documentación técnica" : "Visualización"}
            </span>
            <p className="mt-1.5 text-lg font-light tracking-[-0.02em] sm:text-2xl">
              {vista.etiqueta}
            </p>
          </div>

          <span
            className={`text-[10px] tracking-[0.2em] ${
              vista.tipo === "plano" ? "text-[#667085]" : "text-white/80"
            }`}
          >
            {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {total > 1 && (
          <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={() => setIndice((indice - 1 + total) % total)}
              className={flecha}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={() => setIndice((indice + 1) % total)}
              className={flecha}
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-black/10 bg-[#f8fafc] p-3 sm:gap-3 sm:p-4 lg:px-10">
        {proyecto.vistas.map((v, i) => {
          const activa = i === indice;

          return (
            <button
              key={v.archivo}
              type="button"
              aria-label={`Ver ${v.etiqueta}`}
              aria-current={activa}
              onClick={() => setIndice(i)}
              className={`group relative h-16 w-24 shrink-0 overflow-hidden border-2 transition-all sm:h-20 sm:w-32 ${
                activa ? "border-[#0f5da8]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={imagen(proyecto.carpeta, v.archivo)}
                alt=""
                loading="lazy"
                decoding="async"
                className={`h-full w-full ${
                  v.tipo === "plano" ? "bg-white object-contain p-1" : "object-cover"
                }`}
              />
            </button>
          );
        })}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {visorAbierto && (
              <Visor
                proyecto={proyecto}
                indice={indice}
                onCambiar={setIndice}
                onCerrar={cerrarVisor}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export function DisenoViviendas() {
  const [activo, setActivo] = useState<ModeloVivienda>(MODELOS[0]);

  return (
    <section
      id="diseno-viviendas"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_48%,#ffffff_100%)]"
    >
      <BlueprintBackground />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="relative border-b border-black/10 pb-12 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <div>
              <Eyebrow>Diseño residencial</Eyebrow>

              <p className="mt-7 max-w-[470px] text-sm leading-[1.9] text-[#667085] sm:text-base">
                Desarrollamos el diseño de tu vivienda de forma totalmente personalizada. Nos
                adaptamos con precisión a tus necesidades, tu presupuesto y tu estilo de vida,
                garantizando un proyecto único. Todo esto, respaldado por un desarrollo técnico y
                estricto cumplimiento de la normativa constructiva y leyes vigentes.
              </p>
            </div>

            <h2 className="max-w-[960px] text-[2.5rem] font-light leading-[1.02] tracking-[-0.05em] text-[#101828] sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[4.6rem]">
              Arquitectura
              <span className="block font-medium italic text-[#173b5d]">a tu medida.</span>
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {MODELOS.map((modelo, index) => {
            const seleccionado = activo.id === modelo.id;

            return (
              <motion.button
                key={modelo.id}
                type="button"
                aria-pressed={seleccionado}
                onClick={() => setActivo(modelo)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.07, duration: 0.55, ease: easing }}
                whileHover={{ y: -5 }}
                className={`group relative min-h-[160px] overflow-hidden border p-5 text-left transition-all duration-300 ${
                  seleccionado
                    ? "border-[#0f5da8] bg-[#0f5da8] text-white shadow-[0_18px_50px_rgba(15,93,168,0.18)]"
                    : "border-black/10 bg-white/75 text-[#344054] hover:border-[#0f5da8]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] tracking-[0.2em] ${
                      seleccionado ? "text-white/60" : "text-[#0f5da8]"
                    }`}
                  >
                    {modelo.numero}
                  </span>

                  <span
                    className={`flex h-7 w-7 items-center justify-center border text-sm ${
                      seleccionado ? "border-white/30" : "border-black/10 text-[#0f5da8]"
                    }`}
                  >
                    {seleccionado ? "✓" : "+"}
                  </span>
                </div>

                <p className="mt-8 text-xl font-light tracking-[-0.03em]">{modelo.superficie}</p>

                {modelo.proyectos.length > 0 && (
                  <p
                    className={`mt-2 text-[9px] uppercase tracking-[0.16em] ${
                      seleccionado ? "text-white/60" : "text-[#98a2b3]"
                    }`}
                  >
                    {modelo.proyectos.map((p) => p.nombre).join(" · ")}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activo.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: easing }}
              className="overflow-hidden border border-black/10 bg-white/90 shadow-[0_28px_80px_rgba(15,41,66,0.1)]"
            >
              <Galeria modelo={activo} />

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 p-5 sm:px-8 lg:px-10">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#98a2b3]">
                  {activo.proyectos.length > 0 && "Toca o haz clic en una imagen para ampliarla"}
                </p>

                <a
                  href="#contacto"
                  className="group inline-flex min-h-14 items-center justify-center gap-4 bg-[#0f5da8] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Solicitar información
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:self-start">
              <Eyebrow>Nuestro proceso</Eyebrow>
              <h3 className="mt-6 text-3xl font-light leading-[1.08] tracking-[-0.04em] text-[#101828] sm:text-4xl lg:text-5xl">
                ¿Cómo trabajamos?
              </h3>
              <p className="mt-5 max-w-[360px] text-sm leading-[1.8] text-[#667085] sm:text-base">
                Nuestro proceso paso a paso:
              </p>
            </div>

            <ol className="border-t border-black/10">
              {PROCESO.map((paso, i) => (
                <li
                  key={paso.titulo}
                  className="grid gap-4 border-b border-black/10 py-8 sm:grid-cols-[72px_1fr] sm:gap-8"
                >
                  <span className="text-4xl font-light leading-none tracking-[-0.05em] text-[#0f5da8]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h4 className="text-lg font-medium leading-snug tracking-[-0.015em] text-[#101828] sm:text-xl">
                      {paso.titulo}
                    </h4>
                    <p className="mt-3 text-sm leading-[1.9] text-[#667085] sm:text-base">
                      <Rich partes={paso.texto} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28">
          <div className="border border-black/10 bg-white/85 p-6 shadow-[0_28px_80px_rgba(15,41,66,0.07)] sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
              <div>
                <Eyebrow>Entrega</Eyebrow>
                <h3 className="mt-6 text-3xl font-light leading-[1.08] tracking-[-0.04em] text-[#101828] sm:text-4xl lg:text-5xl">
                  ¿Qué recibes al finalizar el diseño?
                </h3>
              </div>

              <p className="text-sm leading-[1.9] text-[#667085] sm:text-base lg:pt-10">
                Te entregamos tu Carpeta de Proyecto Físico y Digital de nivel profesional, lista
                para iniciar la construcción, gestionar permisos y tener el control total de tu
                obra:
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {ENTREGABLES.map((item, i) => (
                <div key={item.titulo} className="border border-black/10 bg-[#f8fafc] p-6 sm:p-7">
                  <span className="text-[9px] tracking-[0.2em] text-[#0f5da8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-5 text-lg font-medium leading-snug tracking-[-0.015em] text-[#173b5d]">
                    {item.titulo}
                  </h4>
                  <p className="mt-3 text-sm leading-[1.8] text-[#667085]">{item.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="border border-black/10 bg-[#f4f8fc] p-6 sm:p-10 lg:p-14">
            <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-6">
              <div>
                <Eyebrow>Documentación</Eyebrow>
                <h3 className="mt-5 text-3xl font-light tracking-[-0.04em] text-[#101828] sm:text-4xl">
                  Planos
                </h3>
              </div>

              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#98a2b3] sm:block">
                {PLANOS.length} láminas
              </span>
            </div>

            <ul className="mt-2 grid gap-x-12 lg:grid-cols-2">
              {PLANOS.map((plano, i) => (
                <li
                  key={plano}
                  className="flex items-baseline gap-5 border-b border-black/[0.07] py-4"
                >
                  <span className="w-6 shrink-0 text-[9px] tracking-[0.18em] text-[#0f5da8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] leading-[1.7] tracking-[0.1em] text-[#344054] sm:text-xs">
                    {plano}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-20 lg:mt-28">
          <div className="relative overflow-hidden bg-[#173b5d] px-6 py-12 text-white sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14 lg:py-16">
            <div className="relative z-10">
              <span className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                Diseño personalizado
              </span>

              <h3 className="mt-5 max-w-[760px] text-3xl font-light leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                ¿Tienes un terreno o una idea distinta?
              </h3>

              <p className="mt-5 max-w-[650px] text-sm leading-[1.8] text-white/65 sm:text-base">
                Podemos desarrollar una propuesta adaptada a tus necesidades, superficie,
                presupuesto y características del lugar.
              </p>
            </div>

            <a
              href="#contacto"
              className="relative z-10 mt-8 inline-flex min-h-14 items-center justify-center bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#173b5d] lg:mt-0"
            >
              Conversemos
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default DisenoViviendas;
