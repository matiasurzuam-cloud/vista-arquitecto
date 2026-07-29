import { motion } from "framer-motion";
import hero from "@/assets/hero-oficina.jpg";
import { Eyebrow, ActionButton } from "./shared";
import { CountUp, Typewriter } from "./motion";
import type { SectionId } from "./Navbar";

const STATS = [
  { value: 120, suffix: "+", label: "Proyectos tramitados" },
  { value: 12, suffix: "", label: "Años de experiencia" },
  { value: 30, suffix: "", label: "Comunas del Maule" },
];

export function Inicio({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="grid h-full grid-cols-1 overflow-y-auto lg:grid-cols-2 lg:overflow-hidden">
      <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        <Eyebrow>Estudio de arquitectura · Región del Maule</Eyebrow>
        <h1 className="mt-6 max-w-xl text-3xl leading-[1.08] sm:text-5xl">
          <span className="emphasis text-brand">
            <Typewriter text="Oficina especializada" />
          </span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline"
          >
            en diseño de vivienda unifamiliar y permisología
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Gestión de obra, regularización de proyectos y normativa municipal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <ActionButton onClick={() => onNavigate("regularizacion")}>Regularización</ActionButton>
          <ActionButton tone="outline" onClick={() => onNavigate("impresion")}>
            Impresión
          </ActionButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl text-brand sm:text-3xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[38vh] bg-surface lg:min-h-0"
      >
        <img
          src={hero}
          alt="Oficina del estudio de arquitectura 3 Vértices"
          width={1600}
          height={1000}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
