export const WHATSAPP_NUMBER = "56934941180";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-3xl leading-[1.05] sm:text-5xl">{title}</h1>
      {lead ? (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {lead}
        </p>
      ) : null}
    </header>
  );
}

type ButtonProps = React.ComponentProps<"a"> & { tone?: "solid" | "outline" };

export function LinkButton({ tone = "solid", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors";
  const styles =
    tone === "solid"
      ? "bg-brand text-primary-foreground hover:bg-brand-soft"
      : "border border-brand text-brand hover:bg-brand hover:text-primary-foreground";
  return <a className={`${base} ${styles} ${className}`} {...props} />;
}

export function ActionButton({
  tone = "solid",
  className = "",
  ...props
}: React.ComponentProps<"button"> & { tone?: "solid" | "outline" }) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors";
  const styles =
    tone === "solid"
      ? "bg-brand text-primary-foreground hover:bg-brand-soft"
      : "border border-brand text-brand hover:bg-brand hover:text-primary-foreground";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
