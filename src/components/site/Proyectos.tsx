import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import plano from "../../assets/plano.jpg";

/* Vivienda H */
import viviendaH01 from "../../assets/proyectos/vivienda-h/01.jpg";
import viviendaH02 from "../../assets/proyectos/vivienda-h/02.jpg";

/* Vivienda El Quiebre */
import quiebre01 from "../../assets/proyectos/vivienda-el-quiebre/01.jpg";
import quiebre02 from "../../assets/proyectos/vivienda-el-quiebre/02.jpg";
import quiebre03 from "../../assets/proyectos/vivienda-el-quiebre/03.jpeg";
import quiebre04 from "../../assets/proyectos/vivienda-el-quiebre/04.jpeg";
import quiebre05 from "../../assets/proyectos/vivienda-el-quiebre/05.jpeg";
import quiebre06 from "../../assets/proyectos/vivienda-el-quiebre/06.jpeg";
import quiebre07 from "../../assets/proyectos/vivienda-el-quiebre/07.jpeg";
import quiebre08 from "../../assets/proyectos/vivienda-el-quiebre/08.jpeg";
import quiebre09 from "../../assets/proyectos/vivienda-el-quiebre/09.jpeg";
import quiebre10 from "../../assets/proyectos/vivienda-el-quiebre/10.jpeg";

/* Diseño Quincho */
import quincho01 from "../../assets/proyectos/quincho-80/01.png";
import quincho02 from "../../assets/proyectos/quincho-80/02.png";
import quincho03 from "../../assets/proyectos/quincho-80/03.png";
import quincho04 from "../../assets/proyectos/quincho-80/04.png";

/* Diseño Cocina */
import cocina01 from "../../assets/proyectos/cocina/01.png";
import cocina02 from "../../assets/proyectos/cocina/02.png";
import cocina03 from "../../assets/proyectos/cocina/03.jpg";

/* Planos de arquitectura */
import planosIsometrica from "../../assets/viviendas/200-ch/03-isometrica.jpg";
import planosPlantaCh from "../../assets/viviendas/200-ch/05-planta.jpg";
import planosElevaciones from "../../assets/viviendas/200-ch/04-elevaciones.jpg";
import planosPlantaPm from "../../assets/viviendas/200-pm/04-planta.jpg";
import planosPlanta140 from "../../assets/viviendas/140-fj/04-planta.jpg";
import planosPlanta250 from "../../assets/viviendas/250-campo/06-planta.jpg";

import { Reveal } from "./motion";
import { PlanoVivienda } from "./PlanoVivienda";

type Proyecto = {
  id: string;
  numero: string;
  titulo: string;
  categoria: string;
  lugar: string;
  anio: string;
  superficie: string;
  portada: string;
  fotos: string[];
  descripcion: string;
  conceptos: string[];
  /** Proyecto de solo planos: las imágenes se muestran completas sobre fondo blanco. */
  planos?: boolean;
};

const PROYECTOS: Proyecto[] = [
  {
    id: "vivienda-el-quiebre",
    numero: "01",
    titulo: "Vivienda El Quiebre",
    categoria: "Arquitectura residencial",
    lugar: "Región del Maule, Chile",
    anio: "2025",
    superficie: "300 m²",
    portada: quiebre01,
    fotos: [
      quiebre01,
      quiebre02,
      quiebre03,
      quiebre04,
      quiebre05,
      quiebre06,
      quiebre07,
      quiebre08,
      quiebre09,
      quiebre10,
    ],
    descripcion:
      "Propuesta residencial desarrollada desde la relación entre el volumen, el paisaje y las formas contemporáneas de habitar. El proyecto busca integrar amplitud, iluminación natural y continuidad entre los espacios interiores y exteriores.",
    conceptos: [
      "Arquitectura residencial",
      "Integración con el entorno",
      "Iluminación natural",
      "Continuidad espacial",
    ],
  },
  {
    id: "vivienda-h",
    numero: "02",
    titulo: "Vivienda H",
    categoria: "Vivienda unifamiliar",
    lugar: "Región del Maule, Chile",
    anio: "2025",
    superficie: "200 m²",
    portada: viviendaH01,
    fotos: [viviendaH01, viviendaH02],
    descripcion:
      "Vivienda unifamiliar proyectada a partir de una distribución funcional y una expresión arquitectónica contemporánea, priorizando la comodidad, la luz natural y una relación directa con el exterior.",
    conceptos: [
      "Diseño contemporáneo",
      "Organización funcional",
      "Confort interior",
      "Relación interior–exterior",
    ],
  },
  {
    id: "diseno-quincho",
    numero: "03",
    titulo: "Diseño Quincho",
    categoria: "Espacio recreativo",
    lugar: "Región del Maule, Chile",
    anio: "2025",
    superficie: "80 m²",
    portada: quincho01,
    fotos: [quincho01, quincho02, quincho03, quincho04],
    descripcion:
      "Diseño de quincho concebido como un espacio de encuentro, integrando zonas de preparación, comedor y permanencia dentro de una propuesta cálida, funcional y conectada con su entorno.",
    conceptos: [
      "Espacio de encuentro",
      "Diseño funcional",
      "Materialidad cálida",
      "Integración exterior",
    ],
  },
  {
    id: "diseno-cocina",
    numero: "04",
    titulo: "Diseño Cocina",
    categoria: "Diseño interior",
    lugar: "Región del Maule, Chile",
    anio: "2025",
    superficie: "Interiorismo",
    portada: cocina01,
    fotos: [cocina01, cocina02, cocina03],
    descripcion:
      "Propuesta de diseño interior orientada a optimizar el funcionamiento de la cocina, mejorar su capacidad de almacenamiento y construir una atmósfera limpia, moderna y acogedora.",
    conceptos: [
      "Diseño interior",
      "Optimización espacial",
      "Almacenamiento",
      "Materialidad contemporánea",
    ],
  },
  {
    id: "planos-arquitectura",
    numero: "05",
    titulo: "Planos de arquitectura",
    categoria: "Documentación técnica",
    lugar: "Chile",
    anio: "Varios",
    superficie: "140 – 250 m²",
    portada: planosIsometrica,
    fotos: [
      planosIsometrica,
      planosPlantaCh,
      planosElevaciones,
      planosPlantaPm,
      planosPlanta140,
      planosPlanta250,
    ],
    planos: true,
    descripcion:
      "Plantas de arquitectura, elevaciones e isométricas de viviendas de entre 140 y 250 m². Cada proyecto se entrega con un juego completo de planos constructivos y de arquitectura.",
    conceptos: [
      "Plantas de arquitectura",
      "Elevaciones",
      "Isométrica",
      "Distribución de recintos",
    ],
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

function BlueprintBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.042]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.45) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <PlanoVivienda className="absolute left-[2%] top-[5%] hidden h-[340px] w-[500px] text-[#0f5da8] opacity-[0.14] lg:block" />

        <motion.svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-[2%] top-[24%] hidden h-[260px] w-[390px] lg:block"
        >
          <motion.path
            d="M40 220H380V65H220V110H40V220ZM145 110V220M220 65V220M300 65V220M40 165H380"
            stroke="rgba(15,93,168,0.13)"
            strokeWidth="1.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 2.5,
              delay: 0.15,
              ease: easing,
            }}
          />

          <motion.path
            d="M55 238H365M55 232V244M365 232V244M390 80V210M384 80H396M384 210H396"
            stroke="rgba(15,93,168,0.1)"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 2,
              delay: 0.5,
              ease: easing,
            }}
          />
        </motion.svg>

        <motion.div
          animate={{
            x: [0, 18, 0],
            y: [0, -12, 0],
            opacity: [0.16, 0.3, 0.16],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[42%] hidden h-40 w-64 border border-[#0f5da8]/10 lg:block"
        >
          <span className="absolute left-8 top-0 h-full w-px bg-[#0f5da8]/10" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-[#0f5da8]/10" />
          <span className="absolute -left-3 top-8 h-px w-6 bg-[#0f5da8]/20" />
          <span className="absolute bottom-8 -right-3 h-px w-6 bg-[#0f5da8]/20" />
        </motion.div>

        <motion.div
          animate={{
            rotate: [0, 4, 0],
            y: [0, 14, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[7%] bottom-[14%] hidden h-28 w-28 border border-[#0f5da8]/10 lg:block"
        >
          <span className="absolute left-1/2 top-0 h-full w-px bg-[#0f5da8]/10" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-[#0f5da8]/10" />
          <span className="absolute left-[46px] top-[46px] h-9 w-9 rounded-full border border-[#0f5da8]/10" />
        </motion.div>
      </div>
    </>
  );
}
type AccordionProps = {
  proyectos: Proyecto[];
  onSelect: (proyecto: Proyecto) => void;
};

function AccordionProyectos({ proyectos, onSelect }: AccordionProps) {
  const [hovered, setHovered] = useState<number | null>(0);

  return (
    <div className="mt-7 lg:mt-9">
      {/* Escritorio */}
      <div className="hidden h-[390px] overflow-hidden border border-black/10 bg-[#0d1822] shadow-[0_28px_80px_rgba(13,38,64,0.13)] lg:flex">
        {proyectos.map((proyecto, index) => {
          const active = hovered === index;

          return (
            <motion.button
              key={proyecto.id}
              type="button"
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onClick={() => onSelect(proyecto)}
              animate={{
                flex: active ? 2.3 : 1,
              }}
              transition={{
                duration: 0.7,
                ease: easing,
              }}
              className="group relative min-w-0 overflow-hidden border-r border-white/15 last:border-r-0"
            >
              <motion.img
                src={proyecto.portada}
                alt={proyecto.titulo}
                animate={{
                  scale: active ? 1.07 : 1,
                  filter: active
                    ? "grayscale(0%) brightness(0.82)"
                    : "grayscale(100%) brightness(0.55)",
                }}
                transition={{
                  duration: 0.8,
                  ease: easing,
                }}
                className={`absolute inset-0 h-full w-full ${
                  proyecto.planos ? "bg-white object-contain p-6" : "object-cover"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06111c]/90 via-[#06111c]/10 to-[#06111c]/45" />

              <motion.div
                animate={{
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="absolute inset-0 bg-gradient-to-br from-[#0f5da8]/5 via-transparent to-[#0f5da8]/35"
              />

              {/* Número y superficie */}
              <div className="pointer-events-none absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.22em] text-white/75">
                  {proyecto.numero}
                </span>

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                  {proyecto.superficie}
                </span>
              </div>

              {/* Título vertical/central */}
              <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-5">
                <motion.span
                  animate={{
                    opacity: active ? 1 : 0.72,
                    y: active ? 0 : 12,
                    scale: active ? 1 : 0.96,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: easing,
                  }}
                  className="whitespace-nowrap text-center text-2xl font-light tracking-[-0.035em] text-white xl:text-3xl"
                >
                  {proyecto.titulo}
                </motion.span>
              </div>

              {/* Información inferior */}
              <div className="pointer-events-none absolute bottom-6 left-6 right-6">
                <motion.div
                  animate={{
                    opacity: active ? 1 : 0,
                    y: active ? 0 : 14,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: easing,
                  }}
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                    {proyecto.categoria}
                  </span>

                  <div className="mt-3 flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white">
                    Ir al proyecto

                    <motion.span
                      animate={{
                        width: active ? 44 : 20,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: easing,
                      }}
                      className="h-px bg-[#55b8ff]"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Línea azul activa */}
              <motion.div
                animate={{
                  scaleY: active ? 1 : 0.24,
                }}
                transition={{
                  duration: 0.5,
                  ease: easing,
                }}
                className="absolute left-0 top-0 h-full w-[3px] origin-top bg-[#4db4ff]"
              />

              {/* Líneas técnicas sobre la tarjeta */}
              <motion.div
                animate={{
                  opacity: active ? 0.7 : 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="pointer-events-none absolute right-6 top-16 hidden h-24 w-24 xl:block"
              >
                <span className="absolute right-0 top-0 h-full w-px bg-white/20" />
                <span className="absolute right-0 top-0 h-px w-full bg-white/20" />
                <span className="absolute bottom-0 right-0 h-px w-10 bg-white/20" />
                <span className="absolute right-[-3px] top-[-3px] h-2 w-2 rounded-full border border-white/35" />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Tablet y móvil */}
      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {proyectos.map((proyecto, index) => (
          <motion.button
            key={proyecto.id}
            type="button"
            onClick={() => onSelect(proyecto)}
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              delay: index * 0.07,
              duration: 0.65,
              ease: easing,
            }}
            className="group relative min-h-[260px] overflow-hidden text-left shadow-[0_18px_50px_rgba(12,35,58,0.12)]"
          >
            <img
              src={proyecto.portada}
              alt={proyecto.titulo}
              loading="lazy"
              className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                proyecto.planos ? "bg-white object-contain p-6" : "object-cover"
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#06111c]/92 via-[#06111c]/10 to-[#06111c]/35" />

            <div className="absolute left-5 right-5 top-5 flex justify-between text-[9px] uppercase tracking-[0.2em] text-white/70">
              <span>{proyecto.numero}</span>
              <span>{proyecto.superficie}</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                {proyecto.categoria}
              </span>

              <h3 className="mt-2 text-2xl font-light tracking-[-0.035em] text-white">
                {proyecto.titulo}
              </h3>

              <div className="mt-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/65">
                Ver proyecto
                <span className="h-px w-8 bg-[#55b8ff]" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

type TarjetaProyectoProps = {
  proyecto: Proyecto;
  index: number;
  onOpen: (proyecto: Proyecto) => void;
  highlighted: boolean;
};

function TarjetaProyecto({
  proyecto,
  index,
  onOpen,
  highlighted,
}: TarjetaProyectoProps) {
  const [imagenPreview, setImagenPreview] = useState(0);
  const [hoverActivo, setHoverActivo] = useState(false);

  useEffect(() => {
    if (!hoverActivo || proyecto.fotos.length <= 1) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setImagenPreview((actual) => {
        return (actual + 1) % proyecto.fotos.length;
      });
    }, 1800);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [hoverActivo, proyecto.fotos.length]);

  const alineacion =
    index === 0
      ? "lg:w-full"
      : index % 2 === 0
        ? "lg:mr-auto lg:w-[92%]"
        : "lg:ml-auto lg:w-[84%]";

  const proporcion =
    index === 0
      ? "aspect-[16/10] sm:aspect-[16/8]"
      : index === 1
        ? "aspect-[16/11]"
        : "aspect-[4/3] sm:aspect-[16/11]";

  return (
    <motion.div
      id={`proyecto-${proyecto.id}`}
      animate={
        highlighted
          ? {
              scale: [1, 1.018, 1],
              boxShadow: [
                "0 0 0 rgba(15,93,168,0)",
                "0 30px 90px rgba(15,93,168,0.24)",
                "0 0 0 rgba(15,93,168,0)",
              ],
            }
          : {}
      }
      transition={{
        duration: 1.2,
        ease: easing,
      }}
      className={alineacion}
    >
      <Reveal delay={index * 0.08}>
        <button
          type="button"
          onClick={() => onOpen(proyecto)}
          onMouseEnter={() => setHoverActivo(true)}
          onMouseLeave={() => {
            setHoverActivo(false);
            setImagenPreview(0);
          }}
          className="group block w-full text-left"
        >
          <motion.div
            whileHover={{
              y: -7,
            }}
            transition={{
              duration: 0.45,
              ease: easing,
            }}
            className="relative overflow-hidden bg-[#e9edf0] shadow-[0_24px_70px_rgba(15,41,66,0.15)]"
          >
            <div className={proporcion}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={proyecto.fotos[imagenPreview]}
                  src={proyecto.fotos[imagenPreview]}
                  alt={`${proyecto.titulo} — vista ${imagenPreview + 1}`}
                  width={1800}
                  height={1200}
                  loading={index === 0 ? "eager" : "lazy"}
                  initial={{
                    opacity: 0,
                    scale: 1.03,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.012,
                  }}
                  transition={{
                    duration: 0.72,
                    ease: easing,
                  }}
                  className={`h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] ${
                    proyecto.planos ? "bg-white object-contain p-4 sm:p-8" : "object-cover"
                  }`}
                />
              </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061523]/78 via-[#061523]/8 to-transparent" />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0f5da8]/0 via-transparent to-[#0f5da8]/26 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#2893e8]/20 opacity-0 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />

            {/* Cabecera */}
            <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7">
              <span className="text-[10px] tracking-[0.22em] text-white/80">
                {proyecto.numero}
              </span>

              <span className="h-px w-8 bg-white/35" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/65">
                {proyecto.categoria}
              </span>
            </div>

            <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/70">
                {String(imagenPreview + 1).padStart(2, "0")} /{" "}
                {String(proyecto.fotos.length).padStart(2, "0")}
              </span>
            </div>

            {/* Información inferior */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5 text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/60">
                  {proyecto.lugar}
                </p>

                <h3
                  className={`mt-2 font-light tracking-[-0.04em] ${
                    index === 0
                      ? "text-3xl sm:text-5xl lg:text-6xl"
                      : "text-2xl sm:text-3xl lg:text-4xl"
                  }`}
                >
                  {proyecto.titulo}
                </h3>

                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/65">
                  {proyecto.superficie}
                </p>
              </div>

              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/35 text-xl transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-[#173b5d] sm:h-14 sm:w-14">
                →
              </span>
            </div>

            {/* Detalle técnico */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px]">
              <span className="block h-full w-0 bg-[#1d78cf] transition-all duration-700 group-hover:w-full" />
            </div>

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: hoverActivo ? 0.55 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="pointer-events-none absolute right-8 top-[26%] hidden h-28 w-28 lg:block"
            >
              <span className="absolute right-0 top-0 h-full w-px bg-white/20" />
              <span className="absolute right-0 top-0 h-px w-full bg-white/20" />
              <span className="absolute bottom-0 right-0 h-px w-12 bg-white/20" />
              <span className="absolute right-[-3px] top-[-3px] h-2 w-2 rounded-full border border-white/35" />
            </motion.div>
          </motion.div>

          <div className="grid gap-4 border-b border-black/10 bg-white/75 px-1 py-4 backdrop-blur-sm sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="max-w-[780px] text-sm leading-[1.8] text-[#667085]">
              {proyecto.descripcion}
            </p>

            <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.17em] text-[#98a2b3]">
              <span>{proyecto.anio}</span>
              <span>{proyecto.fotos.length} imágenes</span>
            </div>
          </div>
        </button>
      </Reveal>
    </motion.div>
  );
}
type ProjectModalProps = {
  activo: Proyecto | null;
  imagenActiva: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onImageChange: (index: number) => void;
};

function ProjectModal({
  activo,
  imagenActiva,
  onClose,
  onPrevious,
  onNext,
  onImageChange,
}: ProjectModalProps) {
  return (
    <AnimatePresence>
      {activo && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-[#07111b] text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          {/* Fondo técnico del modal */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(85,184,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(85,184,255,0.35) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          <motion.svg
            aria-hidden="true"
            viewBox="0 0 480 300"
            fill="none"
            className="pointer-events-none fixed right-[2%] top-[12%] hidden h-[260px] w-[420px] opacity-20 lg:block"
          >
            <motion.path
              d="M40 240H440V70H295V115H40V240ZM150 115V240M295 70V240M365 70V240M40 175H440"
              stroke="#55B8FF"
              strokeWidth="1"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 2.2,
                ease: easing,
              }}
            />

            <motion.path
              d="M55 258H425M55 252V264M425 252V264M455 85V225M449 85H461M449 225H461"
              stroke="rgba(85,184,255,0.55)"
              strokeWidth="1"
              strokeDasharray="5 7"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 2,
                ease: easing,
              }}
            />
          </motion.svg>

          {/* Barra superior */}
          <div className="sticky top-0 z-50 border-b border-white/10 bg-[#07111b]/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.2em] text-[#55b8ff]">
                  {activo.numero}
                </span>

                <span className="h-px w-8 bg-white/15" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/45">
                  {activo.categoria}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="group flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-white/70"
              >
                Cerrar

                <span className="flex h-11 w-11 items-center justify-center border border-white/15 text-xl transition-colors duration-300 group-hover:bg-white group-hover:text-[#173b5d]">
                  ×
                </span>
              </button>
            </div>
          </div>

          <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32 lg:pt-16">
            {/* Apertura */}
            <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20 lg:pb-14">
              <div>
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: easing,
                  }}
                  className="mb-6 flex items-center gap-4"
                >
                  <span className="h-px w-10 bg-[#55b8ff]" />

                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#55b8ff]">
                    Proyecto seleccionado
                  </span>
                </motion.div>

                <motion.h2
                  id="project-title"
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: easing,
                  }}
                  className="text-[3.2rem] font-light leading-none tracking-[-0.055em] sm:text-[5rem] lg:text-[7rem]"
                >
                  {activo.titulo}
                </motion.h2>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.12,
                    duration: 0.7,
                    ease: easing,
                  }}
                  className="mt-7 max-w-[750px] text-lg font-light leading-[1.7] text-white/55 sm:text-xl"
                >
                  {activo.descripcion}
                </motion.p>
              </div>

              <motion.dl
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                  ease: easing,
                }}
                className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
              >
                {[
                  ["Ubicación", activo.lugar],
                  ["Año", activo.anio],
                  ["Superficie", activo.superficie],
                ].map(([label, value]) => (
                  <motion.div
                    key={label}
                    whileHover={{
                      y: -3,
                      borderColor: "rgba(85,184,255,0.45)",
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="border border-white/10 bg-white/[0.035] p-4 backdrop-blur"
                  >
                    <dt className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                      {label}
                    </dt>

                    <dd className="mt-2 text-sm text-white/75">{value}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </div>

            {/* Galería principal */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.9,
                ease: easing,
              }}
              className="relative mt-10 overflow-hidden border border-white/10 bg-black shadow-[0_35px_100px_rgba(0,0,0,0.35)] lg:mt-14"
            >
              <div className="aspect-[16/11] sm:aspect-[16/9]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activo.fotos[imagenActiva]}
                    src={activo.fotos[imagenActiva]}
                    alt={`${activo.titulo} — imagen ${imagenActiva + 1}`}
                    width={1900}
                    height={1200}
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                      x: 24,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.99,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: easing,
                    }}
                    className="h-full w-full object-contain"
                  />
                </AnimatePresence>
              </div>

              {/* Grilla sobre la imagen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.065]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                }}
              />

              {/* Líneas técnicas */}
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                  ease: easing,
                }}
                className="pointer-events-none absolute left-[6%] top-[11%] h-px w-[26%] origin-left bg-white/35"
              />

              <motion.div
                initial={{
                  scaleY: 0,
                }}
                animate={{
                  scaleY: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.35,
                  ease: easing,
                }}
                className="pointer-events-none absolute left-[6%] top-[11%] h-[20%] w-px origin-top bg-white/35"
              />

              <span className="pointer-events-none absolute left-[8%] top-[8%] text-[8px] uppercase tracking-[0.24em] text-white/45">
                Vista seleccionada
              </span>

              {/* Controles */}
              {activo.fotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Imagen anterior"
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/35 text-xl text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#173b5d] sm:left-7 sm:h-14 sm:w-14"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Imagen siguiente"
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/35 text-xl text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#173b5d] sm:right-7 sm:h-14 sm:w-14"
                  >
                    →
                  </button>
                </>
              )}

              {/* Contador */}
              <div className="absolute bottom-4 right-4 bg-black/45 px-4 py-2 text-[9px] tracking-[0.2em] text-white backdrop-blur-md sm:bottom-7 sm:right-7">
                {String(imagenActiva + 1).padStart(2, "0")} /{" "}
                {String(activo.fotos.length).padStart(2, "0")}
              </div>
            </motion.div>

            {/* Miniaturas */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-3">
              {activo.fotos.map((foto, index) => (
                <motion.button
                  key={`${foto}-${index}`}
                  type="button"
                  onClick={() => onImageChange(index)}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={`relative w-[120px] shrink-0 overflow-hidden border sm:w-[160px] ${
                    imagenActiva === index
                      ? "border-[#55b8ff]"
                      : "border-white/10"
                  }`}
                >
                  <img
                    src={foto}
                    alt={`${activo.titulo} — miniatura ${index + 1}`}
                    width={400}
                    height={260}
                    loading="lazy"
                    className={`aspect-[16/10] w-full transition-all duration-300 ${
                      activo.planos ? "bg-white object-contain p-1" : "object-cover"
                    } ${
                      imagenActiva === index
                        ? "scale-105 opacity-100"
                        : "opacity-40 hover:opacity-100"
                    }`}
                  />

                  <span className="absolute bottom-2 right-2 bg-black/35 px-2 py-1 text-[8px] tracking-[0.18em] text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {imagenActiva === index && (
                    <motion.span
                      layoutId="miniatura-activa"
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-[#55b8ff]"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Conceptos */}
            <div className="mt-16 grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#55b8ff]">
                  Conceptos principales
                </span>

                <p className="mt-6 max-w-[390px] text-2xl font-light leading-[1.45] tracking-[-0.025em] text-white/85">
                  Decisiones que construyen la identidad del proyecto.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {activo.conceptos.map((concepto, index) => (
                  <motion.div
                    key={concepto}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.4,
                    }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.55,
                      ease: easing,
                    }}
                    whileHover={{
                      y: -4,
                      borderColor: "rgba(85,184,255,0.38)",
                    }}
                    className="border border-white/10 bg-white/[0.035] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-light text-white/80">
                        {concepto}
                      </span>

                      <span className="text-[9px] tracking-[0.18em] text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="mt-5 block h-px w-10 bg-[#55b8ff]/60" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Documentación gráfica */}
            {!activo.planos && (
            <div className="mt-16">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#55b8ff]">
                    Documentación gráfica
                  </span>

                  <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-white sm:text-4xl">
                    Desarrollo del proyecto
                  </h3>
                </div>

                <p className="max-w-[430px] text-sm leading-[1.8] text-white/50">
                  Representación gráfica de la organización espacial y las
                  principales decisiones arquitectónicas.
                </p>
              </div>

              <div className="relative mt-8 overflow-hidden border border-white/10 bg-white p-3 sm:p-6">
                <motion.img
                  src={plano}
                  alt={`Documentación gráfica de ${activo.titulo}`}
                  width={1600}
                  height={1100}
                  loading="lazy"
                  whileHover={{
                    scale: 1.015,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: easing,
                  }}
                  className="w-full object-contain"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.055]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,93,168,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.55) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />
              </div>
            </div>
            )}

            {/* Cierre modal */}
            <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[600px] text-2xl font-light leading-[1.4] tracking-[-0.025em] text-white/85 sm:text-3xl">
                Cada proyecto comienza con una conversación.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="group inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#55b8ff]"
              >
                Volver al portafolio

                <span className="transition-transform duration-300 group-hover:-translate-x-2">
                  ←
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export function Proyectos() {
  const [activo, setActivo] = useState<Proyecto | null>(null);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [destacado, setDestacado] = useState<string | null>(null);

  const highlightTimer = useRef<number | null>(null);

  const irAProyecto = (proyecto: Proyecto) => {
    const elemento = document.getElementById(`proyecto-${proyecto.id}`);

    if (!elemento) {
      return;
    }

    elemento.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setDestacado(proyecto.id);

    if (highlightTimer.current) {
      window.clearTimeout(highlightTimer.current);
    }

    highlightTimer.current = window.setTimeout(() => {
      setDestacado(null);
    }, 1400);
  };

  const abrirProyecto = (proyecto: Proyecto) => {
    setActivo(proyecto);
    setImagenActiva(0);
  };

  const cerrarProyecto = () => {
    setActivo(null);
    setImagenActiva(0);
  };

  const mostrarAnterior = () => {
    if (!activo) {
      return;
    }

    setImagenActiva((actual) =>
      actual === 0 ? activo.fotos.length - 1 : actual - 1,
    );
  };

  const mostrarSiguiente = () => {
    if (!activo) {
      return;
    }

    setImagenActiva((actual) => (actual + 1) % activo.fotos.length);
  };

  useEffect(() => {
    if (!activo) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const controlarTeclado = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cerrarProyecto();
      }

      if (event.key === "ArrowLeft") {
        setImagenActiva((actual) =>
          actual === 0 ? activo.fotos.length - 1 : actual - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setImagenActiva((actual) => {
          return (actual + 1) % activo.fotos.length;
        });
      }
    };

    window.addEventListener("keydown", controlarTeclado);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", controlarTeclado);
    };
  }, [activo]);

  useEffect(() => {
    return () => {
      if (highlightTimer.current) {
        window.clearTimeout(highlightTimer.current);
      }
    };
  }, []);

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_48%,#ffffff_100%)]"
    >
      <BlueprintBackground />

      {/* Luces ambientales */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 65, 0],
          y: [0, -35, 0],
          rotate: [0, 7, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[4%] top-[12%] hidden h-56 w-56 border border-[#0f5da8]/10 lg:block"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          y: [0, 36, 0],
          opacity: [0.13, 0.3, 0.13],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[7%] top-[52%] hidden h-24 w-24 bg-[#0f5da8]/5 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Encabezado */}
        <div className="relative border-b border-black/10 pb-8 lg:pb-10">
          <motion.span
            aria-hidden="true"
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 1,
              ease: easing,
            }}
            className="pointer-events-none absolute -right-4 -top-12 text-[9rem] font-light leading-none tracking-[-0.08em] text-[#142c46]/[0.04] sm:text-[13rem] lg:text-[18rem]"
          >
            04
          </motion.span>

          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.6,
                }}
                transition={{
                  duration: 0.7,
                  ease: easing,
                }}
                className="flex items-center gap-4"
              >
                <motion.span
                  initial={{
                    scaleX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.85,
                    ease: easing,
                  }}
                  className="h-px w-10 origin-left bg-[#0f5da8]"
                />

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0f5da8]">
                  Proyectos seleccionados
                </span>
              </motion.div>

              <Reveal delay={0.08}>
                <p className="mt-7 max-w-[410px] text-sm leading-[1.9] text-[#667085] sm:text-base">
                  Una selección de proyectos desarrollados desde la idea
                  inicial hasta su resolución arquitectónica y visual.
                </p>
              </Reveal>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                  ease: easing,
                }}
                className="mt-7 flex flex-wrap gap-3"
              >
                {["Residencial", "Interiorismo", "Espacios exteriores", "Planos"].map(
                  (item, index) => (
                    <span
                      key={item}
                      className="flex items-center gap-3 border border-black/10 bg-white/70 px-4 py-3 backdrop-blur-sm"
                    >
                      <span className="text-[8px] tracking-[0.2em] text-[#98a2b3]">
                        0{index + 1}
                      </span>

                      <span className="text-[9px] uppercase tracking-[0.18em] text-[#344054]">
                        {item}
                      </span>
                    </span>
                  ),
                )}
              </motion.div>
            </div>

            <div className="relative z-10">
              <h2 className="max-w-[940px] text-[2.55rem] font-light leading-[1.02] tracking-[-0.045em] text-[#111827] sm:text-[3.8rem] lg:text-[4.6rem] xl:text-[5.2rem]">
  <span className="block overflow-hidden">
    <motion.span
      initial={{
        y: "110%",
        opacity: 0,
      }}
      animate={{
        y: "0%",
        opacity: 1,
      }}
      transition={{
        duration: 0.9,
        ease: easing,
      }}
      className="block"
    >
      Proyectos que nacen
    </motion.span>
  </span>

  <span className="block overflow-hidden">
    <motion.span
      initial={{
        y: "110%",
        opacity: 0,
      }}
      animate={{
        y: "0%",
        opacity: 1,
      }}
      transition={{
        delay: 0.1,
        duration: 0.9,
        ease: easing,
      }}
      className="block text-[#173b5d]"
    >
      desde una idea
    </motion.span>
  </span>

  <span className="block overflow-hidden">
    <motion.span
      initial={{
        y: "110%",
        opacity: 0,
      }}
      animate={{
        y: "0%",
        opacity: 1,
      }}
      transition={{
        delay: 0.2,
        duration: 0.9,
        ease: easing,
      }}
      className="block font-medium italic text-[#0f5da8]"
    >
      y toman forma.
    </motion.span>
  </span>
</h2>

              {/* Cota decorativa */}
              <motion.div
                aria-hidden="true"
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.45,
                  duration: 1,
                  ease: easing,
                }}
                className="mt-8 hidden h-px w-[72%] origin-left bg-[#0f5da8]/20 lg:block"
              />

              <div className="mt-3 hidden items-center justify-between text-[8px] uppercase tracking-[0.2em] text-[#0f5da8]/40 lg:flex">
                <span>A</span>
                <span>Desarrollo arquitectónico</span>
                <span>B</span>
              </div>
            </div>
          </div>

          <AccordionProyectos
            proyectos={PROYECTOS}
            onSelect={irAProyecto}
          />
        </div>

        {/* Portafolio detallado */}
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[0.42fr_1.58fr] lg:gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-[9px] uppercase tracking-[0.23em] text-[#98a2b3]">
                Portafolio
              </span>

              <p className="mt-6 max-w-[430px] text-xl font-light leading-[1.5] tracking-[-0.025em] text-[#1d2939] sm:text-2xl">
                Cada proyecto responde a un lugar, una necesidad y una forma
                particular de habitar.
              </p>

              <p className="mt-6 max-w-[430px] text-sm leading-[1.85] text-[#667085]">
                Pasa el cursor sobre cada proyecto para recorrer sus imágenes.
                Selecciónalo para abrir la galería completa.
              </p>

              <div className="mt-9 flex items-center gap-4">
                <span className="h-px w-12 bg-[#0f5da8]" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-[#667085]">
                  Región del Maule
                </span>
              </div>

              {/* Plano lateral decorativo */}
              <motion.div
                aria-hidden="true"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                  ease: easing,
                }}
                className="relative mt-10 hidden h-[210px] w-full max-w-[360px] border border-[#0f5da8]/10 lg:block"
              >
                <span className="absolute left-[20%] top-0 h-full w-px bg-[#0f5da8]/10" />
                <span className="absolute left-[58%] top-0 h-full w-px bg-[#0f5da8]/10" />
                <span className="absolute left-0 top-[38%] h-px w-full bg-[#0f5da8]/10" />
                <span className="absolute left-0 top-[72%] h-px w-full bg-[#0f5da8]/10" />

                <span className="absolute left-[24%] top-[14%] h-12 w-20 border border-[#0f5da8]/10" />
                <span className="absolute bottom-[10%] right-[8%] h-14 w-24 border border-[#0f5da8]/10" />

                <span className="absolute -left-3 top-7 h-px w-6 bg-[#0f5da8]/20" />
                <span className="absolute -right-3 bottom-8 h-px w-6 bg-[#0f5da8]/20" />

                <span className="absolute bottom-3 left-3 text-[7px] uppercase tracking-[0.2em] text-[#0f5da8]/35">
                  Planta referencial
                </span>
              </motion.div>
            </div>
          </Reveal>

          <div className="relative space-y-10 lg:space-y-14">
            <motion.div
              aria-hidden="true"
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 1.4,
                ease: easing,
              }}
              className="pointer-events-none absolute -left-6 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-[#0f5da8] via-[#0f5da8]/20 to-transparent xl:block"
            />

            {PROYECTOS.map((proyecto, index) => (
              <TarjetaProyecto
                key={proyecto.id}
                proyecto={proyecto}
                index={index}
                onOpen={abrirProyecto}
                highlighted={destacado === proyecto.id}
              />
            ))}
          </div>
        </div>
                {/* Frase editorial */}
        <div className="relative py-16 lg:py-24">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 1,
              ease: easing,
            }}
            className="mb-12 h-px origin-left bg-black/10"
          />

          <div className="grid gap-8 lg:grid-cols-[0.4fr_1.6fr] lg:gap-14">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
              Nuestra visión
            </span>

            <h3 className="max-w-[1050px] text-[2.7rem] font-light leading-[1.04] tracking-[-0.045em] text-[#111827] sm:text-[4rem] lg:text-[5.2rem]">
              <span className="block">
                Un proyecto no termina
              </span>

              <span className="block font-medium italic text-[#173b5d]">
                cuando se dibuja.
              </span>

              <span className="block">
                Comienza cuando se habita.
              </span>
            </h3>
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="relative overflow-hidden bg-[#173b5d] px-6 py-12 text-white sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14 lg:py-16">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <motion.div
              animate={{
                x: [0, 35, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute right-[10%] top-[18%] hidden h-28 w-28 border border-white/10 lg:block"
            >
              <span className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
            </motion.div>

            <div className="relative z-10">
              <span className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                Nuevo proyecto
              </span>

              <h3 className="mt-5 max-w-[720px] text-3xl font-light leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Conversemos sobre el espacio que
                necesitas construir.
              </h3>

              <p className="mt-5 max-w-[620px] text-sm leading-[1.8] text-white/65 sm:text-base">
                Revisamos tu idea, el terreno y los
                antecedentes necesarios para comenzar
                un proyecto sólido, funcional y pensado
                para perdurar.
              </p>
            </div>

            <a
              href="#contacto"
              className="group relative z-10 mt-8 inline-flex min-h-14 items-center justify-center overflow-hidden bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#173b5d] lg:mt-0"
            >
              <span className="absolute inset-0 translate-y-full bg-[#0f5da8] transition-transform duration-500 ease-out group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center gap-4 transition-colors duration-300 group-hover:text-white">
                Iniciar un proyecto

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectModal
        activo={activo}
        imagenActiva={imagenActiva}
        onClose={cerrarProyecto}
        onPrevious={mostrarAnterior}
        onNext={mostrarSiguiente}
        onImageChange={setImagenActiva}
      />
    </section>
  );
}

export default Proyectos;