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
      className={`xs:max-w-full px-[15px] ssm:px-[20px] lg:px-15 xl:px-25 mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
