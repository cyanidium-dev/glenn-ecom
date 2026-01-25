import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import "./PageLoader.css";

interface PageLoaderProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function PageLoader({
  className = "",
  size = 240,
  color = "currentColor",
}: PageLoaderProps) {
  return (
    <div
      className={twMerge(clsx("flex items-center justify-center"), className)}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <svg
        viewBox="0 0 240 240"
        width={size}
        height={size}
        className="page-loader"
        style={{ color }}
        shapeRendering="geometricPrecision"
      >
        <circle
          className="page-loader__ring page-loader__ring--a"
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          strokeLinecap="round"
        />
        <circle
          className="page-loader__ring page-loader__ring--b"
          cx="120"
          cy="120"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          strokeLinecap="round"
        />
        <circle
          className="page-loader__ring page-loader__ring--c"
          cx="85"
          cy="120"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
        <circle
          className="page-loader__ring page-loader__ring--d"
          cx="155"
          cy="120"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
