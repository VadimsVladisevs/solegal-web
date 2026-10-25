const levelClasses = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
} as const;

interface HeadingProps {
  level: keyof typeof levelClasses;
  children: React.ReactNode;
  /** Set on `brand` / `brand-strong` backgrounds. */
  onBrand?: boolean;
  className?: string;
}

export function Heading({
  level,
  children,
  onBrand = false,
  className = "",
}: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={`font-semibold text-balance ${levelClasses[level]} ${onBrand ? "text-on-brand" : "text-ink"} ${className}`}
    >
      {children}
    </Tag>
  );
}
