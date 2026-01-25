interface CloseIconProps {
  className?: string;
}

export default function CloseIcon({ className = "" }: CloseIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.707031 0.707031L16.707 16.707M16.707 0.707031L0.707031 16.707"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

