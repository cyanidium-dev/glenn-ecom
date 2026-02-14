import PortableTextRenderer from "../shared/portableTextRenderer/PortableTextRenderer";
import { PortableTextBlock } from "@/types/store";
import Link from "next/link";

interface ItemDescriptionProps {
  releaseDate: string;
  aboutEP: PortableTextBlock[];
  aboutMedium: PortableTextBlock[];
  tracklist: PortableTextBlock[];
  isVinyl?: boolean;
}

export default function ItemDescription({
  releaseDate,
  aboutEP,
  aboutMedium,
  tracklist,
  isVinyl,
}: ItemDescriptionProps) {
  return (
    <section className="py-5 lg:pb-10">
      <p className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] mb-[15px] lg:mb-[30px]">
        Release date: {releaseDate}
      </p>
      <div className="mb-[40px] lg:mb-[50px]">
        <h2 className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mb-[15px]">
          About the EP:
        </h2>
        <div className="flex flex-col gap-2 lg:gap-[15px]">
          <PortableTextRenderer value={aboutEP} />
        </div>
      </div>
      <div className="mb-[30px] lg:mb-[40px]">
        <h2 className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mb-[14px] lg:mb-[15px]">
          About the Medium:
        </h2>
        <div className="flex flex-col gap-2 lg:gap-[15px]">
          <PortableTextRenderer value={aboutMedium} />
        </div>
      </div>
      <div>
        <h2 className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mb-[14px] lg:mb-[15px]">
          Track listing:
        </h2>
        <div className="flex flex-col gap-[6px] lg:gap-[5px]">
          <PortableTextRenderer value={tracklist} />
        </div>
      </div>
      {isVinyl && (
        <div>
          <Link
            href="/care-instructions"
            className="text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%] underline block hover:text-white/60 transition duration-300 ease-in-out"
          >
            Care Instructions
          </Link>
        </div>
      )}
    </section>
  );
}
