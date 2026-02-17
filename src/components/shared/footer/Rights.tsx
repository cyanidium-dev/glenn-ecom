import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface RightsProps {
  className?: string;
}

export default function Rights({ className = "" }: RightsProps) {
  const year = new Date().getFullYear();
  const links = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/imprint", label: "Imprint" },
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
  ];
  return (
    <div
      className={twMerge(
        "flex flex-col lg:flex-row items-center justify-center mx-auto gap-y-[5px] lg:gap-y-0 lg:gap-x-[30px] text-[12px] leading-[120%] lg:text-[16px] lg:leading-[121%]",
        className
      )}
    >
      <p>&copy; {year} Glenn Garbo. All rights reserved.</p>
      <ul className="flex items-center gap-x-[15px] lg:gap-x-[30px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="md:hover:underline transition duration-300 ease-in-out"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
