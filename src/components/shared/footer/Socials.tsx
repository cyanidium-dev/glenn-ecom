import Link from "next/link";
import AppleMusicIcon from "../icons/AppleMusicIcon";
import MailIcon from "../icons/MailIcon";
import TidalIcon from "../icons/TidalIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SpotifyIcon from "../icons/SpotifyIcon";
import { mail, youtube, appleMusic, tidal, spotify } from "@/constants/socials";
import { twMerge } from "tailwind-merge";

interface SocialsProps {
  className?: string;
}

export default function Socials({ className = "" }: SocialsProps) {
  const socialLinks = [
    { icon: MailIcon, href: `mailto:${mail}`, label: "Email" },
    { icon: YoutubeIcon, href: youtube, label: "YouTube" },
    { icon: AppleMusicIcon, href: appleMusic, label: "Apple Music" },
    { icon: TidalIcon, href: tidal, label: "Tidal" },
    { icon: SpotifyIcon, href: spotify, label: "Spotify" },
  ];

  return (
    <ul
      className={twMerge(
        "flex items-center gap-x-1 lg:gap-x-[5px] justify-center",
        className
      )}
    >
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <li
          key={label}
          className="relative rounded-[8px] overflow-hidden size-[30px] lg:size-[40px] bg-white group md:hover:opacity-70 transition duration-300 ease-in-out"
        >
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="relative flex items-center justify-center size-full"
            style={{ color: "var(--color-red-bright)" }}
          >
            <Icon className="size-[30px] lg:size-[40px]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
