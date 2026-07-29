import { useMemo, useState } from "react";
import { ActionButton, LinkButton, SectionTitle, waLink } from "./shared";
import { LiftCard, Reveal } from "./motion";

type Producto = {
  id: string;
  nombre: string;
  detalle: string;
  tamanos: { label: string; precio: number }[];
};

const PRODUCTOS: Producto[] = [
  {
    id: "plotter",
    nombre: "Plotter de planos",
    detalle: "Hasta A0 · ancho 90 cm · largo máximo 2 m. Papel bond 90 g.",
    tamanos: [
      { label: "A2", precio: 2500 },
      { label: "A1", precio: 3900 },
      { label: "A0", precio: 5900 },
    ],
  },
  {
    id: "foto",
    nombre: "Impresión fotográfica profesional",
    detalle: "A4 a A0. Formato A2 disponible solo en terminación mate.",
    tamanos: [
      { label: "A4", precio: 4900 },
      { label: "A3", precio: 7900 },
      { label: "A2 (mate)", precio: 12900 },
      { label: "A0", precio: 24900 },
    ],
  },
];

type Item = { key: string; nombre: string; tamano: string; precio: number; cantidad: number };

const clp = (n: number) => `$${n.toLocaleString("es-CL")}`;

export function Impresion() {
  const [seleccion, setSeleccion] = useState<Record<string, string>>({
    plotter: "A2",
    foto: "A4",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [entrega, setEntrega] = useState<"retiro" | "envio">("retiro");
  const [pago, setPago] = useState<"inicio" | "compromiso" | "aprobacion">("inicio");

  const subtotal = useMemo(
    () => items.reduce((a, i) => a + i.precio * i.cantidad, 0),
    [items],
  );
  const envio = entrega === "envio" ? 4990 : 0;
  const total = subtotal + envio;

  function agregar(p: Producto) {
    const tamano = seleccion[p.id];
    const precio = p.tamanos.find((t) => t.label === tamano)!.precio;
    const key = `${p.id}-${tamano}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, cantidad: i.cantidad + 1 } : i));
      return [...prev, { key, nombre: p.nombre, tamano, precio, cantidad: 1 }];
    });
  }

  const resumen = items
    .map((i) => `${i.cantidad}× ${i.nombre} ${i.tamano}`)
    .join(", ");

  return (
    <div className="mx-auto h-full max-w-6xl overflow-y-auto px-5 py-24 sm:px-8">
      <SectionTitle
        eyebrow="Impresión"
        title="Servicio de impresión"
        lead="Plotter de planos e impresión fotográfica profesional. Retiro en oficina o envío por Blue Express."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {PRODUCTOS.map((p) => (
            <LiftCard key={p.id} className="bg-surface p-6">
              <h3 className="text-lg">{p.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.detalle}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tamanos.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setSeleccion((s) => ({ ...s, [p.id]: t.label }))}
                    className={`border px-3 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                      seleccion[p.id] === t.label
                        ? "border-brand bg-brand text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-brand hover:text-brand"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-sm">
                {clp(p.tamanos.find((t) => t.label === seleccion[p.id])!.precio)}{" "}
                <span className="text-muted-foreground">por unidad</span>
              </p>
              <ActionButton className="mt-4" onClick={() => agregar(p)}>
                Agregar al carrito
              </ActionButton>
            </LiftCard>
          ))}
        </div>

        <Reveal className="border border-border p-6">
          <p className="eyebrow">Carrito</p>
          {items.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Aún no has agregado productos.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {items.map((i) => (
                <li key={i.key} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span>
                    {i.nombre} · {i.tamano}
                    <span className="block text-xs text-muted-foreground">
                      {i.cantidad} × {clp(i.precio)}
                    </span>
                  </span>
                  <button
                    onClick={() => setItems((prev) => prev.filter((x) => x.key !== i.key))}
                    className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-brand"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 border-t border-border pt-5">
            <p className="eyebrow">Entrega</p>
            <div className="mt-3 flex gap-2">
              {(["retiro", "envio"] as const).map((e) => (
                <button
                  key={e}
                  onClick={() => setEntrega(e)}
                  className={`border px-3 py-2 text-xs uppercase tracking-[0.12em] ${
                    entrega === e
                      ? "border-brand bg-brand text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-brand"
                  }`}
                >
                  {e === "retiro" ? "Retiro en oficina" : "Envío Blue Express"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="eyebrow">Estado de pago en cuotas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["inicio", "compromiso", "aprobacion"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPago(p)}
                  className={`border px-3 py-2 text-xs uppercase tracking-[0.12em] ${
                    pago === p
                      ? "border-brand bg-brand text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-brand"
                  }`}
                >
                  {p === "inicio" ? "Inicio" : p === "compromiso" ? "Compromiso" : "Aprobación"}
                </button>
              ))}
            </div>
          </div>

          <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{clp(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Envío</dt><dd>{clp(envio)}</dd></div>
            <div className="flex justify-between text-brand"><dt>Total</dt><dd className="emphasis">{clp(total)}</dd></div>
          </dl>

          <LinkButton
            className="mt-6 w-full"
            href={waLink(
              `Hola, quiero cotizar impresión: ${resumen || "(sin productos)"} · Entrega: ${
                entrega === "retiro" ? "retiro en oficina" : "envío Blue Express"
              } · Total referencial ${clp(total)}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar pedido por WhatsApp
          </LinkButton>
        </Reveal>
      </div>
    </div>
  );
}
