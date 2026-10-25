interface ButtonStyleProps {
  /** Set on `brand` / `brand-strong` backgrounds: a white button. */
  onBrand?: boolean;
  className?: string;
}

function buttonClasses({ onBrand = false, className = "" }: ButtonStyleProps) {
  const colors = onBrand
    ? "bg-on-brand text-brand hover:bg-tint focus-visible:outline-on-brand"
    : "bg-brand text-on-brand hover:bg-brand-strong";
  return `inline-flex min-h-11 items-center justify-center px-6 py-3 text-nav font-semibold tracking-nav uppercase transition-colors ${colors} ${className}`;
}

type ButtonProps = ButtonStyleProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ onBrand, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonClasses({ onBrand, className })}
      {...props}
    />
  );
}

type ButtonLinkProps = ButtonStyleProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** A link that looks like a button, e.g. "Contact us" → `#contact`. */
export function ButtonLink({ onBrand, className, ...props }: ButtonLinkProps) {
  return <a className={buttonClasses({ onBrand, className })} {...props} />;
}
