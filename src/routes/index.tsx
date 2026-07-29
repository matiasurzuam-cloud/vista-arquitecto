import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar, SECTIONS, type SectionId } from "@/components/site/Navbar";
import { Inicio } from "@/components/site/Inicio";
import { Nosotros } from "@/components/site/Nosotros";
import { Regularizacion } from "@/components/site/Regularizacion";
import { Proyectos } from "@/components/site/Proyectos";
import { Impresion } from "@/components/site/Impresion";
import { Contacto } from "@/components/site/Contacto";

const TITLE = "3 Vértices — Arquitectura y permisología, Región del Maule";
const DESCRIPTION =
  "Oficina especializada en diseño de vivienda unifamiliar y permisología: gestión de obra, regularización de proyectos y normativa municipal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const IDS = SECTIONS.map((s) => s.id);

function readHash(): SectionId {
  if (typeof window === "undefined") return "inicio";
  const h = window.location.hash.replace("#", "") as SectionId;
  return IDS.includes(h) ? h : "inicio";
}

function Index() {
  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    setActive(readHash());
    const onHash = () => setActive(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (id: SectionId) => {
    window.location.hash = id === "inicio" ? "" : id;
    setActive(id);
  };

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <Navbar active={active} onNavigate={navigate} />
      <main key={active} className="view-enter h-screen pt-16">
        <div className="h-full">
          {active === "inicio" && <Inicio onNavigate={navigate} />}
          {active === "nosotros" && <Nosotros />}
          {active === "regularizacion" && <Regularizacion />}
          {active === "proyectos" && <Proyectos />}
          {active === "impresion" && <Impresion />}
          {active === "contacto" && <Contacto />}
        </div>
      </main>
    </div>
  );
}
