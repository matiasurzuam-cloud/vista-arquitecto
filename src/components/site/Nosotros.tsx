import oficina1 from "@/assets/hero-oficina.jpg";
import oficina2 from "@/assets/oficina-2.jpg";
import { SectionTitle } from "./shared";
import { Reveal } from "./motion";

const ETAPAS = [
  { n: "01", t: "Diagnóstico", d: "Texto placeholder: revisión de antecedentes, situación normativa del inmueble y factibilidad." },
  { n: "02", t: "Anteproyecto", d: "Texto placeholder: propuesta preliminar, ajustes con el cliente y definición de alcances." },
  { n: "03", t: "Tramitación", d: "Texto placeholder: preparación de expediente y gestión ante la Dirección de Obras Municipales." },
  { n: "04", t: "Entrega y obra", d: "Texto placeholder: entrega de permisos, acompañamiento y gestión de obra." },
];

export function Nosotros() {
  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8">
      <SectionTitle
        eyebrow="Nosotros"
        title="Un equipo pequeño, procesos claros"
        lead="Texto placeholder sobre el estudio: enfoque, experiencia y forma de trabajo con cada cliente."
      />

      <div className="mt-8 grid grid-cols-2 gap-3">
        <img src={oficina1} alt="Espacio de trabajo del estudio" width={1600} height={1000} loading="lazy" className="h-32 w-full object-cover sm:h-44" />
        <img src={oficina2} alt="Maquetas y planos sobre la mesa de trabajo" width={1200} height={900} loading="lazy" className="h-32 w-full object-cover sm:h-44" />
      </div>

      <div className="mt-10 border-t border-border">
        <p className="eyebrow mt-6">Metodología de trabajo</p>
        <div className="mt-5 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e) => (
            <Reveal key={e.n} delay={Number(e.n) * 0.08} className="bg-background p-6">
              <span className="text-xs tracking-[0.2em] text-brand">{e.n}</span>
              <h3 className="mt-3 text-lg">Etapa {Number(e.n)}: {e.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
