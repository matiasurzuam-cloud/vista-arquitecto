import { useState } from "react";
import { LinkButton, SectionTitle, waLink } from "./shared";

export function Contacto() {
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="mx-auto h-full max-w-6xl overflow-y-auto px-5 py-24 sm:px-8">
      <SectionTitle
        eyebrow="Contacto"
        title="Conversemos tu proyecto"
        lead="Respondemos consultas de diseño, regularización y permisología en la Región del Maule."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          <div>
            <label htmlFor="nombre" className="eyebrow">Nombre</label>
            <input id="nombre" required className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
          </div>
          <div>
            <label htmlFor="email" className="eyebrow">Email</label>
            <input id="email" type="email" required className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
          </div>
          <div>
            <label htmlFor="mensaje" className="eyebrow">Mensaje</label>
            <textarea id="mensaje" rows={5} required className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand" />
          </div>
          <button type="submit" className="bg-brand px-6 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-brand-soft">
            Enviar mensaje
          </button>
          {enviado ? (
            <p className="text-sm text-brand">Gracias, hemos recibido tu mensaje (demo sin envío real).</p>
          ) : null}
        </form>

        <div className="space-y-6">
          <div className="border-t border-border pt-5 text-sm text-muted-foreground">
            <p className="eyebrow">Oficina</p>
            <p className="mt-2 text-foreground">Región del Maule, Chile</p>
            <p className="mt-1">contacto@3vertices.cl</p>
            <p className="mt-1">+56 9 0000 0000</p>
            <p className="mt-1">Lunes a viernes · 09:00 – 18:00</p>
          </div>

          <LinkButton
            className="w-full"
            href={waLink("Hola 3 Vértices, quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribir por WhatsApp
          </LinkButton>

          <div className="flex h-56 items-center justify-center border border-border bg-surface">
            <p className="eyebrow">Mapa · Región del Maule (placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
