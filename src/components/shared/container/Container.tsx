import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`xs:max-w-full px-[15px] ssm:px-[20px] md:px-[40px] lg:px-15 xl:px-25 xl:max-w-[1600px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
