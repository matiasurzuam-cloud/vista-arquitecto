import hero from "@/assets/hero-oficina.jpg";
import { Eyebrow, ActionButton } from "./shared";
import type { SectionId } from "./Navbar";

export function Inicio({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        <Eyebrow>Estudio de arquitectura · Región del Maule</Eyebrow>
        <h1 className="mt-6 max-w-xl text-3xl leading-[1.08] sm:text-5xl">
          <span className="emphasis text-brand">Oficina especializada</span> en diseño de vivienda
          unifamiliar y permisología
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Gestión de obra, regularización de proyectos y normativa municipal.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ActionButton onClick={() => onNavigate("regularizacion")}>Regularización</ActionButton>
          <ActionButton tone="outline" onClick={() => onNavigate("impresion")}>
            Impresión
          </ActionButton>
        </div>
      </div>

      <div className="relative min-h-[38vh] bg-surface lg:min-h-0">
        <img
          src={hero}
          alt="Oficina del estudio de arquitectura 3 Vértices"
          width={1600}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
