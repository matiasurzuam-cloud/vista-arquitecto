import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  Navbar,
  SECTIONS,
  type SectionId,
} from "@/components/site/Navbar";

import { Inicio } from "@/components/site/Inicio";
import { Nosotros } from "@/components/site/Nosotros";
import { DisenoViviendas } from "@/components/site/DisenoViviendas";
import { Regularizacion } from "@/components/site/Regularizacion";
import { Proyectos } from "@/components/site/Proyectos";
import { Impresion } from "@/components/site/Impresion";
import { Contacto } from "@/components/site/Contacto";

const TITLE =
  "3 Vértices — Arquitectura y permisología, Región del Maule";

const DESCRIPTION =
  "Oficina especializada en diseño de vivienda unifamiliar y permisología: gestión de obra, regularización de proyectos y normativa municipal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: TITLE,
      },
      {
        name: "description",
        content: DESCRIPTION,
      },
      {
        property: "og:title",
        content: TITLE,
      },
      {
        property: "og:description",
        content: DESCRIPTION,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: Index,
});

const IDS = SECTIONS.map((section) => section.id);

function readHash(): SectionId {
  if (typeof window === "undefined") {
    return "inicio";
  }

  const hash = window.location.hash.replace("#", "") as SectionId;

  return IDS.includes(hash) ? hash : "inicio";
}

function Index() {
  const [active, setActive] = useState<SectionId>(() => readHash());

  useEffect(() => {
    const handleHashChange = () => {
      setActive(readHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigate = (id: SectionId) => {
    const nuevoHash = id === "inicio" ? "" : `#${id}`;

    if (window.location.hash === nuevoHash) {
      setActive(id);
      return;
    }

    window.location.hash = nuevoHash;
  };

  const renderSection = () => {
    switch (active) {
      case "inicio":
        return <Inicio />;

      case "nosotros":
        return <Nosotros />;

      case "diseno-viviendas":
        return <DisenoViviendas />;

      case "regularizacion":
        return <Regularizacion />;

      case "proyectos":
        return <Proyectos />;

      case "impresion":
        return <Impresion />;

      case "contacto":
        return <Contacto />;

      default:
        return <Inicio />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <Navbar active={active} onNavigate={navigate} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={active}
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-screen overflow-y-auto pt-20"
        >
          <div className="min-h-full">{renderSection()}</div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}