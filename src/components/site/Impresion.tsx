import { useMemo, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import impresion01 from "../../assets/impresion/impresion-01.jpg";
import impresion02 from "../../assets/impresion/impresion-02.jpg";
import impresion03 from "../../assets/impresion/impresion-03.jpg";

import { Reveal } from "./motion";

type TipoServicio = "planos" | "grafica";
type TipoPlano = "bond-bn" | "bond-color";
type Entrega = "retiro" | "domicilio";

type OpcionPrecio = {
  id: string;
  servicio: TipoServicio;
  formato: string;
  medida?: string;
  precio: number;
  tipo?: TipoPlano;
  nota?: string;
};

type ItemCarrito = {
  key: string;
  nombre: string;
  formato: string;
  detalle: string;
  precio: number;
  cantidad: number;
};

type PapelVolador = {
  id: number;
  x: number;
  y: number;
};

const WHATSAPP_NUMBER = "56934941180";

const PLANOS_BOND: OpcionPrecio[] = [
  { id: "a0-bn", servicio: "planos", formato: "A0", tipo: "bond-bn", precio: 3500 },
  { id: "a0-color", servicio: "planos", formato: "A0", tipo: "bond-color", precio: 4000 },
  { id: "a1-bn", servicio: "planos", formato: "A1", tipo: "bond-bn", precio: 1500 },
  { id: "a1-color", servicio: "planos", formato: "A1", tipo: "bond-color", precio: 2000 },
  { id: "a2-bn", servicio: "planos", formato: "A2", tipo: "bond-bn", precio: 1000 },
  { id: "a2-color", servicio: "planos", formato: "A2", tipo: "bond-color", precio: 1500 },
  { id: "a3-bn", servicio: "planos", formato: "A3", tipo: "bond-bn", precio: 500 },
  { id: "a3-color", servicio: "planos", formato: "A3", tipo: "bond-color", precio: 1000 },
  { id: "a4-bn", servicio: "planos", formato: "A4", tipo: "bond-bn", precio: 100 },
  { id: "a4-color", servicio: "planos", formato: "A4", tipo: "bond-color", precio: 200 },
];

const GRAFICA: OpcionPrecio[] = [
  { id: "5r", servicio: "grafica", formato: "5R", medida: "13 × 18 cm", precio: 300 },
  { id: "carta", servicio: "grafica", formato: "Carta", medida: "22 × 28 cm", precio: 500 },
  { id: "a4-grafica", servicio: "grafica", formato: "A4", medida: "21 × 30 cm", precio: 500 },
  { id: "a3-grafica", servicio: "grafica", formato: "A3", medida: "30 × 42 cm", precio: 1500 },
  { id: "a3plus", servicio: "grafica", formato: "A3+", medida: "33 × 48 cm", precio: 2000 },
  { id: "a2-matte", servicio: "grafica", formato: "A2", medida: "42 × 60 cm", precio: 4000, nota: "Solo Matte" },
  { id: "a1-matte", servicio: "grafica", formato: "A1", medida: "60 × 84 cm", precio: 6000, nota: "Solo Matte" },
  { id: "a0-matte", servicio: "grafica", formato: "A0", medida: "90 × 120 cm", precio: 12000, nota: "Solo Matte" },
];

const easing = [0.22, 1, 0.36, 1] as const;
const clp = (valor: number) => `$${valor.toLocaleString("es-CL")}`;

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Precio que se anima cada vez que cambia, como un contador de impresora. */
function PriceCounter({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`relative inline-grid overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3, ease: easing }}
          className="col-start-1 row-start-1"
        >
          {clp(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Separador perforado, como el borde de una hoja recién cortada de la impresora. */
function PerforatedDivider() {
  return (
    <div aria-hidden="true" className="relative h-px w-full bg-black/10">
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-[2px]">
        {Array.from({ length: 48 }).map((_, index) => (
          <span
            key={index}
            className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#f4f8fc] ring-1 ring-black/10"
          />
        ))}
      </div>
    </div>
  );
}

function BlueprintBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.42) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 520 340"
        fill="none"
        className="pointer-events-none absolute -left-12 top-[8%] hidden h-[330px] w-[500px] opacity-[0.15] lg:block"
      >
        <motion.path
          d="M24 300H495M72 300V124L190 58L310 124V300M310 170H470V300M120 300V205H205V300M345 300V220H425V300M190 58V22M163 22H217"
          stroke="#0F5DA8"
          strokeWidth="1.1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.6, ease: easing }}
        />
      </motion.svg>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[14%] hidden h-2 w-2 rounded-full bg-[#55b8ff]/60 lg:block"
        animate={{ y: [0, 14, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function ServiceCard({
  item,
  index,
  activo,
  onSelect,
}: {
  item: { id: TipoServicio; numero: string; titulo: string; descripcion: string; imagen: string };
  index: number;
  activo: boolean;
  onSelect: (servicio: TipoServicio) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const rotateX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(85,184,255,0.32), transparent 65%)`;

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 8);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect(item.id)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileTap={{ scale: 0.985 }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: easing }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative min-h-[360px] overflow-hidden rounded-sm border text-left transition-colors duration-500 ${
        activo
          ? "border-[#0f5da8] shadow-[0_28px_80px_rgba(15,93,168,0.22)]"
          : "border-black/10 hover:border-[#0f5da8]/40"
      }`}
    >
      <img
        src={item.imagen}
        alt={item.titulo}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061523]/92 via-[#061523]/18 to-[#061523]/30" />
      <motion.div
        aria-hidden="true"
        style={{ background: glowBackground }}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {activo && (
        <motion.span
          layoutId="servicio-activo-borde"
          className="pointer-events-none absolute inset-0 border-2 border-[#55b8ff]"
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
      )}

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.22em] text-white/75">{item.numero}</span>
        <motion.span
          animate={activo ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, ease: easing }}
          className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${
            activo ? "border-[#55b8ff] bg-[#55b8ff] text-[#071625]" : "border-white/30 text-white"
          }`}
        >
          {activo ? "✓" : "+"}
        </motion.span>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[8px] uppercase tracking-[0.2em] text-white/55">Servicio</span>
        <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-white sm:text-4xl">
          {item.titulo}
        </h3>
        <p className="mt-4 text-sm text-white/65">{item.descripcion}</p>
      </div>
    </motion.button>
  );
}

function ServiceSelector({
  servicio,
  onChange,
}: {
  servicio: TipoServicio;
  onChange: (servicio: TipoServicio) => void;
}) {
  const servicios = [
    {
      id: "planos" as const,
      numero: "01",
      titulo: "Impresión de planos",
      descripcion: "Papel Bond 80 g · Blanco y negro o color",
      imagen: impresion02,
    },
    {
      id: "grafica" as const,
      numero: "02",
      titulo: "Impresión gráfica",
      descripcion: "Fotográfico 260 g · Matte 200 g",
      imagen: impresion03,
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {servicios.map((item, index) => (
        <ServiceCard
          key={item.id}
          item={item}
          index={index}
          activo={servicio === item.id}
          onSelect={onChange}
        />
      ))}
    </div>
  );
}

function SizeCard({
  opcion,
  index,
  activo,
  onSelect,
}: {
  opcion: OpcionPrecio;
  index: number;
  activo: boolean;
  onSelect: (opcion: OpcionPrecio) => void;
}) {
  const sizes: Record<string, string> = {
    "5R": "h-16 w-12",
    Carta: "h-20 w-14",
    A4: "h-20 w-14",
    A3: "h-24 w-[4.3rem]",
    "A3+": "h-28 w-20",
    A2: "h-32 w-[5.7rem]",
    A1: "h-36 w-[6.4rem]",
    A0: "h-40 w-28",
  };

  const ref = useRef<HTMLButtonElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(15,93,168,0.18), transparent 70%)`;

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(((event.clientX - rect.left) / rect.width) * 100);
    glowY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelect(opcion)}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: easing }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative min-h-[230px] overflow-hidden rounded-sm border p-5 text-left transition-colors duration-300 ${
        activo
          ? "border-[#0f5da8] bg-[#0f5da8] text-white shadow-[0_20px_55px_rgba(15,93,168,0.25)]"
          : "border-black/10 bg-white/80 hover:border-[#0f5da8]/45"
      }`}
    >
      {!activo && (
        <motion.div
          aria-hidden="true"
          style={{ background: glowBackground }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {/* esquina doblada, como una hoja recién salida de la impresora */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[16px] border-t-[16px] border-l-transparent transition-all duration-300 group-hover:h-7 group-hover:w-7 ${
          activo ? "border-t-white/40" : "border-t-[#0f5da8]/25"
        }`}
      />

      <div className="relative flex min-h-[120px] items-end justify-center">
        <motion.span
          animate={activo ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className={`${sizes[opcion.formato] ?? "h-24 w-16"} block border ${
            activo ? "border-white/40 bg-white/10" : "border-[#0f5da8]/20 bg-[#f7fbff]"
          }`}
        />
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-4">
        <div>
          <span
            className={`text-[8px] uppercase tracking-[0.18em] ${
              activo ? "text-white/50" : "text-[#98a2b3]"
            }`}
          >
            {opcion.medida ?? (opcion.tipo === "bond-bn" ? "Blanco y negro" : "Color")}
          </span>
          <h4 className="mt-2 text-2xl font-light tracking-[-0.03em]">{opcion.formato}</h4>
          {opcion.nota && (
            <span
              className={`mt-1 block text-[8px] uppercase tracking-[0.16em] ${
                activo ? "text-white/55" : "text-[#0f5da8]"
              }`}
            >
              {opcion.nota}
            </span>
          )}
        </div>
        <span className="text-sm font-medium">{clp(opcion.precio)}</span>
      </div>
    </motion.button>
  );
}

function PaperSizeSelector({
  opciones,
  seleccion,
  onSelect,
}: {
  opciones: OpcionPrecio[];
  seleccion: OpcionPrecio | null;
  onSelect: (opcion: OpcionPrecio) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {opciones.map((opcion, index) => (
        <SizeCard
          key={opcion.id}
          opcion={opcion}
          index={index}
          activo={seleccion?.id === opcion.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

/** Control segmentado con una píldora que se desliza al cambiar de opción. */
function SegmentedControl<T extends string>({
  layoutId,
  value,
  options,
  onChange,
}: {
  layoutId: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div
      className="relative grid gap-1 rounded-sm border border-black/10 bg-white/70 p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const activo = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative min-h-12 px-3 text-[9px] font-medium uppercase tracking-[0.17em] transition-colors duration-300 ${
              activo ? "text-white" : "text-[#667085] hover:text-[#0f5da8]"
            }`}
          >
            {activo && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-0 bg-[#0f5da8]"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Impresion() {
  const [servicio, setServicio] = useState<TipoServicio>("planos");
  const [tipoPlano, setTipoPlano] = useState<TipoPlano>("bond-bn");
  const [seleccion, setSeleccion] = useState<OpcionPrecio | null>(
    PLANOS_BOND.find((opcion) => opcion.id === "a4-bn") ?? null,
  );
  const [cantidad, setCantidad] = useState(1);
  const [entrega, setEntrega] = useState<Entrega>("retiro");
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [papelesVolando, setPapelesVolando] = useState<PapelVolador[]>([]);

  const botonAgregarRef = useRef<HTMLButtonElement>(null);
  const idPapelRef = useRef(0);

  const opcionesVisibles = useMemo(() => {
    if (servicio === "grafica") return GRAFICA;
    return PLANOS_BOND.filter((opcion) => opcion.tipo === tipoPlano);
  }, [servicio, tipoPlano]);

  const totalSeleccion = (seleccion?.precio ?? 0) * cantidad;

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acumulado, item) => acumulado + item.precio * item.cantidad,
        0,
      ),
    [items],
  );

  const cantidadTotal = useMemo(
    () => items.reduce((acumulado, item) => acumulado + item.cantidad, 0),
    [items],
  );

  function cambiarServicio(nuevo: TipoServicio) {
    setServicio(nuevo);
    setCantidad(1);

    if (nuevo === "planos") {
      setTipoPlano("bond-bn");
      setSeleccion(
        PLANOS_BOND.find((opcion) => opcion.id === "a4-bn") ?? null,
      );
    } else {
      setSeleccion(GRAFICA[0]);
    }
  }

  function cambiarTipoPlano(nuevo: TipoPlano) {
    setTipoPlano(nuevo);

    const formatoActual = seleccion?.formato ?? "A4";
    const nuevaSeleccion =
      PLANOS_BOND.find(
        (opcion) => opcion.tipo === nuevo && opcion.formato === formatoActual,
      ) ?? PLANOS_BOND.find((opcion) => opcion.tipo === nuevo);

    setSeleccion(nuevaSeleccion ?? null);
  }

  function agregarAlCarrito() {
    if (!seleccion) return;

    const detalle =
      servicio === "planos"
        ? `${
            seleccion.tipo === "bond-bn" ? "Blanco y negro" : "Color"
          } · Papel Bond 80 g`
        : `${seleccion.medida ?? ""}${
            seleccion.nota ? ` · ${seleccion.nota}` : ""
          }`;

    const nombre =
      servicio === "planos"
        ? "Impresión de plano"
        : "Impresión fotográfica / Matte";

    const key = seleccion.id;

    setItems((actuales) => {
      const existente = actuales.find((item) => item.key === key);

      if (existente) {
        return actuales.map((item) =>
          item.key === key
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }

      return [
        ...actuales,
        {
          key,
          nombre,
          formato: seleccion.formato,
          detalle,
          precio: seleccion.precio,
          cantidad,
        },
      ];
    });

    // pequeña hoja que "sale" del botón y vuela hacia el carrito
    const rect = botonAgregarRef.current?.getBoundingClientRect();
    if (rect) {
      const id = idPapelRef.current++;
      setPapelesVolando((actuales) => [
        ...actuales,
        { id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      ]);
    }

    window.setTimeout(() => setCarritoAbierto(true), 480);
  }

  function cambiarCantidadItem(key: string, diferencia: number) {
    setItems((actuales) =>
      actuales
        .map((item) =>
          item.key === key
            ? { ...item, cantidad: item.cantidad + diferencia }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  const mensajeWhatsApp = [
    "Hola, quiero solicitar una impresión.",
    "",
    ...items.map(
      (item) =>
        `${item.cantidad} x ${item.nombre} · ${item.formato} · ${
          item.detalle
        } — ${clp(item.precio * item.cantidad)}`,
    ),
    "",
    `Entrega: ${
      entrega === "retiro"
        ? "Retiro en oficina"
        : "Reparto a domicilio en Molina"
    }.`,
    `Total referencial: ${clp(subtotal)}.`,
    "",
    "Quiero enviar los archivos para confirmar medidas, calidad y plazo.",
  ].join("\n");

  return (
    <section
      id="impresion"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_48%,#ffffff_100%)]"
    >
      <BlueprintBackground />

      {/* hojas que vuelan del botón "Agregar" hacia el carrito */}
      <AnimatePresence>
        {papelesVolando.map((papel) => (
          <motion.div
            key={papel.id}
            aria-hidden="true"
            initial={{ x: papel.x, y: papel.y, scale: 1, opacity: 1, rotate: 0 }}
            animate={{
              x: typeof window !== "undefined" ? window.innerWidth - 56 : papel.x,
              y: typeof window !== "undefined" ? window.innerHeight - 56 : papel.y,
              scale: 0.25,
              opacity: 0,
              rotate: 200,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            onAnimationComplete={() =>
              setPapelesVolando((actuales) => actuales.filter((p) => p.id !== papel.id))
            }
            className="pointer-events-none fixed left-0 top-0 z-[95] h-8 w-6 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-[#0f5da8]/40 bg-white shadow-[0_8px_24px_rgba(15,93,168,0.3)]"
          />
        ))}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid items-center gap-10 border-b border-black/10 pb-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pb-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#0f5da8]" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#0f5da8]">
                Servicio de impresión
              </span>
              <motion.span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#0f5da8]"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <h2 className="mt-7 max-w-[760px] text-[2.8rem] font-light leading-[1.02] tracking-[-0.05em] text-[#101828] sm:text-[4.3rem] lg:text-[5.4rem]">
              Planos que salen
              <span className="block text-[#173b5d]">
                del archivo y llegan
              </span>
              <span className="block font-medium italic">
                listos para presentar.
              </span>
            </h2>

            <p className="mt-7 max-w-[540px] text-sm leading-[1.9] text-[#667085] sm:text-base">
              Impresión técnica y gráfica con revisión previa del archivo,
              selección de formato y solicitud directa por WhatsApp.
            </p>
          </div>

          <div className="relative min-h-[520px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: easing }}
              className="absolute left-0 top-0 h-[82%] w-[76%] overflow-hidden rounded-sm shadow-[0_28px_90px_rgba(15,41,66,0.16)]"
            >
              <img
                src={impresion01}
                alt="Servicio de impresión de planos"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061523]/50 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easing }}
              className="absolute bottom-0 right-0 h-[56%] w-[48%] overflow-hidden rounded-sm border-[5px] border-white shadow-[0_24px_70px_rgba(15,41,66,0.18)]"
            >
              <img
                src={impresion03}
                alt="Lámina de impresión gráfica"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <div className="mb-9">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
              01 · Elige el servicio
            </span>
            <h3 className="mt-4 text-3xl font-light tracking-[-0.035em] text-[#101828] sm:text-4xl">
              ¿Qué necesitas imprimir?
            </h3>
          </div>

          <ServiceSelector servicio={servicio} onChange={cambiarServicio} />
        </div>

        <div className="mt-16 lg:mt-24">
          <PerforatedDivider />
        </div>

        <div className="pt-14 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr] lg:gap-14">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#0f5da8]">
                  02 · Configura
                </span>

                <h3 className="mt-5 max-w-[460px] text-3xl font-light leading-[1.15] tracking-[-0.035em] text-[#101828] sm:text-4xl">
                  Elige el formato de manera visual.
                </h3>

                {servicio === "planos" && (
                  <div className="mt-8">
                    <SegmentedControl
                      layoutId="tipo-plano-indicador"
                      value={tipoPlano}
                      onChange={cambiarTipoPlano}
                      options={[
                        { value: "bond-bn", label: "Blanco y negro" },
                        { value: "bond-color", label: "Color" },
                      ]}
                    />
                  </div>
                )}
              </div>
            </Reveal>

            <div>
              <PaperSizeSelector
                opciones={opcionesVisibles}
                seleccion={seleccion}
                onSelect={setSeleccion}
              />

              <motion.div
                layout
                className="mt-8 grid gap-5 rounded-sm border border-black/10 bg-white/90 p-6 shadow-[0_22px_65px_rgba(15,41,66,0.08)] sm:grid-cols-[1fr_auto] sm:items-end sm:p-8"
              >
                <div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3]">
                    Selección actual
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={seleccion ? `${seleccion.id}-${tipoPlano}` : "vacio"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: easing }}
                      className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#173b5d]"
                    >
                      {seleccion
                        ? `${seleccion.formato} · ${
                            servicio === "planos"
                              ? tipoPlano === "bond-bn"
                                ? "Blanco y negro"
                                : "Color"
                              : seleccion.medida
                          }`
                        : "Selecciona un formato"}
                    </motion.h4>
                  </AnimatePresence>

                  <div className="mt-6 flex items-center gap-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() =>
                        setCantidad((valor) => Math.max(1, valor - 1))
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-sm border border-black/10 transition-colors hover:border-[#0f5da8]/50 hover:text-[#0f5da8]"
                    >
                      −
                    </motion.button>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={cantidad}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2, ease: easing }}
                        className="w-4 text-center tabular-nums"
                      >
                        {cantidad}
                      </motion.span>
                    </AnimatePresence>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setCantidad((valor) => valor + 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-sm border border-black/10 transition-colors hover:border-[#0f5da8]/50 hover:text-[#0f5da8]"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[8px] uppercase tracking-[0.18em] text-[#98a2b3]">
                    Total referencial
                  </span>
                  <p className="mt-2 text-3xl font-light tracking-[-0.035em] text-[#173b5d]">
                    {seleccion ? <PriceCounter value={totalSeleccion} /> : "—"}
                  </p>

                  <motion.button
                    ref={botonAgregarRef}
                    type="button"
                    onClick={agregarAlCarrito}
                    disabled={!seleccion}
                    whileHover={seleccion ? { scale: 1.03 } : undefined}
                    whileTap={seleccion ? { scale: 0.96 } : undefined}
                    className="mt-5 inline-flex min-h-13 items-center justify-center gap-4 rounded-sm bg-[#0f5da8] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-opacity disabled:opacity-40"
                  >
                    Agregar al pedido +
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {cantidadTotal > 0 && !carritoAbierto && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCarritoAbierto(true)}
            className="fixed bottom-6 right-6 z-[75] flex min-h-16 items-center gap-5 rounded-sm bg-[#173b5d] px-6 text-white shadow-[0_24px_70px_rgba(7,22,37,0.3)]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={cantidadTotal}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
              >
                {cantidadTotal} {cantidadTotal === 1 ? "producto" : "productos"}
              </motion.span>
            </AnimatePresence>
            <PriceCounter value={subtotal} />
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: easing }}
            >
              →
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {carritoAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex justify-end bg-[#061523]/55 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Cerrar carrito"
              onClick={() => setCarritoAbierto(false)}
              className="absolute inset-0"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: easing }}
              className="relative z-10 flex h-full w-full max-w-[620px] flex-col bg-[#f8f9fa]"
            >
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                <h2 className="text-2xl font-light text-[#101828]">
                  Tu pedido
                </h2>
                <motion.button
                  type="button"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.25, ease: easing }}
                  onClick={() => setCarritoAbierto(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-black/10"
                >
                  ×
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-7">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-[#98a2b3]">
                    <span className="text-3xl">🗂️</span>
                    <p>
                      Tu pedido está vacío.
                      <br />
                      Elige un formato y agrégalo aquí.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.article
                        key={item.key}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: 40,
                          height: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          marginTop: 0,
                        }}
                        transition={{ duration: 0.35, ease: easing }}
                        className="overflow-hidden border-b border-black/10 py-6"
                      >
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-light">{item.nombre}</h3>
                            <p className="mt-2 text-sm text-[#667085]">
                              {item.formato} · {item.detalle}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setItems((actuales) =>
                                actuales.filter(
                                  (actual) => actual.key !== item.key,
                                ),
                              )
                            }
                            className="h-fit text-xs text-[#98a2b3] underline-offset-2 transition-colors hover:text-[#0f5da8] hover:underline"
                          >
                            Quitar
                          </button>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center rounded-sm border border-black/10">
                            <button
                              type="button"
                              onClick={() => cambiarCantidadItem(item.key, -1)}
                              className="h-10 w-10 transition-colors hover:text-[#0f5da8]"
                            >
                              −
                            </button>
                            <span className="px-4 tabular-nums">{item.cantidad}</span>
                            <button
                              type="button"
                              onClick={() => cambiarCantidadItem(item.key, 1)}
                              className="h-10 w-10 transition-colors hover:text-[#0f5da8]"
                            >
                              +
                            </button>
                          </div>
                          <PriceCounter
                            value={item.precio * item.cantidad}
                            className="font-medium"
                          />
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              <div className="border-t border-black/10 bg-white px-6 py-6">
                <div className="flex items-center justify-between">
                  <span>Total referencial</span>
                  <span className="text-2xl font-light text-[#173b5d]">
                    <PriceCounter value={subtotal} />
                  </span>
                </div>

                <div className="mt-4">
                  <SegmentedControl
                    layoutId="entrega-indicador"
                    value={entrega}
                    onChange={setEntrega}
                    options={[
                      { value: "retiro", label: "Retiro" },
                      { value: "domicilio", label: "Domicilio" },
                    ]}
                  />
                </div>

                <a
                  href={whatsappLink(mensajeWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-6 flex min-h-14 w-full items-center justify-center gap-4 overflow-hidden rounded-sm bg-[#0f5da8] px-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.01]"
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: "-120%" }}
                    whileHover={{ x: "120%" }}
                    transition={{ duration: 0.6, ease: easing }}
                  />
                  <span className="relative">Enviar pedido por WhatsApp</span>
                  <motion.span
                    aria-hidden="true"
                    className="relative"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: easing }}
                  >
                    →
                  </motion.span>
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Impresion;
