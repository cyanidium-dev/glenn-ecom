import { ReactNode } from "react";
import LoaderIcon from "../icons/LoaderIcon";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface LinkButtonProps {
  children: string | ReactNode;
  variant?: "white" | "outline" | "gradient";
  className?: string;
  href: string;
  target?: "_self" | "_blank";
  isExternal?: boolean;
  isLoading?: boolean;
}

export default function LinkButton({
  children,
  variant = "outline",
  className = "",
  href,
  target = "_self",
  isExternal = false,
  isLoading = false,
}: LinkButtonProps) {
  const variantClasses = {
    white:
      "bg-white disabled:bg-white/60 text-red hover:bg-[linear-gradient(273.78deg, rgba(255, 255, 255, 0.2) 3.03%, #FFFFFF 50.66%, rgba(255, 255, 255, 0.2) 96.83%)]",
    outline:
      "bg-transparent disabled:border-white/60 disabled:text-white/60 border-[1.5px] border-white text-white hover:bg-white hover:text-red",
    gradient: "bg-transparent disabled:text-white/60 text-white",
  };

  return (
    <>
      {isExternal ? (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={twMerge(
            `group relative overflow-hidden enabled:cursor-pointer flex items-center justify-center w-full h-[45px] px-3
         text-[14px] leading-none lg:text-[18px] text-center
      enabled:active:scale-[98%] will-change-transform transition duration-300 ease-in-out
       ${variantClasses[variant]}`,
            className
          )}
        >
          {variant === "gradient" && (
            <div
              className="absolute z-10 inset-0 pointer-events-none"
              style={{
                opacity: 1,
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
        </a>
      ) : (
        <Link
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={twMerge(
            `group relative overflow-hidden enabled:cursor-pointer flex items-center justify-center w-full h-[45px] px-3
         text-[14px] leading-none lg:text-[18px] text-center
      enabled:active:scale-[98%] will-change-transform transition duration-300 ease-in-out
       ${variantClasses[variant]}`,
            className
          )}
        >
          {variant === "gradient" && (
            <div
              className="absolute z-10 inset-0 pointer-events-none"
              style={{
                opacity: 1,
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
          <span className="relative inline-block w-full items-center justify-center">
            {children}
            {isLoading ? <LoaderIcon variant={variant} /> : null}
          </span>
        </Link>
      )}
    </>
  );
}
