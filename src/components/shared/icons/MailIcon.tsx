interface MailIconProps {
  className?: string;
}

export default function MailIcon({ className = "" }: MailIconProps) {
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
        d="M32.5241 10.875H8.06257L19.3072 17.2556C19.9194 17.6029 20.6692 17.6029 21.2814 17.2555L32.5241 10.875ZM21.0174 20.7724C20.7971 20.8979 20.5479 20.9639 20.2943 20.9639C20.0407 20.9639 19.7915 20.8979 19.5712 20.7724L7.10303 13.6999V28.1251H33.4856V13.6999L21.0174 20.7724Z"
        fill="currentColor"
      />
    </svg>
  );
}
