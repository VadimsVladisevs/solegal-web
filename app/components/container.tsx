interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Centers content at max 1200px with the side gutter. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-page px-gutter ${className}`}>
      {children}
    </div>
  );
}
