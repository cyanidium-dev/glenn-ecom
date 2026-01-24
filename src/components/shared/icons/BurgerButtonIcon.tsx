interface BurgerButtonIconProps {
  className?: string;
}

export default function BurgerButtonIcon({
  className = "",
}: BurgerButtonIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 3H24M0 12H24M0 21H24"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

