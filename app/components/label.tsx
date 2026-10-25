interface LabelProps {
  children: React.ReactNode;
  /** Set on `brand` / `brand-strong` backgrounds. */
  onBrand?: boolean;
}

/** Small uppercase eyebrow above a heading. */
export function Label({ children, onBrand = false }: LabelProps) {
  return (
    <p
      className={`text-label font-semibold tracking-label uppercase ${onBrand ? "text-on-brand-muted" : "text-brand-soft"}`}
    >
      {children}
    </p>
  );
}
