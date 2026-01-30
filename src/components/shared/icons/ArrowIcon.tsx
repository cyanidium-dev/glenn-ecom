const ARROW_PATH =
  "M53.8547 78.3569L61 69.4281L60.7908 68.9697L53.8547 61.0253L5.02129 -1.46248e-05L0.20921 10.5995L3.09772e-05 11.0572L46.9205 69.6911L0.304973 127.943L0.514152 128.4L5.32623 139L53.8547 78.3569Z";

interface ArrowIconProps {
  className?: string;
  /**
   * Pass "gradient" to use the built-in vertical gradient,
   * otherwise any valid SVG fill value (e.g. "#fff").
   * Solid fill is animated via an opacity overlay (SVG can't transition gradient ↔ solid).
   */
  fill?: string;
}

export default function ArrowIcon({
  className = "",
  fill = "currentColor",
}: ArrowIconProps) {
  const gradientId = "arrow-gradient";
  const isGradient = fill === "gradient";
  const resolvedSolid = fill !== "gradient" ? fill ?? "currentColor" : "#fff";

  return (
    <svg
      viewBox="0 0 61 139"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="2.77%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="53.12%" stopColor="#FFFFFF" />
          <stop offset="92.05%" stopColor="rgba(255, 255, 255, 0.2)" />
        </linearGradient>
      </defs>
      {/* Base: gradient always visible */}
      <path fill={`url(#${gradientId})`} d={ARROW_PATH} />
      {/* Solid overlay: opacity 0 → 1 on hover so transition is smooth (SVG can't interpolate gradient ↔ solid) */}
      <path
        fill={resolvedSolid}
        d={ARROW_PATH}
        style={{
          opacity: isGradient ? 0 : 1,
          transition: "opacity 0.45s ease-in-out",
        }}
      />
    </svg>
  );
}


