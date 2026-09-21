import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;

/** Rectángulo cerrado, usado para dibujar muros con espesor. */
const muro = (x: number, y: number, w: number, h: number) => `M${x} ${y}h${w}v${h}h${-w}Z`;

const MUROS_EXTERIORES = "M60 80H500V330H60Z M66 86H494V324H66Z";

const MUROS_INTERIORES = [
  muro(247, 86, 6, 147),
  muro(66, 227, 54, 6),
  muro(155, 227, 95, 6),
  muro(377, 86, 6, 44),
  muro(377, 165, 6, 159),
  muro(383, 197, 42, 6),
  muro(460, 197, 34, 6),
  muro(167, 233, 6, 91),
].join(" ");

const PUERTAS = [
  "M155 230V195 M120 230A35 35 0 0 1 155 195",
  "M380 165H345 M380 130A35 35 0 0 0 345 165",
  "M460 200V165 M425 200A35 35 0 0 1 460 165",
  "M270 324V289 M305 324A35 35 0 0 0 270 289 M270 324V330 M305 324V330",
].join(" ");

const VENTANAS = [
  [95, 80, 60, 6],
  [285, 80, 60, 6],
  [415, 80, 50, 6],
  [494, 240, 6, 60],
  [60, 110, 6, 60],
  [60, 262, 6, 40],
  [90, 324, 50, 6],
  [420, 324, 60, 6],
]
  .map(([x, y, w, h]) =>
    w > h ? `${muro(x, y, w, h)} M${x} ${y + 3}h${w}` : `${muro(x, y, w, h)} M${x + 3} ${y}v${h}`,
  )
  .join(" ");

const ESCALERA = Array.from({ length: 9 }, (_, i) => `M180 ${248 + i * 8}H240`).join(" ");

const MOBILIARIO = [
  // Cocina
  muro(72, 92, 168, 16),
  muro(72, 108, 16, 82),
  muro(130, 150, 70, 26),
  "M105 96h16v8h-16Z",
  // Living y comedor
  muro(270, 104, 82, 26),
  "M270 112h82",
  muro(292, 146, 38, 20),
  muro(305, 205, 56, 34),
  "M312 199h10v6h-10Z M340 199h10v6h-10Z M312 239h10v6h-10Z M340 239h10v6h-10Z",
  // Dormitorio principal
  muro(415, 100, 70, 72),
  muro(421, 104, 26, 12),
  muro(453, 104, 26, 12),
  "M415 132h70",
  // Dormitorio secundario
  muro(390, 210, 96, 14),
  muro(415, 262, 60, 48),
  muro(421, 266, 22, 10),
  muro(447, 266, 22, 10),
  // Baño
  muro(72, 240, 90, 30),
  "M78 246h78v18h-78Z",
  "M140 292h14v10h-14Z M147 302a9 7 0 1 0 .01 0Z",
  "M96 300a8 8 0 1 0 .01 0Z",
  // Escalera
  muro(180, 240, 60, 76),
  ESCALERA,
].join(" ");

const COTAS = [
  // Superior
  "M60 48H500 M60 42V76 M250 42V76 M380 42V76 M500 42V76",
  "M56 52l8-8 M246 52l8-8 M376 52l8-8 M496 52l8-8",
  // Inferior
  "M60 356H500 M60 334V362 M250 334V362 M380 334V362 M500 334V362",
  "M56 360l8-8 M246 360l8-8 M376 360l8-8 M496 360l8-8",
  // Lateral
  "M534 80V330 M504 80H540 M504 330H540",
  "M530 84l8-8 M530 334l8-8",
].join(" ");

const EJES = [60, 250, 380, 500];

const ETIQUETAS: { x: number; y: number; texto: string; anchor?: "middle" }[] = [
  { x: 76, y: 219, texto: "COCINA" },
  { x: 268, y: 184, texto: "LIVING" },
  { x: 418, y: 190, texto: "DORMITORIO" },
  { x: 76, y: 286, texto: "BAÑO" },
];

const COTAS_TEXTO = [
  { x: 155, y: 44, texto: "4.75" },
  { x: 315, y: 44, texto: "3.25" },
  { x: 440, y: 44, texto: "3.00" },
  { x: 280, y: 352, texto: "11.00" },
];

/** Plano de planta de una vivienda dibujado con líneas: muros, puertas, ventanas, mobiliario, cotas y ejes. */
export function PlanoVivienda({ className }: { className: string }) {
  const trazo = (delay: number, duration = 2.4) => ({
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration, delay, ease: easing },
  });

  const aparece = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1.2, delay, ease: easing },
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 560 380"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      className={className}
    >
      <motion.g {...aparece(0.1)} strokeWidth="0.6" strokeDasharray="10 3 2 3">
        {EJES.map((x) => (
          <path key={x} d={`M${x} 26V366`} />
        ))}
      </motion.g>

      <motion.g
        {...aparece(0.4)}
        stroke="none"
        fill="currentColor"
        fontSize="8"
        textAnchor="middle"
      >
        {EJES.map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <text x={x} y="19">
              {i + 1}
            </text>
          </g>
        ))}
      </motion.g>

      <motion.path d={MUROS_EXTERIORES} strokeWidth="1.3" {...trazo(0)} />
      <motion.path d={MUROS_INTERIORES} strokeWidth="1.1" {...trazo(0.5)} />
      <motion.path d={VENTANAS} strokeWidth="0.9" {...trazo(1.1, 1.6)} />
      <motion.path d={PUERTAS} strokeWidth="0.8" {...trazo(1.3, 1.6)} />
      <motion.path d={MOBILIARIO} strokeWidth="0.7" {...trazo(1.6, 2.6)} />
      <motion.path d={COTAS} strokeWidth="0.6" {...trazo(1.9, 1.8)} />

      <motion.g
        {...aparece(2.4)}
        stroke="none"
        fill="currentColor"
        fontSize="7"
        letterSpacing="1.2"
      >
        {ETIQUETAS.map((e) => (
          <text key={e.texto} x={e.x} y={e.y}>
            {e.texto}
          </text>
        ))}
      </motion.g>

      <motion.g
        {...aparece(2.4)}
        stroke="none"
        fill="currentColor"
        fontSize="8"
        textAnchor="middle"
      >
        {COTAS_TEXTO.map((c) => (
          <text key={c.texto} x={c.x} y={c.y}>
            {c.texto}
          </text>
        ))}
        <text transform="translate(547 210) rotate(-90)">6.25</text>
      </motion.g>
    </svg>
  );
}
