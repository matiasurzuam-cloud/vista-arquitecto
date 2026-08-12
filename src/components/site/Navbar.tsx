import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../../assets/logo/logo-3-vertices.png";

export type SectionId =
  | "inicio"
  | "nosotros"
  | "diseno-viviendas"
  | "regularizacion"
  | "proyectos"
  | "impresion"
  | "contacto";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "diseno-viviendas", label: "Viviendas" },
  { id: "regularizacion", label: "Regularización" },
  { id: "proyectos", label: "Proyectos" },
  { id: "impresion", label: "Impresión" },
  { id: "contacto", label: "Contacto" },
];

type NavbarProps = {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
};

const easing = [0.22, 1, 0.36, 1] as const;

export function Navbar({ active, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavigate = (id: SectionId) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: easing,
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "border-b border-black/[0.07] bg-white/[0.88] shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
            : "border-b border-black/[0.045] bg-white/[0.78] backdrop-blur-xl"
        }`}
      >
        <motion.div
          animate={{
            height: scrolled ? 68 : 80,
          }}
          transition={{
            duration: 0.45,
            ease: easing,
          }}
          className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <button
            type="button"
            onClick={() => handleNavigate("inicio")}
            className="group relative flex items-center gap-4 text-left"
            aria-label="Ir al inicio de 3 Vértices"
          >
            <motion.span
              animate={{
                width: scrolled ? 42 : 48,
                height: scrolled ? 42 : 48,
              }}
              transition={{
                duration: 0.45,
                ease: easing,
              }}
              className="relative flex items-center justify-center overflow-hidden"
            >
              <span className="absolute inset-0 scale-75 rounded-full bg-[#0f5da8]/0 blur-xl transition-all duration-500 group-hover:scale-100 group-hover:bg-[#0f5da8]/10" />

              <img
                src={logo}
                alt="Logo de 3 Vértices"
                width={96}
                height={96}
                className="relative h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            </motion.span>

            <span className="hidden flex-col sm:flex">
              <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#142c46]">
                3 Vértices
              </span>

              <motion.span
                animate={{
                  opacity: scrolled ? 0 : 1,
                  height: scrolled ? 0 : 14,
                  marginTop: scrolled ? 0 : 3,
                }}
                transition={{
                  duration: 0.35,
                  ease: easing,
                }}
                className="overflow-hidden text-[8px] uppercase tracking-[0.2em] text-[#8a96a3]"
              >
                Arquitectura
              </motion.span>
            </span>
          </button>

          <nav
            className="hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Navegación principal"
          >
            {SECTIONS.map((section, index) => {
              const isActive = active === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavigate(section.id)}
                  className={`group relative py-3 text-[9px] font-medium uppercase tracking-[0.17em] transition-colors duration-300 xl:text-[10px] ${
                    isActive
                      ? "text-[#0f5da8]"
                      : "text-[#6f7a86] hover:text-[#142c46]"
                  }`}
                >
                  <span className="relative z-10">{section.label}</span>

                  <span className="absolute -left-3 top-1/2 hidden -translate-y-1/2 text-[7px] tracking-normal text-[#0f5da8]/0 transition-all duration-300 group-hover:-left-4 group-hover:text-[#0f5da8]/55 xl:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      transition={{
                        duration: 0.45,
                        ease: easing,
                      }}
                      className="absolute inset-x-0 -bottom-[1px] h-px bg-[#0f5da8]"
                    />
                  )}

                  {!isActive && (
                    <span className="absolute inset-x-0 -bottom-[1px] h-px origin-left scale-x-0 bg-[#0f5da8]/55 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center lg:flex">
            <button
              type="button"
              onClick={() => handleNavigate("contacto")}
              className="group relative min-h-11 overflow-hidden bg-[#0f5da8] px-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_26px_rgba(15,93,168,0.18)] xl:px-6"
            >
              <span className="absolute inset-0 translate-y-full bg-[#173b5d] transition-transform duration-500 ease-out group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center gap-3">
                Agenda

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="group relative flex h-11 min-w-11 items-center justify-center overflow-hidden border border-black/10 bg-white/60 px-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#142c46] backdrop-blur-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="absolute inset-0 translate-y-full bg-[#142c46] transition-transform duration-500 group-hover:translate-y-0" />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              {open ? "Cerrar" : "Menú"}
            </span>
          </button>
        </motion.div>

        <motion.div
          animate={{
            scaleX: scrolled ? 1 : 0,
            opacity: scrolled ? 1 : 0,
          }}
          transition={{
            duration: 0.45,
            ease: easing,
          }}
          className="h-px origin-left bg-gradient-to-r from-transparent via-[#0f5da8]/30 to-transparent"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.35,
              }}
              className="fixed inset-0 z-40 bg-[#071625]/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              id="mobile-navigation"
              initial={{
                opacity: 0,
                y: -24,
                clipPath: "inset(0 0 100% 0)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
              }}
              exit={{
                opacity: 0,
                y: -18,
                clipPath: "inset(0 0 100% 0)",
              }}
              transition={{
                duration: 0.55,
                ease: easing,
              }}
              className="fixed inset-x-0 top-0 z-40 max-h-screen overflow-y-auto bg-[#f7f8f8] pt-24 shadow-[0_30px_80px_rgba(7,22,37,0.2)] lg:hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(20,44,70,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(20,44,70,0.6) 1px, transparent 1px)",
                  backgroundSize: "58px 58px",
                }}
              />

              <nav
                className="relative mx-auto grid max-w-[1440px] px-5 pb-8 sm:px-8"
                aria-label="Navegación móvil"
              >
                <div className="mb-5 flex items-center justify-between border-b border-black/[0.07] pb-4">
                  <span className="text-[9px] uppercase tracking-[0.23em] text-[#8b97a4]">
                    Navegación
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#0f5da8]">
                    3 Vértices
                  </span>
                </div>

                {SECTIONS.map((section, index) => {
                  const isActive = active === section.id;

                  return (
                    <motion.button
                      key={section.id}
                      type="button"
                      onClick={() => handleNavigate(section.id)}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.055,
                        duration: 0.55,
                        ease: easing,
                      }}
                      className={`group flex items-center justify-between border-b border-black/[0.07] py-5 text-left transition-colors ${
                        isActive
                          ? "text-[#0f5da8]"
                          : "text-[#566372] hover:text-[#142c46]"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[9px] tracking-[0.12em] text-[#98a2ad]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-[12px] font-medium uppercase tracking-[0.19em]">
                          {section.label}
                        </span>
                      </span>

                      <span
                        className={`text-lg transition-transform duration-300 ${
                          isActive
                            ? "translate-x-0"
                            : "-translate-x-1 group-hover:translate-x-0"
                        }`}
                      >
                        →
                      </span>
                    </motion.button>
                  );
                })}

                <motion.button
                  type="button"
                  onClick={() => handleNavigate("contacto")}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.55,
                    ease: easing,
                  }}
                  className="group relative mt-7 inline-flex min-h-14 items-center justify-center overflow-hidden bg-[#0f5da8] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  <span className="absolute inset-0 translate-y-full bg-[#173b5d] transition-transform duration-500 group-hover:translate-y-0" />

                  <span className="relative z-10 flex items-center gap-4">
                    Agenda una asesoría
                    <span>→</span>
                  </span>
                </motion.button>

                <div className="mt-8 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-[#98a2ad]">
                  <span>Región del Maule</span>
                  <span>Arquitectura</span>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}