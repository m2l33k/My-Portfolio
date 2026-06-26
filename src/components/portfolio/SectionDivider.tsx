type Variant = "wave" | "circuit" | "pulse";

/**
 * A single, understated section separator used across the portfolio.
 * The `variant` prop is kept for backwards-compatibility with the layout,
 * but every variant now renders the same clean, professional divider:
 * a thin gradient hairline with a subtle center dot.
 */
const SectionDivider = ({ variant }: { variant?: Variant }) => {
  void variant;
  return (
    <div className="relative w-full py-8 flex items-center justify-center" aria-hidden="true">
      <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-primary/40 ring-4 ring-background" />
    </div>
  );
};

export default SectionDivider;
