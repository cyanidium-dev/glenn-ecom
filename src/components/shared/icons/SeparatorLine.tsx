import { useId } from "react";

interface SeparatorLineProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function SeparatorLine({
  className = "",
  width = 350,
  height = 2,
}: SeparatorLineProps) {
  const gradientId = useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 350 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 1H350"
        stroke={`url(#${gradientId}_0)`}
        strokeWidth="2"
      />
      <path
        d="M0 1H350"
        stroke={`url(#${gradientId}_1)`}
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id={`${gradientId}_0`}
          x1="0"
          y1="1.5"
          x2="350"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.389423" stopColor="white" stopOpacity="0.6" />
          <stop offset="0.711538" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}_1`}
          x1="0"
          y1="1.5"
          x2="350"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.389423" stopColor="white" stopOpacity="0.6" />
          <stop offset="0.629808" stopColor="white" stopOpacity="0.2" />
          <stop offset="0.918269" stopColor="white" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
