import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Reveal } from "./motion";
import { PlanoVivienda } from "./PlanoVivienda";

type Modalidad = "presencial" | "videollamada";
type Motivo =
  | "Diseño arquitectónico"
  | "Regularización"
  | "Permisos y tramitación"
  | "Impresión técnica"
  | "Consulta general";

type DatosReserva = {
  nombre: string;
  email: string;
  telefono: string;
  comentario: string;
};

const WHATSAPP_NUMBER = "56934941180";
const MAPS_URL =
  "https://maps.app.goo.gl/FviLzjPdwsepZYNEA?g_st=ic";
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Maip%C3%BA%202125%2C%20Molina%2C%20Chile&output=embed";

const DATOS_CONTACTO = {
  email: "3vertices.arquitectos@gmail.com",
  telefonoVisible: "+56 9 3494 1180",
  ubicacion: "Maipú 2125, Molina, Región del Maule",
  horario: "Lunes a viernes · 09:00 — 20:00",
  visitaTecnica: "Sábados · 10:00 — 14:00 hrs",
};

const MOTIVOS: Motivo[] = [
  "Diseño arquitectónico",
  "Regularización",
  "Permisos y tramitación",
  "Impresión técnica",
  "Consulta general",
];

const HORARIOS = [
  "09:00",
  "10:00",
  "11:30",
  "13:00",
  "15:00",
  "16:30",
  "18:00",
];

const DIAS_SEMANA = ["L", "M", "M", "J", "V", "S", "D"];
const easing = [0.22, 1, 0.36, 1] as const;

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function startOfDay(fecha: Date) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

function sameDate(a: Date | null, b: Date) {
  return Boolean(
    a &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate(),
  );
}

function formatDate(fecha: Date | null) {
  if (!fecha) return "Selecciona una fecha";

  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

function buildCalendarDays(mes: Date) {
  const year = mes.getFullYear();
  const month = mes.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const mondayIndex = (firstDay.getDay() + 6) % 7;
  const days: Array<Date | null> = Array.from(
    { length: mondayIndex },
    () => null,
  );

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

function BlueprintBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <PlanoVivienda className="pointer-events-none absolute -left-16 top-[7%] hidden h-[360px] w-[530px] text-[#0f5da8] opacity-[0.14] lg:block" />

      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[5%] top-[41%] hidden h-40 w-56 border border-[#0f5da8]/10 lg:block"
      >
        <span className="absolute left-[28%] top-0 h-full w-px bg-[#0f5da8]/10" />
        <span className="absolute left-0 top-[62%] h-px w-full bg-[#0f5da8]/10" />
        <span className="absolute -left-3 top-8 h-px w-6 bg-[#0f5da8]/20" />
      </motion.div>
    </>
  );
}

function ReviewsBlock() {
  return (
    <div className="relative overflow-hidden border border-black/10 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,41,66,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.55) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <span className="text-[9px] uppercase tracking-[0.23em] text-[#0f5da8]">
            Google Maps
          </span>

          <h3 className="mt-5 max-w-[520px] text-3xl font-light leading-[1.15] tracking-[-0.035em] text-[#101828] sm:text-4xl">
            Conoce la experiencia de quienes ya trabajaron con nosotros.
          </h3>

          <p className="mt-6 max-w-[500px] text-sm leading-[1.85] text-[#667085]">
            Las reseñas verificadas, fotografías, horarios y datos actualizados
            del estudio se encuentran disponibles directamente en nuestra ficha
            de Google Maps.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center justify-center gap-4 bg-[#0f5da8] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Ver reseñas en Google
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center border border-black/10 bg-white px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#173b5d] transition-colors hover:border-[#0f5da8]"
            >
              Dejar una reseña
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              numero: "01",
              titulo: "Opiniones verificadas",
              texto: "Consulta comentarios publicados directamente por clientes en Google.",
            },
            {
              numero: "02",
              titulo: "Fotos y ubicación",
              texto: "Revisa imágenes del estudio y cómo llegar desde tu ubicación.",
            },
            {
              numero: "03",
              titulo: "Información actualizada",
              texto: "Accede a horarios, contacto y novedades de la ficha del negocio.",
            },
          ].map((item, index) => (
            <motion.a
              key={item.numero}
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                delay: index * 0.07,
                duration: 0.55,
                ease: easing,
              }}
              whileHover={{ y: -6 }}
              className="group relative min-h-[230px] overflow-hidden border border-black/10 bg-[#f8fafc] p-5"
            >
              <span className="text-[9px] tracking-[0.2em] text-[#0f5da8]">
                {item.numero}
              </span>

              <div className="mt-10 text-lg tracking-[0.12em] text-[#e4a622]">
                ★★★★★
              </div>

              <h4 className="mt-4 text-xl font-light tracking-[-0.02em] text-[#101828]">
                {item.titulo}
              </h4>

              <p className="mt-4 text-sm leading-[1.75] text-[#667085]">
                {item.texto}
              </p>

              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#0f5da8] transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Contacto() {
  const hoy = startOfDay(new Date());

  const [mesVisible, setMesVisible] = useState(
    new Date(hoy.getFullYear(), hoy.getMonth(), 1),
  );
  const [modalidad, setModalidad] = useState<Modalidad>("presencial");
  const [motivo, setMotivo] = useState<Motivo>("Diseño arquitectónico");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState("");
  const [datos, setDatos] = useState<DatosReserva>({
    nombre: "",
    email: "",
    telefono: "",
    comentario: "",
  });
  const [enviado, setEnviado] = useState(false);

  const diasCalendario = useMemo(
    () => buildCalendarDays(mesVisible),
    [mesVisible],
  );

  const mesLabel = new Intl.DateTimeFormat("es-CL", {
    month: "long",
    year: "numeric",
  }).format(mesVisible);

  const reservaCompleta = Boolean(
    fecha &&
      hora &&
      datos.nombre.trim() &&
      datos.telefono.trim(),
  );

  function actualizarDato(campo: keyof DatosReserva, valor: string) {
    setDatos((actual) => ({
      ...actual,
      [campo]: valor,
    }));

    if (enviado) {
      setEnviado(false);
    }
  }

  function seleccionarFecha(dia: Date) {
    const weekday = dia.getDay();
    const esFinDeSemana = weekday === 0 || weekday === 6;
    const esPasado = startOfDay(dia) < hoy;

    if (esFinDeSemana || esPasado) return;

    setFecha(dia);
    setHora("");
    setEnviado(false);
  }

  function enviarReserva(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!reservaCompleta) return;

    const mensaje = [
      "Hola, 3 Vértices.",
      "",
      "Quiero solicitar una reunión.",
      "",
      `Modalidad: ${
        modalidad === "presencial" ? "Presencial" : "Videollamada"
      }`,
      `Motivo: ${motivo}`,
      `Fecha solicitada: ${formatDate(fecha)}`,
      `Hora solicitada: ${hora}`,
      "",
      `Nombre: ${datos.nombre}`,
      datos.email ? `Correo: ${datos.email}` : "Correo: No indicado",
      `Teléfono: ${datos.telefono}`,
      datos.comentario
        ? `Comentario: ${datos.comentario}`
        : "Comentario: Sin observaciones",
      "",
      "Entiendo que la reunión queda sujeta a confirmación por WhatsApp.",
    ].join("\n");

    setEnviado(true);
    window.open(whatsappLink(mensaje), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_50%,#ffffff_100%)]"
    >
      <BlueprintBackground />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="relative border-b border-black/10 pb-12 lg:pb-16">
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: easing }}
            className="pointer-events-none absolute -right-4 -top-12 text-[9rem] font-light leading-none tracking-[-0.08em] text-[#142c46]/[0.04] sm:text-[13rem] lg:text-[18rem]"
          >
            06
          </motion.span>

          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#0f5da8]" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#0f5da8]">
                  Contacto y agenda
                </span>
              </div>

              <p className="mt-7 max-w-[430px] text-sm leading-[1.9] text-[#667085] sm:text-base">
                Agenda una conversación para revisar tu idea, resolver dudas y
                definir los próximos pasos.
              </p>
            </div>

            <h2 className="max-w-[960px] text-[2.75rem] font-light leading-[1.02] tracking-[-0.05em] text-[#101828] sm:text-[4rem] lg:text-[5rem] xl:text-[5.6rem]">
              Cada proyecto
              <span className="block text-[#173b5d]">
                comienza con una
              </span>
              <span className="block font-medium italic">conversación.</span>
            </h2>
          </div>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <ReviewsBlock />
        </Reveal>

        <div className="mt-16 border-t border-black/10 pt-14 lg:mt-24 lg:pt-20">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
                Agenda una reunión
              </span>

              <h3 className="mt-5 text-3xl font-light leading-[1.15] tracking-[-0.035em] text-[#101828] sm:text-4xl">
                Elige modalidad, fecha y horario.
              </h3>
            </div>

            <p className="max-w-[620px] text-sm leading-[1.85] text-[#667085] sm:text-base">
              Esta agenda funciona como solicitud. La fecha y la hora quedarán
              confirmadas cuando el estudio responda por WhatsApp.
            </p>
          </div>

          <form
            onSubmit={enviarReserva}
            className="grid gap-6 xl:grid-cols-[1.28fr_0.72fr]"
          >
            <div className="space-y-6">
              <div className="border border-black/10 bg-white/85 p-5 backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
                      Paso 01
                    </span>
                    <h4 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#101828]">
                      Modalidad
                    </h4>
                  </div>

                  <span className="text-[9px] tracking-[0.2em] text-[#0f5da8]">
                    01 / 04
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      id: "presencial" as const,
                      titulo: "Reunión presencial",
                      texto: "En nuestra oficina de Maipú 2125, Molina.",
                      icono: "⌂",
                    },
                    {
                      id: "videollamada" as const,
                      titulo: "Videollamada",
                      texto: "Reunión online mediante enlace coordinado.",
                      icono: "◉",
                    },
                  ].map((item) => {
                    const activo = modalidad === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setModalidad(item.id)}
                        whileHover={{ y: -4 }}
                        className={`relative min-h-[150px] overflow-hidden border p-5 text-left transition-all ${
                          activo
                            ? "border-[#0f5da8] bg-[#0f5da8] text-white"
                            : "border-black/10 bg-[#f9fbfd] text-[#344054]"
                        }`}
                      >
                        <span
                          className={`text-3xl ${
                            activo ? "text-white" : "text-[#0f5da8]"
                          }`}
                        >
                          {item.icono}
                        </span>

                        <h5 className="mt-5 text-xl font-light">
                          {item.titulo}
                        </h5>

                        <p
                          className={`mt-3 text-sm leading-[1.7] ${
                            activo ? "text-white/65" : "text-[#667085]"
                          }`}
                        >
                          {item.texto}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="border border-black/10 bg-white/85 p-5 backdrop-blur-sm sm:p-7">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setMesVisible(
                          new Date(
                            mesVisible.getFullYear(),
                            mesVisible.getMonth() - 1,
                            1,
                          ),
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center border border-black/10 text-[#173b5d] hover:bg-[#173b5d] hover:text-white"
                    >
                      ←
                    </button>

                    <div className="text-center">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
                        Paso 02
                      </span>
                      <h4 className="mt-2 capitalize text-xl font-light text-[#101828]">
                        {mesLabel}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setMesVisible(
                          new Date(
                            mesVisible.getFullYear(),
                            mesVisible.getMonth() + 1,
                            1,
                          ),
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center border border-black/10 text-[#173b5d] hover:bg-[#173b5d] hover:text-white"
                    >
                      →
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-7 gap-1">
                    {DIAS_SEMANA.map((dia, index) => (
                      <span
                        key={`${dia}-${index}`}
                        className="flex h-9 items-center justify-center text-[8px] uppercase tracking-[0.15em] text-[#98a2b3]"
                      >
                        {dia}
                      </span>
                    ))}

                    {diasCalendario.map((dia, index) => {
                      if (!dia) {
                        return <span key={`empty-${index}`} />;
                      }

                      const esPasado = startOfDay(dia) < hoy;
                      const esFinDeSemana =
                        dia.getDay() === 0 || dia.getDay() === 6;
                      const deshabilitado = esPasado || esFinDeSemana;
                      const activo = sameDate(fecha, dia);

                      return (
                        <motion.button
                          key={dia.toISOString()}
                          type="button"
                          disabled={deshabilitado}
                          onClick={() => seleccionarFecha(dia)}
                          whileHover={deshabilitado ? undefined : { scale: 1.06 }}
                          className={`relative flex aspect-square items-center justify-center border text-sm transition-all ${
                            activo
                              ? "border-[#0f5da8] bg-[#0f5da8] text-white shadow-[0_8px_24px_rgba(15,93,168,0.22)]"
                              : deshabilitado
                                ? "cursor-not-allowed border-transparent text-[#c5cbd3]"
                                : "border-black/5 bg-[#fbfcfd] text-[#344054] hover:border-[#0f5da8]"
                          }`}
                        >
                          {dia.getDate()}

                          {!deshabilitado && !activo && (
                            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#0f5da8]/35" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <p className="mt-5 text-[8px] uppercase leading-[1.7] tracking-[0.14em] text-[#98a2b3]">
                    Disponibilidad de lunes a viernes. La hora queda sujeta a
                    confirmación.
                  </p>

                  <p className="mt-3 text-[8px] uppercase leading-[1.7] tracking-[0.14em] text-[#0f5da8]">
                    Visitas técnicas: sábados de 10:00 a 14:00 hrs.
                  </p>
                </div>

                <div className="border border-black/10 bg-white/85 p-5 backdrop-blur-sm sm:p-7">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
                    Paso 03
                  </span>

                  <h4 className="mt-2 text-xl font-light text-[#101828]">
                    Horario
                  </h4>

                  <p className="mt-3 text-sm leading-[1.7] text-[#667085]">
                    {fecha
                      ? `Horarios para ${formatDate(fecha)}`
                      : "Selecciona primero una fecha disponible."}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {HORARIOS.map((item) => {
                      const activo = hora === item;

                      return (
                        <motion.button
                          key={item}
                          type="button"
                          disabled={!fecha}
                          onClick={() => setHora(item)}
                          whileHover={!fecha ? undefined : { y: -3 }}
                          className={`min-h-12 border text-[10px] font-medium tracking-[0.15em] transition-all ${
                            activo
                              ? "border-[#0f5da8] bg-[#0f5da8] text-white"
                              : fecha
                                ? "border-black/10 bg-[#fbfcfd] text-[#344054] hover:border-[#0f5da8]"
                                : "cursor-not-allowed border-black/5 text-[#c5cbd3]"
                          }`}
                        >
                          {item}
                        </motion.button>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <label className="text-[8px] uppercase tracking-[0.19em] text-[#98a2b3]">
                      Motivo
                    </label>

                    <select
                      value={motivo}
                      onChange={(event) =>
                        setMotivo(event.target.value as Motivo)
                      }
                      className="mt-3 w-full border-x-0 border-b border-t-0 border-black/15 bg-transparent px-0 py-3 text-sm text-[#101828] outline-none focus:border-[#0f5da8]"
                    >
                      {MOTIVOS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border border-black/10 bg-white/85 p-5 backdrop-blur-sm sm:p-7">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
                  Paso 04
                </span>

                <h4 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#101828]">
                  Tus datos
                </h4>

                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="reserva-nombre"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#667085]"
                    >
                      Nombre *
                    </label>
                    <input
                      id="reserva-nombre"
                      required
                      value={datos.nombre}
                      onChange={(event) =>
                        actualizarDato("nombre", event.target.value)
                      }
                      className="mt-3 w-full border-x-0 border-b border-t-0 border-black/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#0f5da8]"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reserva-telefono"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#667085]"
                    >
                      Teléfono *
                    </label>
                    <input
                      id="reserva-telefono"
                      type="tel"
                      required
                      value={datos.telefono}
                      onChange={(event) =>
                        actualizarDato("telefono", event.target.value)
                      }
                      className="mt-3 w-full border-x-0 border-b border-t-0 border-black/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#0f5da8]"
                      placeholder="+56 9"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reserva-email"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#667085]"
                    >
                      Correo
                    </label>
                    <input
                      id="reserva-email"
                      type="email"
                      value={datos.email}
                      onChange={(event) =>
                        actualizarDato("email", event.target.value)
                      }
                      className="mt-3 w-full border-x-0 border-b border-t-0 border-black/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#0f5da8]"
                      placeholder="correo@ejemplo.cl"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reserva-comentario"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#667085]"
                    >
                      Comentario
                    </label>
                    <input
                      id="reserva-comentario"
                      value={datos.comentario}
                      onChange={(event) =>
                        actualizarDato("comentario", event.target.value)
                      }
                      className="mt-3 w-full border-x-0 border-b border-t-0 border-black/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#0f5da8]"
                      placeholder="Cuéntanos brevemente qué necesitas"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Reveal delay={0.1}>
              <aside className="xl:sticky xl:top-28">
                <div className="overflow-hidden bg-[#173b5d] text-white shadow-[0_30px_90px_rgba(7,22,37,0.18)]">
                  <div
                    aria-hidden="true"
                    className="h-40 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                      backgroundSize: "42px 42px",
                    }}
                  />

                  <div className="p-6 sm:p-8">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                      Resumen de la reunión
                    </span>

                    <h4 className="mt-5 text-3xl font-light tracking-[-0.04em]">
                      Tu solicitud
                    </h4>

                    <dl className="mt-8 border-t border-white/15">
                      {[
                        [
                          "Modalidad",
                          modalidad === "presencial"
                            ? "Presencial"
                            : "Videollamada",
                        ],
                        ["Motivo", motivo],
                        ["Fecha", formatDate(fecha)],
                        ["Hora", hora || "Selecciona un horario"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-start justify-between gap-6 border-b border-white/15 py-4"
                        >
                          <dt className="text-[8px] uppercase tracking-[0.18em] text-white/40">
                            {label}
                          </dt>
                          <dd className="max-w-[220px] text-right text-sm text-white/80">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <button
                      type="submit"
                      disabled={!reservaCompleta}
                      className="group mt-8 flex min-h-14 w-full items-center justify-center gap-4 bg-white px-6 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#173b5d] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Solicitar reunión
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </button>

                    <p className="mt-5 text-center text-[8px] uppercase leading-[1.7] tracking-[0.14em] text-white/35">
                      La reunión queda agendada una vez confirmada por WhatsApp.
                    </p>

                    <AnimatePresence>
                      {enviado && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-5 border border-white/15 bg-white/5 p-4"
                        >
                          <p className="text-sm leading-[1.7] text-white/70">
                            La solicitud está lista. Se abrió WhatsApp para que
                            puedas enviarla.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </aside>
            </Reveal>
          </form>
        </div>

        <div className="mt-20 border-t border-black/10 pt-14 lg:mt-28 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-14">
            <Reveal>
              <div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
                  Nuestra oficina
                </span>

                <h3 className="mt-5 text-3xl font-light tracking-[-0.035em] text-[#101828] sm:text-4xl">
                  Visítanos en Molina.
                </h3>

                <div className="mt-8 border-t border-black/10">
                  {[
                    ["Dirección", DATOS_CONTACTO.ubicacion],
                    ["Teléfono", DATOS_CONTACTO.telefonoVisible],
                    ["Correo", DATOS_CONTACTO.email],
                    ["Horario", DATOS_CONTACTO.horario],
                    ["Visita técnica", DATOS_CONTACTO.visitaTecnica],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border-b border-black/10 py-4"
                    >
                      <span className="text-[8px] uppercase tracking-[0.18em] text-[#98a2b3]">
                        {label}
                      </span>
                      <p className="mt-2 text-sm leading-[1.7] text-[#344054]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappLink(
                    "Hola, 3 Vértices. Quiero realizar una consulta.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-13 items-center justify-center gap-4 bg-[#0f5da8] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Escribir por WhatsApp →
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden border border-black/10 bg-white">
                <div className="relative h-[460px] overflow-hidden bg-[#e9edf1]">
                  <iframe
                    title="Ubicación de 3 Vértices en Google Maps"
                    src={MAP_EMBED_URL}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0 grayscale-[18%] contrast-[0.96]"
                  />
                </div>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center justify-between border-t border-black/10 px-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#173b5d] transition-colors hover:bg-[#173b5d] hover:text-white sm:px-8"
                >
                  Abrir ficha completa en Google Maps
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <footer className="relative bg-[#0b1d2e] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/45">
                Estudio de arquitectura
              </span>

              <p className="mt-5 text-[3.5rem] font-light leading-none tracking-[-0.06em] text-white sm:text-[5rem] lg:text-[7.5rem]">
                3 Vértices
              </p>
            </div>

            <div className="lg:text-right">
              <p className="text-sm leading-[1.9] text-white/55">
                Arquitectura
                <br />
                Regularización
                <br />
                Permisos y tramitación
                <br />
                Impresión técnica
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-7 text-[8px] uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} 3 Vértices</p>
            <p>Región del Maule · Chile</p>
            <a href="#inicio" className="transition-colors hover:text-white">
              Volver arriba ↑
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contacto;