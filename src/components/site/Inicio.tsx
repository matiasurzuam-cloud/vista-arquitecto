import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import hero01 from "../../assets/hero/hero-01.JPG";
import hero02 from "../../assets/hero/hero-02.jpg";
import hero03 from "../../assets/hero/hero-03.png";
import hero04 from "../../assets/hero/hero-04.jpg";

const SLIDE_DURATION = 1500;

const slides = [
  {
    image: hero01,
    eyebrow: "Arquitectura · Diseño · Territorio",
    title: "Diseñamos lugares",
    accent: "que permanecen.",
    description:
      "Arquitectura contemporánea desarrollada desde una mirada técnica, sensible y conectada con el territorio.",
    imageClass: "object-contain object-right-bottom",
  },
  {
    image: hero02,
    eyebrow: "Diseño arquitectónico",
    title: "Cada proyecto",
    accent: "nace escuchando.",
    description:
      "Traducimos necesidades reales en propuestas funcionales, coherentes y cuidadosamente resueltas.",
    imageClass: "object-contain object-center",
  },
  {
    image: hero03,
    eyebrow: "Planificación y desarrollo",
    title: "Precisión en",
    accent: "cada decisión.",
    description:
      "Acompañamos cada etapa para conservar la intención del diseño hasta el resultado final.",
    imageClass: "object-contain object-center",
  },
  {
    image: hero04,
    eyebrow: "3 Vértices Arquitectura",
    title: "Arquitectura con",
    accent: "propósito.",
    description:
      "Creamos soluciones que equilibran estética, función, normativa y contexto.",
    imageClass: "object-contain object-center",
  },
] as const;

export function Inicio() {
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || isPaused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [reduceMotion, isPaused]);

  const slide = slides[activeSlide];

  const currentSlide = useMemo(
    () => String(activeSlide + 1).padStart(2, "0"),
    [activeSlide],
  );

  const totalSlides = String(slides.length).padStart(2, "0");

  const navigate = (section: string) => {
    window.location.hash = section;
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100vh+170px)] overflow-hidden bg-[#061522] lg:min-h-[calc(100vh+210px)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* CAPA AMBIENTE */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={`ambient-${slide.image}`}
          src={slide.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.38 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* FOTO COMPLETA, SIN RECORTE */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={slide.image}
          className="absolute inset-x-0 top-0 flex h-[calc(100vh-80px)] items-center justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.img
            src={slide.image}
            alt={slide.title}
            className={`h-full w-full ${slide.imageClass}`}
            initial={{ scale: reduceMotion ? 1 : 0.88 }}
            animate={{ scale: reduceMotion ? 1 : 0.92 }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* CAPAS */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04131f]/96 via-[#04131f]/72 to-[#04131f]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04131f]/92 via-transparent to-[#04131f]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(120,196,255,0.17),transparent_31%)]" />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "86px 86px",
        }}
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#8fc8ff]/65 to-transparent"
          animate={{ y: ["8vh", "90vh", "8vh"], opacity: [0, 0.65, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="flex min-h-[calc(100vh-80px)] flex-col">
        <header className="flex items-start justify-between">
          <motion.div
            key={`eyebrow-${activeSlide}`}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#79c4ff]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.29em] text-white/60">
              {slide.eyebrow}
            </span>
          </motion.div>

          <div className="hidden items-center gap-4 text-[8px] uppercase tracking-[0.22em] text-white/42 sm:flex">
            <span>{currentSlide}</span>
            <span className="h-px w-9 bg-white/25" />
            <span>{totalSlides}</span>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-[820px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${activeSlide}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mb-7 block text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8fc8ff]">
                  Estudio de arquitectura
                </span>

                <h1 className="text-[3.45rem] font-light leading-[0.91] tracking-[-0.064em] text-white sm:text-[4.8rem] lg:text-[5.9rem] xl:text-[6.5rem]">
                  <span className="block">{slide.title}</span>
                  <span className="block font-medium italic text-[#8fc8ff]">
                    {slide.accent}
                  </span>
                </h1>

                <p className="mt-8 max-w-[600px] text-sm leading-[1.9] text-white/67 sm:text-base">
                  {slide.description}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate("proyectos")}
                    className="group inline-flex min-h-12 items-center justify-center gap-5 border border-white/20 bg-white px-7 text-[9px] font-semibold uppercase tracking-[0.21em] text-[#173b5d] transition duration-300 hover:-translate-y-0.5"
                  >
                    Ver proyectos
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("contacto")}
                    className="inline-flex min-h-12 items-center justify-center border border-white/20 bg-white/[0.025] px-7 text-[9px] font-medium uppercase tracking-[0.21em] text-white/80 backdrop-blur-sm transition duration-300 hover:bg-white/10"
                  >
                    Iniciar un proyecto
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PANEL MÁS PEQUEÑO Y MÁS A LA DERECHA */}
          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="hidden justify-self-end lg:block"
          >
            <div className="w-[290px] border border-white/15 bg-[#061727]/42 p-6 backdrop-blur-xl xl:w-[315px]">
              <div className="flex items-center justify-between border-b border-white/12 pb-4">
                <span className="text-[8px] uppercase tracking-[0.25em] text-white/45">
                  3 Vértices
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <p className="mt-6 text-[1.35rem] font-light leading-[1.25] text-white">
                Diseño, técnica y gestión en un solo proceso.
              </p>

              <div className="mt-6 grid gap-4">
                {[
                  ["01", "Diseño"],
                  ["02", "Gestión"],
                  ["03", "Territorio"],
                ].map(([n, title]) => (
                  <div key={n} className="border-t border-white/12 pt-4">
                    <span className="text-[8px] text-[#8fc8ff]">{n}</span>
                    <p className="mt-2 text-sm text-white">{title}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        <footer className="flex items-center justify-between border-t border-white/15 pt-5">
          <div className="flex items-center gap-2">
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setActiveSlide(index)}
                className="relative h-8 w-12"
              >
                <span className="absolute left-0 top-1/2 h-px w-full bg-white/20" />
                {index === activeSlide && (
                  <motion.span
                    layoutId="active-slide-line"
                    className="absolute left-0 top-1/2 h-px w-full bg-[#8fc8ff]"
                  />
                )}
              </button>
            ))}
          </div>

          <span className="text-[8px] uppercase tracking-[0.22em] text-white/35">
            {isPaused ? "Pausado" : "Cambio automático · 1.5 s"}
          </span>
        </footer>
        </div>

        {/* PROMOCIÓN DESTACADA DE IMPRESIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.85,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-20 mt-7 pb-2 lg:mt-9"
        >
          <div className="group relative overflow-hidden border border-white/15 bg-white/[0.065] px-5 py-5 backdrop-blur-xl transition-all duration-500 hover:border-[#55b8ff]/50 hover:bg-white/[0.1] sm:px-7 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:px-8 lg:py-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="relative z-10 flex items-center gap-4">
              <motion.span
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-2.5 w-2.5 rounded-full bg-[#55b8ff]"
              />

              <div>
                <span className="text-[8px] uppercase tracking-[0.24em] text-white/45">
                  Servicio destacado
                </span>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#79c8ff]">
                  Impresión técnica
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-5 border-y border-white/10 py-5 lg:mt-0 lg:border-x lg:border-y-0 lg:px-8 lg:py-1">
              <h3 className="text-xl font-light tracking-[-0.025em] text-white sm:text-2xl">
                Impresión de planos y láminas hasta formato A0.
              </h3>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                <span className="text-[9px] uppercase tracking-[0.17em] text-white/50">Desde $100</span>
                <span className="text-[9px] uppercase tracking-[0.17em] text-white/50">Blanco y negro</span>
                <span className="text-[9px] uppercase tracking-[0.17em] text-white/50">Color</span>
                <span className="text-[9px] uppercase tracking-[0.17em] text-white/50">Fotográfico y Matte</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("impresion")}
              className="group/button relative z-10 mt-5 inline-flex min-h-13 w-full items-center justify-between overflow-hidden bg-white px-5 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#173b5d] lg:mt-0 lg:w-auto lg:min-w-[210px]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#0f5da8] transition-transform duration-500 group-hover/button:translate-y-0" />

              <span className="relative z-10 transition-colors duration-300 group-hover/button:text-white">
                Cotizar impresión
              </span>

              <span className="relative z-10 ml-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#173b5d]/20 transition-all duration-300 group-hover/button:border-white/30 group-hover/button:text-white">
                +
              </span>
            </button>

            <motion.span
              aria-hidden="true"
              animate={{ x: ["-100%", "500%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-[22%] bg-gradient-to-r from-transparent via-[#55b8ff] to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Inicio;