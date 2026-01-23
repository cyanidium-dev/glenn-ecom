interface SelectArrowIconProps {
  className?: string;
}

export default function SelectArrowIcon({ className = "" }: SelectArrowIconProps) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.353516 0.353516L7.85352 7.85352L15.3535 0.353516"
        stroke="url(#paint0_linear_1_902)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_902"
          x1="-3.14648"
          y1="4.10352"
          x2="19.3535"
          y2="4.10352"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.2" />
          <stop offset="0.4944" stopColor="white" />
          <stop offset="0.918269" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
