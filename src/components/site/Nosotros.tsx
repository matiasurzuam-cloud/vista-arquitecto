import { motion, useReducedMotion } from "framer-motion";

import logo from "../../assets/logo/logo-3-vertices.png";
import plano from "../../assets/plano.jpg";
import oficina from "../../assets/oficina-2.jpg";

import { Reveal } from "./motion";

const PRINCIPIOS = [
  {
    number: "01",
    title: "Claridad",
    text: "Procesos comprensibles, decisiones explicadas y comunicación constante.",
  },
  {
    number: "02",
    title: "Criterio técnico",
    text: "Cada propuesta se desarrolla desde su realidad normativa y constructiva.",
  },
  {
    number: "03",
    title: "Acompañamiento",
    text: "Estamos presentes desde el diagnóstico inicial hasta la entrega.",
  },
];

const ESTADISTICAS = [
  { value: "120+", label: "Proyectos desarrollados" },
  { value: "12", label: "Años de experiencia" },
  { value: "30", label: "Comunas del Maule" },
];

const ETAPAS = [
  {
    number: "01",
    title: "Diagnóstico",
    text: "Revisamos antecedentes, condiciones del inmueble y viabilidad normativa.",
  },
  {
    number: "02",
    title: "Anteproyecto",
    text: "Construimos una propuesta inicial y la ajustamos junto al cliente.",
  },
  {
    number: "03",
    title: "Tramitación",
    text: "Preparamos el expediente técnico y gestionamos su ingreso municipal.",
  },
  {
    number: "04",
    title: "Entrega",
    text: "Acompañamos el cierre del proceso, aprobación y ejecución cuando corresponde.",
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

function BlueprintScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.55) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.svg
        viewBox="0 0 620 420"
        fill="none"
        className="absolute left-[4%] top-[10%] hidden h-[430px] w-[630px] opacity-[0.12] lg:block"
      >
        <motion.path
          d="M48 356H570M95 356V165L245 78L395 165V356M155 356V248H265V356M330 356V235H470V356M245 78V35M215 35H275"
          stroke="#0F5DA8"
          strokeWidth="1.1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.8, ease: easing }}
        />
        <motion.path
          d="M62 385H552M62 378V392M552 378V392M82 134H425M82 127V141M425 127V141"
          stroke="#0F5DA8"
          strokeWidth="0.9"
          strokeDasharray="5 7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 2.2, ease: easing }}
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 460 300"
        fill="none"
        className="absolute right-[2%] bottom-[8%] hidden h-[300px] w-[460px] opacity-[0.08] lg:block"
      >
        <motion.path
          d="M40 242H420V66H255V112H40V242ZM152 112V242M255 66V242M335 66V242M40 178H420"
          stroke="#173B5D"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.4, ease: easing }}
        />
      </motion.svg>
    </div>
  );
}

export function Nosotros() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafb_0%,#eef4f8_52%,#ffffff_100%)] text-[#101828]"
    >
      <BlueprintScene />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-20 h-[560px] w-[560px] rounded-full bg-[#0f5da8]/[0.06] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-[32%] h-[520px] w-[520px] rounded-full bg-[#173b5d]/[0.05] blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* HERO */}
        <div className="relative min-h-[440px] overflow-hidden border-b border-black/10 lg:min-h-[480px]">
          {/* Logo gigante */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.35, ease: easing }}
            className="pointer-events-none absolute left-1/2 top-[47%] h-[380px] w-[430px] -translate-x-1/2 -translate-y-1/2 sm:h-[440px] sm:w-[500px] lg:h-[500px] lg:w-[580px]"
          >
            <motion.img
              src={logo}
              alt=""
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      scale: [1, 1.015, 1],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full object-contain opacity-[0.07] grayscale"
              style={{
                clipPath: "inset(0 0 34% 0)",
                filter: "grayscale(1) contrast(0.9)",
              }}
            />

            <motion.img
              src={logo}
              alt=""
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 6, 0],
                      y: [0, 4, 0],
                    }
              }
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 h-full w-full translate-x-4 translate-y-3 object-contain opacity-[0.025] grayscale"
              style={{ clipPath: "inset(0 0 34% 0)" }}
            />
          </motion.div>

          {/* Número */}
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easing }}
            className="pointer-events-none absolute right-0 top-[-1rem] text-[6rem] font-light leading-none tracking-[-0.09em] text-[#173b5d]/[0.045] sm:text-[8rem] lg:text-[10rem]"
          >
            02
          </motion.span>

          {/* Etiqueta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing }}
            className="absolute left-0 top-10 flex items-center gap-4 lg:top-14"
          >
            <span className="h-px w-10 bg-[#0f5da8]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#0f5da8]">
              Nosotros
            </span>
          </motion.div>

          {/* Título sobre logo */}
          <div className="relative z-20 flex min-h-[360px] items-center justify-center px-2 pt-14 text-center lg:min-h-[400px] lg:pt-12">
            <div className="w-full max-w-[1040px]">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: easing }}
                className="mb-7 block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0f5da8]"
              >
                Diseño · Gestión · Territorio
              </motion.span>

              <h1 className="text-[2.5rem] font-light leading-[0.94] tracking-[-0.055em] text-[#101828] sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[4.7rem]">
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{
        duration: 0.95,
        ease: easing,
      }}
      className="block"
    >
      Diseñamos
    </motion.span>
  </span>

  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{
        delay: 0.1,
        duration: 0.95,
        ease: easing,
      }}
      className="block text-[#173b5d]"
    >
      arquitectura
    </motion.span>
  </span>

  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{
        delay: 0.2,
        duration: 0.95,
        ease: easing,
      }}
      className="block font-medium italic text-[#0f5da8]"
    >
      funcional.
    </motion.span>
  </span>
</h1>
              <Reveal delay={0.25}>
                <p className="mx-auto mt-8 max-w-[680px] text-sm leading-[1.9] text-[#667085] sm:text-base">
                  En 3 Vértices, creemos que el buen diseño nace de entender
                  profundamente las necesidades de cada cliente y su entorno.
                  Desarrollamos proyectos desde una mirada técnica, sensible y
                  conectada con el territorio, para mejorar la forma de habitar
                  y la calidad de vida.
                </p>
              </Reveal>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7, ease: easing }}
                className="mt-9 flex flex-wrap justify-center gap-3"
              >
                {["Diseño", "Gestión", "Territorio"].map((item, index) => (
                  <span
                    key={item}
                    className="group flex items-center gap-3 border border-black/10 bg-white/70 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0f5da8]/40 hover:bg-white hover:shadow-[0_14px_35px_rgba(15,93,168,0.1)]"
                  >
                    <span className="text-[8px] tracking-[0.2em] text-[#98a2b3]">
                      0{index + 1}
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#344054]">
                      {item}
                    </span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Banda */}
          <div className="relative mt-10 overflow-hidden border-y border-black/[0.07] py-4">
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: ["0%", "-50%"],
                    }
              }
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex w-max items-center whitespace-nowrap"
            >
              {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex items-center">
                  {[
                    "ARQUITECTURA",
                    "REGULARIZACIÓN",
                    "DISEÑO",
                    "PLANIFICACIÓN",
                    "GESTIÓN",
                  ].map((item) => (
                    <div
                      key={`${groupIndex}-${item}`}
                      className="flex items-center"
                    >
                      <span className="px-8 text-[9px] uppercase tracking-[0.32em] text-[#667085]">
                        {item}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0f5da8]/45" />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* FILOSOFÍA + VISUALES */}
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#0f5da8]">
                Nuestra mirada
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[590px] text-2xl font-light leading-[1.45] tracking-[-0.03em] text-[#1d2939] sm:text-3xl">
                Comprender antes de proyectar nos permite anticipar
                dificultades y convertir cada necesidad en una solución viable.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[540px] text-sm leading-[1.85] text-[#667085] sm:text-base">
                Nuestra metodología combina criterio técnico, comunicación
                constante y acompañamiento durante todo el proceso. Cada etapa
                tiene un propósito y cada decisión se desarrolla con una visión
                clara.
              </p>
            </Reveal>

            <div className="mt-10 border-t border-black/10">
              {PRINCIPIOS.map((principio, index) => (
                <motion.article
                  key={principio.number}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.65,
                    ease: easing,
                  }}
                  className="group grid grid-cols-[44px_1fr_auto] items-start gap-4 border-b border-black/10 py-6"
                >
                  <span className="pt-1 text-[9px] tracking-[0.2em] text-[#98a2b3]">
                    {principio.number}
                  </span>

                  <div>
                    <h3 className="text-base font-medium text-[#1d2939]">
                      {principio.title}
                    </h3>
                    <p className="mt-2 max-w-[390px] text-sm leading-[1.7] text-[#667085]">
                      {principio.text}
                    </p>
                  </div>

                  <span className="mt-2 h-px w-8 bg-[#0f5da8]/35 transition-all duration-500 group-hover:w-14 group-hover:bg-[#0f5da8]" />
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative pb-20 sm:pb-24">
            <Reveal className="relative z-10 w-[93%]">
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -7,
                        rotateX: 1,
                        rotateY: -1,
                      }
                }
                transition={{ duration: 0.5, ease: easing }}
                className="group relative overflow-hidden border border-black/[0.08] bg-white p-2 shadow-[0_35px_90px_rgba(15,35,55,0.14)] sm:p-3"
                style={{ transformPerspective: 1200 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8edf0]">
                  <motion.img
                    src={plano}
                    alt="Plano arquitectónico y documentación técnica"
                    className="h-full w-full object-cover"
                    initial={{ scale: reduceMotion ? 1 : 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    whileHover={{ scale: reduceMotion ? 1 : 1.035 }}
                    transition={{ duration: 1.25, ease: easing }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071625]/55 via-transparent to-white/5" />

                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-[8px] uppercase tracking-[0.27em] text-white/60">
                      Desarrollo técnico
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Del plano a la realidad
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 55, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.16,
                duration: 0.95,
                ease: easing,
              }}
              className="absolute bottom-0 right-0 z-20 w-[47%] border-[7px] border-white shadow-[0_30px_80px_rgba(7,22,37,0.22)] sm:w-[43%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e9edf0]">
                <motion.img
                  src={oficina}
                  alt="Proyecto desarrollado por 3 Vértices Arquitectura"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: reduceMotion ? 1 : 1.06 }}
                  transition={{ duration: 0.8, ease: easing }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071625]/65 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[8px] uppercase tracking-[0.24em] text-white/60">
                    Proyecto
                  </p>
                  <p className="mt-1 text-xs font-medium">
                    Arquitectura construida
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.45,
                duration: 0.75,
                ease: easing,
              }}
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="absolute bottom-[14%] right-[38%] z-30 flex h-20 w-20 items-center justify-center bg-[#0f5da8] text-white shadow-[0_18px_40px_rgba(15,93,168,0.3)] sm:h-24 sm:w-24"
            >
              <span className="text-3xl font-light">↗</span>
            </motion.div>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="mt-16 overflow-hidden bg-[#123958] text-white shadow-[0_25px_80px_rgba(18,57,88,0.16)]">
          <div className="grid sm:grid-cols-3">
            {ESTADISTICAS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                  ease: easing,
                }}
                className="group relative border-b border-white/10 px-8 py-10 sm:border-b-0 sm:border-r sm:py-12 last:sm:border-r-0"
              >
                <span className="text-[3.7rem] font-light leading-none tracking-[-0.06em] sm:text-[4.5rem]">
                  {stat.value}
                </span>
                <p className="mt-4 text-[9px] uppercase tracking-[0.23em] text-white/55">
                  {stat.label}
                </p>
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#4ba3f1] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* METODOLOGÍA */}
        <div className="mt-16 border-t border-black/10 pt-10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#0f5da8]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#0f5da8]">
                  Metodología
                </span>
              </div>

              <Reveal delay={0.08}>
                <h3 className="mt-6 max-w-md text-3xl font-light leading-tight tracking-[-0.04em] sm:text-4xl">
                  Un proceso claro de principio a fin.
                </h3>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-6 max-w-[430px] text-sm leading-[1.8] text-[#667085]">
                  Cada etapa tiene un objetivo preciso, evitando improvisaciones
                  y permitiendo que el proyecto avance con seguridad.
                </p>
              </Reveal>
            </div>

            <div className="grid border-l border-t border-black/10 sm:grid-cols-2">
              {ETAPAS.map((etapa, index) => (
                <motion.article
                  key={etapa.number}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.65,
                    ease: easing,
                  }}
                  className="group relative min-h-[270px] overflow-hidden border-b border-r border-black/10 bg-white p-6 sm:p-7"
                >
                  <span className="absolute inset-0 translate-y-full bg-[#173b5d] transition-transform duration-500 ease-out group-hover:translate-y-0" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.22em] text-[#0f5da8] transition-colors group-hover:text-white/60">
                        {etapa.number}
                      </span>
                      <span className="h-px w-8 bg-[#0f5da8]/40 transition-all duration-500 group-hover:w-14 group-hover:bg-white/50" />
                    </div>

                    <div className="mt-auto pt-12">
                      <h4 className="text-2xl font-light tracking-[-0.025em] transition-colors group-hover:text-white">
                        {etapa.title}
                      </h4>
                      <p className="mt-4 text-sm leading-[1.75] text-[#667085] transition-colors group-hover:text-white/70">
                        {etapa.text}
                      </p>
                      <span className="mt-6 block text-lg text-[#0f5da8] transition-all duration-300 group-hover:translate-x-2 group-hover:text-white">
                        →
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* CIERRE */}
        <div className="mt-16 border-t border-black/10 pt-10 text-center">
          <Reveal>
            <p className="mx-auto max-w-[900px] text-[1.9rem] font-light leading-[1.15] tracking-[-0.04em] text-[#111827] sm:text-[2.6rem] lg:text-[3.2rem]">
              No diseñamos solo espacios.
              <span className="block font-medium italic text-[#173b5d]">
                Diseñamos soluciones que permanecen.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;