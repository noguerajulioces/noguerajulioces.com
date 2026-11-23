import mark from "@/data/mark.json";

// The jn mark: ink in currentColor, the dot on the j in the accent, so it follows the theme toggle.
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={mark.viewBox} aria-hidden="true">
      <g transform={mark.centre}>
        <path d={mark.strokes} fill="none" stroke="currentColor" strokeWidth={mark.stroke} />
        <circle cx={mark.dot.cx} cy={mark.dot.cy} r={mark.dot.r} style={{ fill: "var(--color-primary)" }} />
      </g>
    </svg>
  );
}
