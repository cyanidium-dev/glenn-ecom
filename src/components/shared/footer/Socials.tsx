import Link from "next/link";
import AppleMusicIcon from "../icons/AppleMusicIcon";
import MailIcon from "../icons/MailIcon";
import TidalIcon from "../icons/TidalIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SpotifyIcon from "../icons/SpotifyIcon";
import { mail, youtube, appleMusic, tidal, spotify } from "@/constants/socials";
import { twMerge } from "tailwind-merge";
import { fadeInAnimation } from "@/utils/animationVariants";
import { motion } from "motion/react";

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
    <div
      className={twMerge(
        "flex items-center gap-x-1 lg:gap-x-[5px] justify-center",
        className
      )}
    >
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <motion.div
          key={label}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ x: 20, delay: 0.4 + index * 0.2 })}
        >
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative text-red-bright rounded-[8px] overflow-hidden size-[30px] lg:size-[40px] transition duration-300 ease-in-out"
            style={{
              background:
                "linear-gradient(321.47deg, rgba(255, 255, 255, 0.2) 1.07%, #ffffff 49.3%, rgba(255, 255, 255, 0.2) 96.06%)",
            }}
          >
            <div className="absolute inset-0 bg-white group-hover:bg-transparent transition duration-300 ease-in-out" />
            <Icon className="size-full relative z-10" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
