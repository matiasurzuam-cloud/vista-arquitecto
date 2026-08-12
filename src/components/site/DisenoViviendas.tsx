import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Reveal } from "./motion";

type ModeloVivienda = {
  id: string;
  numero: string;
  titulo: string;
  superficie: string;
  descripcion: string;
  enfoque: string;
  caracteristicas: string[];
  color: string;
};

const MODELOS: ModeloVivienda[] = [
  {
    id: "vivienda-140",
    numero: "01",
    titulo: "Diseño de Vivienda",
    superficie: "Hasta 140 m²",
    descripcion:
      "Una propuesta pensada para resolver de forma eficiente los espacios esenciales de una vivienda contemporánea.",
    enfoque: "Funcionalidad, eficiencia y organización",
    caracteristicas: [
      "Distribución optimizada",
      "Iluminación natural",
      "Relación interior–exterior",
      "Diseño adaptado al terreno",
    ],
    color: "from-[#0f5da8]/20 to-[#173b5d]/60",
  },
  {
    id: "vivienda-200",
    numero: "02",
    titulo: "Diseño de Vivienda",
    superficie: "Hasta 200 m²",
    descripcion:
      "Una vivienda de mayor amplitud, diseñada para integrar áreas sociales, privadas y de servicio con mayor flexibilidad.",
    enfoque: "Amplitud, comodidad y continuidad espacial",
    caracteristicas: [
      "Zonas públicas y privadas",
      "Espacios de mayor amplitud",
      "Posibilidad de quincho o terraza",
      "Programa adaptable",
    ],
    color: "from-[#173b5d]/15 to-[#0b1d2e]/65",
  },
  {
    id: "vivienda-250",
    numero: "03",
    titulo: "Diseño de Vivienda",
    superficie: "Hasta 250 m²",
    descripcion:
      "Una propuesta residencial con mayor presencia arquitectónica, preparada para incorporar programas complementarios.",
    enfoque: "Jerarquía, confort y presencia arquitectónica",
    caracteristicas: [
      "Mayor libertad de diseño",
      "Dormitorios en suite",
      "Espacios de trabajo o estudio",
      "Integración paisajística",
    ],
    color: "from-[#0f5da8]/10 to-[#173b5d]/70",
  },
  {
    id: "vivienda-300",
    numero: "04",
    titulo: "Diseño de Vivienda",
    superficie: "Hasta 300 m²",
    descripcion:
      "Una vivienda de escala superior, proyectada con una mirada integral sobre el terreno, el programa y la experiencia de habitar.",
    enfoque: "Escala, identidad y desarrollo integral",
    caracteristicas: [
      "Programa residencial completo",
      "Espacios interiores y exteriores",
      "Mayor nivel de personalización",
      "Desarrollo arquitectónico integral",
    ],
    color: "from-[#173b5d]/20 to-[#071625]/75",
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

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

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 520 340"
        fill="none"
        className="pointer-events-none absolute -left-12 top-[8%] hidden h-[330px] w-[500px] opacity-[0.13] lg:block"
      >
        <motion.path
          d="M24 300H495M72 300V124L190 58L310 124V300M310 170H470V300M120 300V205H205V300M345 300V220H425V300M190 58V22M163 22H217"
          stroke="#0F5DA8"
          strokeWidth="1.1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.6, ease: easing }}
        />
      </motion.svg>
    </>
  );
}

function PlaceholderVisual({ modelo }: { modelo: ModeloVivienda }) {
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-[#dfe8f0]">
      <div className={`absolute inset-0 bg-gradient-to-br ${modelo.color}`} />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.svg
        viewBox="0 0 520 360"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          d="M56 296H470M95 296V150L230 74L365 150V296M155 296V210H245V296M298 296V205H410V296M230 74V40M205 40H255"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 2.1, ease: easing }}
        />
      </motion.svg>

      <div className="absolute left-6 top-6 flex items-center gap-3">
        <span className="text-[10px] tracking-[0.22em] text-white/75">
          {modelo.numero}
        </span>
        <span className="h-px w-8 bg-white/35" />
        <span className="text-[8px] uppercase tracking-[0.18em] text-white/55">
          Imagen pendiente
        </span>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[8px] uppercase tracking-[0.2em] text-white/55">
          Superficie
        </span>
        <p className="mt-2 text-4xl font-light tracking-[-0.04em] text-white sm:text-5xl">
          {modelo.superficie}
        </p>
      </div>
    </div>
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
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#0f5da8]" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#0f5da8]">
                  Diseño residencial
                </span>
              </div>

              <p className="mt-7 max-w-[430px] text-sm leading-[1.9] text-[#667085] sm:text-base">
                Propuestas residenciales desarrolladas según la superficie, el
                terreno, las necesidades del usuario y la forma de habitar.
              </p>
            </div>

            <h2 className="max-w-[960px] text-[2.75rem] font-light leading-[1.02] tracking-[-0.05em] text-[#101828] sm:text-[4rem] lg:text-[5rem] xl:text-[5.6rem]">
              Diseñamos viviendas
              <span className="block text-[#173b5d]">pensadas para vivir.</span>
              <span className="block font-medium italic">
                Adaptadas a cada escala.
              </span>
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
                      seleccionado
                        ? "border-white/30"
                        : "border-black/10 text-[#0f5da8]"
                    }`}
                  >
                    {seleccionado ? "✓" : "+"}
                  </span>
                </div>

                <p className="mt-8 text-xl font-light tracking-[-0.03em]">
                  {modelo.superficie}
                </p>
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
              className="grid overflow-hidden border border-black/10 bg-white/90 shadow-[0_28px_80px_rgba(15,41,66,0.1)] lg:grid-cols-[1.15fr_0.85fr]"
            >
              <PlaceholderVisual modelo={activo} />

              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
                  {activo.numero} · Diseño de vivienda
                </span>

                <h3 className="mt-8 text-4xl font-light leading-[1.04] tracking-[-0.045em] text-[#101828] sm:text-5xl">
                  {activo.titulo}
                  <span className="block font-medium italic text-[#173b5d]">
                    {activo.superficie}
                  </span>
                </h3>

                <p className="mt-7 text-sm leading-[1.9] text-[#667085] sm:text-base">
                  {activo.descripcion}
                </p>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
                    Enfoque
                  </span>
                  <p className="mt-3 text-xl font-light text-[#173b5d]">
                    {activo.enfoque}
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {activo.caracteristicas.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 border border-black/10 bg-[#f8fafc] p-4"
                    >
                      <span className="text-[8px] tracking-[0.18em] text-[#0f5da8]">
                        0{index + 1}
                      </span>
                      <span className="text-sm leading-[1.7] text-[#344054]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10">
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
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

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
                Podemos desarrollar una propuesta adaptada a tus necesidades,
                superficie, presupuesto y características del lugar.
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