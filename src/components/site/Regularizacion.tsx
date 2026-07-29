import { useState } from "react";
import { LinkButton, SectionTitle, waLink } from "./shared";

type Servicio = {
  id: string;
  titulo: string;
  breve: string;
  detalle: string[];
};

const SERVICIOS: Servicio[] = [
  {
    id: "ley-mono",
    titulo: "Ley del mono (90 m² / 140 m²)",
    breve: "Regularización de ampliaciones existentes acogidas a la ley vigente.",
    detalle: [
      "Texto placeholder: descripción del proceso de acogida a la ley del mono según superficie construida.",
      "Texto placeholder: documentos requeridos y plazos estimados de tramitación municipal.",
    ],
  },
  {
    id: "vivienda-social",
    titulo: "Vivienda social y económica",
    breve: "Regularización de viviendas sociales y económicas.",
    detalle: [
      "Texto placeholder: alcance del servicio para viviendas sociales y económicas.",
      "Texto placeholder: antecedentes necesarios y consideraciones normativas.",
    ],
  },
  {
    id: "obra-nueva",
    titulo: "Obra nueva (vivienda o local comercial)",
    breve: "Permiso de edificación para obra nueva residencial o comercial.",
    detalle: [
      "Texto placeholder: etapas del permiso de edificación de obra nueva.",
      "Texto placeholder: especialidades y coordinación con la DOM.",
    ],
  },
  {
    id: "ampliacion",
    titulo: "Ampliación de obra menor (hasta 100 m²)",
    breve: "Tramitación de ampliaciones menores hasta 100 m².",
    detalle: [
      "Texto placeholder: requisitos de obra menor y límites de superficie.",
      "Texto placeholder: plazos y documentación.",
    ],
  },
  {
    id: "locales",
    titulo: "Regularización de locales comerciales",
    breve: "Regularización para obtención de patente comercial.",
    detalle: [
      "Texto placeholder: proceso de regularización de locales y cambio de destino.",
      "Texto placeholder: coordinación con patentes municipales.",
    ],
  },
  {
    id: "asesoria",
    titulo: "Asesoría técnica previa",
    breve: "Presencial en oficina. Revisión de antecedentes y alternativas.",
    detalle: [
      "Texto placeholder: en qué consiste la asesoría técnica previa presencial.",
      "Texto placeholder: duración y valor referencial.",
    ],
  },
  {
    id: "visita",
    titulo: "Visita técnica a terreno",
    breve: "Solo Región del Maule · duración 1 hora.",
    detalle: [
      "Texto placeholder: alcance de la visita técnica en terreno.",
      "Texto placeholder: cobertura geográfica y condiciones.",
    ],
  },
];

export function Regularizacion() {
  const [activo, setActivo] = useState<Servicio | null>(null);

  if (activo) {
    return (
      <div className="mx-auto flex h-full max-w-4xl flex-col justify-center px-5 py-12 sm:px-8">
        <button
          onClick={() => setActivo(null)}
          className="eyebrow self-start hover:text-foreground"
        >
          ← Volver a servicios
        </button>
        <h1 className="mt-6 text-3xl leading-tight sm:text-4xl">{activo.titulo}</h1>
        <p className="mt-4 emphasis text-brand">{activo.breve}</p>
        <div className="mt-6 space-y-4 border-t border-border pt-6">
          {activo.detalle.map((p) => (
            <p key={p} className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {p}
            </p>
          ))}
        </div>
        <LinkButton
          className="mt-10 self-start"
          href={waLink(`Hola, quiero agendar el servicio: ${activo.titulo}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar por WhatsApp
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8">
      <SectionTitle
        eyebrow="Regularización"
        title="Servicios de permisología"
        lead="Selecciona un servicio para ver el detalle y agendar directamente por WhatsApp."
      />
      <div className="mt-8 grid gap-px overflow-y-auto bg-border sm:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.map((s) => (
          <article key={s.id} className="flex flex-col bg-background p-6">
            <button onClick={() => setActivo(s)} className="text-left">
              <h3 className="text-lg leading-snug transition-colors hover:text-brand">{s.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.breve}</p>
            </button>
            <div className="mt-5 flex flex-wrap items-center gap-4 pt-4">
              <a
                href={waLink(`Hola, quiero agendar el servicio: ${s.titulo}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.18em] text-brand hover:text-brand-soft"
              >
                Agendar por WhatsApp
              </a>
              <button
                onClick={() => setActivo(s)}
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Ver detalle
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
