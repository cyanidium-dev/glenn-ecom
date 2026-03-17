import LinkButton from "@/components/shared/buttons/LinkButton";
import MusicFrameIcon from "@/components/shared/icons/MusicFrameIcon";
import Image from "next/image";
import { MainPageMusicItem } from "@/types/music";
import { getOptimizedImageUrl } from "@/utils/sanityImageUrl";

interface MusicCardProps {
  item: MainPageMusicItem;
}

export default function MusicCard({ item }: MusicCardProps) {
  const { title, image, streamingLinks } = item;
  const link = streamingLinks?.[0]?.url ?? "#";
  const imageUrl = image ? getOptimizedImageUrl(image, 800, 90, "webp") : "";

  return (
    <li className="flex flex-col items-center justify-center w-full">
      <div className="group relative mb-[25px] 2xl:mb-0 flex items-center justify-center w-full h-auto aspect-330/320 max-w-[535px] lg:aspect-535/520">
        <div className="absolute inset-0 z-30 pointer-events-none">
          <MusicFrameIcon className="w-full h-full" />
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-[75%] aspect-square xl:pointer-events-none"
          aria-label={`Listen to ${title}`}
        >
          <div
            className="absolute z-10 inset-0 w-full h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(68.89% 68.89% at 50% 50%, rgba(0, 0, 0, 0) 75.11%, rgba(147, 0, 28, 0.5) 95.67%)",
            }}
          />
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 320px, 400px"
              className="object-cover"
            />
          ) : null}
        </a>
        <div
          className="hidden xl:flex xl:flex-col xl:items-center xl:justify-center absolute inset-0 z-20 opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          style={{
            background: "#92001D99",
          }}
        >
          <h3 className="font-andes text-center text-[56px] font-medium leading-[95%] lowercase mb-[25px]">
            {title}
          </h3>
          <LinkButton
            href={link}
            target="_blank"
            variant="outline"
            className="w-[180px] h-[45px] text-[18px] leading-none"
            isExternal={true}
          >
            Listen
          </LinkButton>
        </div>
      </div>
      <h3
        className="2xl:hidden font-andes text-center text-[32px] font-medium leading-[95%] lowercase mb-[15px]"
      >
        {title}
      </h3>
      <div className="2xl:hidden">
        <LinkButton
          href={link}
          target="_blank"
          variant="outline"
          isExternal={true}
          className="w-[127px] h-[37px] text-[14px] leading-none"
        >
          Listen
        </LinkButton>
      </div>
    </li>
  );
}
