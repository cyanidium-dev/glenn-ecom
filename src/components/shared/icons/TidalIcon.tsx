interface TidalIconProps {
  className?: string;
}

export default function TidalIcon({ className = "" }: TidalIconProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m 24.8491,16.06 4.8473,-4.8491 4.8491,4.8509 -4.8491,4.8473 z"
        fill="currentColor"
      />
      <path
        d="M 24.8491,16.06 20,11.2109 15.1509,16.06 20,20.9091 15.1509,25.7564 20,30.6073 24.8491,25.76 20,20.9091 Z"
        fill="currentColor"
      />
      <path
        d="m 5.45455,16.06 4.84905,-4.8491 4.8473,4.8491 -4.8473,4.8491 z"
        fill="currentColor"
      />
    </svg>
  );
}
