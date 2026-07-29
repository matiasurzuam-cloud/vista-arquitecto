import { useState } from "react";
import p1 from "@/assets/proyecto-1.jpg";
import p2 from "@/assets/proyecto-2.jpg";
import plano from "@/assets/plano.jpg";
import { SectionTitle } from "./shared";

type Proyecto = {
  id: string;
  titulo: string;
  lugar: string;
  anio: string;
  superficie: string;
  portada: string;
  fotos: string[];
  descripcion: string;
};

const PROYECTOS: Proyecto[] = [
  {
    id: "casa-a",
    titulo: "Casa A",
    lugar: "Talca, Región del Maule",
    anio: "2025",
    superficie: "120 m²",
    portada: p1,
    fotos: [p1, p2],
    descripcion: "Texto placeholder: descripción del proyecto, partido general y materialidad.",
  },
  {
    id: "casa-b",
    titulo: "Casa B",
    lugar: "Curicó, Región del Maule",
    anio: "2024",
    superficie: "95 m²",
    portada: p2,
    fotos: [p2, p1],
    descripcion: "Texto placeholder: descripción del proyecto, programa y relación con el terreno.",
  },
  {
    id: "casa-c",
    titulo: "Casa C",
    lugar: "Linares, Región del Maule",
    anio: "2024",
    superficie: "140 m²",
    portada: p1,
    fotos: [p1, p2],
    descripcion: "Texto placeholder: descripción del proyecto y proceso de tramitación.",
  },
];

export function Proyectos() {
  const [activo, setActivo] = useState<Proyecto | null>(null);

  if (activo) {
    return (
      <div className="mx-auto h-full max-w-6xl overflow-y-auto px-5 py-24 sm:px-8">
        <button onClick={() => setActivo(null)} className="eyebrow hover:text-foreground">
          ← Volver a proyectos
        </button>
        <h1 className="mt-5 text-3xl sm:text-4xl">{activo.titulo}</h1>
        <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
          <div><dt className="eyebrow">Lugar</dt><dd>{activo.lugar}</dd></div>
          <div><dt className="eyebrow">Año</dt><dd>{activo.anio}</dd></div>
          <div><dt className="eyebrow">Superficie</dt><dd>{activo.superficie}</dd></div>
        </dl>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {activo.descripcion}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {activo.fotos.map((f, i) => (
            <img key={i} src={f} alt={`${activo.titulo} — imagen ${i + 1}`} width={1200} height={900} loading="lazy" className="h-64 w-full object-cover" />
          ))}
        </div>
        <p className="eyebrow mt-10">Plano</p>
        <img src={plano} alt={`Plano de ${activo.titulo}`} width={1200} height={900} loading="lazy" className="mt-3 w-full border border-border object-contain" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8">
      <SectionTitle
        eyebrow="Proyectos"
        title="Portafolio"
        lead="Selección de obras y proyectos tramitados por la oficina."
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROYECTOS.map((p) => (
          <button key={p.id} onClick={() => setActivo(p)} className="group text-left">
            <img src={p.portada} alt={p.titulo} width={1200} height={900} loading="lazy" className="h-52 w-full object-cover transition-opacity group-hover:opacity-85" />
            <h3 className="mt-3 text-lg transition-colors group-hover:text-brand">{p.titulo}</h3>
            <p className="text-sm text-muted-foreground">{p.lugar} · {p.anio}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
