interface ArrowIconProps {
  className?: string;
}

export default function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <svg
      width="61"
      height="139"
      viewBox="0 0 61 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M53.8547 78.3569L61 69.4281L60.7908 68.9697L53.8547 61.0253L5.02129 -1.46248e-05L0.20921 10.5995L3.09772e-05 11.0572L46.9205 69.6911L0.304973 127.943L0.514152 128.4L5.32623 139L53.8547 78.3569Z"
        fill="currentColor"
      />
    </svg>
  );
}

