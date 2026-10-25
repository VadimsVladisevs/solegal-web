interface RuleProps {
  /** Set on `brand` / `brand-strong` backgrounds. */
  onBrand?: boolean;
  className?: string;
}

/** The short 56 × 2px divider under headings, echoing the logo's rule. */
export function Rule({ onBrand = false, className = "" }: RuleProps) {
  return (
    <hr
      className={`h-0.5 w-rule border-0 ${onBrand ? "bg-on-brand-muted" : "bg-brand"} ${className}`}
    />
  );
}
