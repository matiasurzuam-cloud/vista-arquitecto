import { useState } from "react";
import logo from "@/assets/logo-3vertices.jpg.asset.json";

export type SectionId =
  | "inicio"
  | "nosotros"
  | "regularizacion"
  | "proyectos"
  | "impresion"
  | "contacto";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "regularizacion", label: "Regularización" },
  { id: "proyectos", label: "Proyectos" },
  { id: "impresion", label: "Impresión" },
  { id: "contacto", label: "Contacto" },
];

export function Navbar({
  active,
  onNavigate,
}: {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          onClick={() => onNavigate("inicio")}
          className="flex items-center gap-3 text-left"
          aria-label="3 Vértices — Inicio"
        >
          <img src={logo.url} alt="Logo 3 Vértices" width={36} height={36} className="h-9 w-9 object-cover" />
          <span className="text-sm tracking-[0.18em] uppercase">3 Vértices</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`text-xs uppercase tracking-[0.14em] transition-colors ${
                active === s.id ? "text-brand" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <button
          className="text-xs uppercase tracking-[0.14em] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open ? (
        <nav className="grid border-t border-border bg-background md:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                onNavigate(s.id);
                setOpen(false);
              }}
              className={`border-b border-border px-5 py-4 text-left text-xs uppercase tracking-[0.14em] ${
                active === s.id ? "text-brand" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
