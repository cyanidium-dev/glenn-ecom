import { Dispatch, ReactNode, SetStateAction } from "react";
import LoaderIcon from "../icons/LoaderIcon";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  children: string | ReactNode;
  variant?: "white" | "outline" | "gradient";
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void | Dispatch<SetStateAction<boolean>>;
}

export default function MainButton({
  children,
  variant = "outline",
  className = "",
  type = "button",
  disabled = false,
  isLoading = false,
  onClick,
}: MainButtonProps) {
  const variantClasses = {
    white:
      "bg-white disabled:bg-white/60 text-red hover:bg-[linear-gradient(273.78deg, rgba(255, 255, 255, 0.2) 3.03%, #FFFFFF 50.66%, rgba(255, 255, 255, 0.2) 96.83%)]",
    outline:
      "bg-transparent disabled:border-white/60 disabled:text-white/60 border-[1.5px] border-white text-white hover:bg-white hover:text-red",
    gradient: "bg-transparent disabled:text-white/60 text-white",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `group relative overflow-hidden enabled:cursor-pointer flex items-center justify-center w-full h-[45px] px-3
         text-[14px] leading-none lg:text-[18px]
      enabled:active:scale-[98%] will-change-transform transition duration-300 ease-in-out
       ${variantClasses[variant]}`,
        className
      )}
    >
      {variant === "gradient" && (
        <div
          className="absolute z-10 inset-0 pointer-events-none"
          style={{
            opacity: disabled ? 0.5 : 1,
            background:
              "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 38.94%, rgba(255, 255, 255, 0.2) 62.98%, rgba(255, 255, 255, 0.7) 91.83%)",
            padding: "1.5px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      <span className="relative inline-block w-full">
        {children}
        {isLoading ? <LoaderIcon variant={variant} /> : null}
      </span>
    </button>
  );
}
