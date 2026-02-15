import PortableTextRenderer from "../shared/portableTextRenderer/PortableTextRenderer";
import { PortableTextBlock } from "@/types/store";
import Link from "next/link";

interface ItemDescriptionRawProps {
  releaseDate: string;
  description: PortableTextBlock[];
  isCareInstructions?: boolean;
  careInstructionLink?: string;
}

export default function ItemDescriptionRaw({
  releaseDate,
  description,
  isCareInstructions,
  careInstructionLink,
}: ItemDescriptionRawProps) {
  return (
    <section className="py-5 lg:pb-10">
      <p className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] mb-[15px] lg:mb-[30px]">
        Release date: {releaseDate}
      </p>
      <div className="mb-[12px] lg:mb-[40px]">
        <PortableTextRenderer value={description} />
      </div>
      {isCareInstructions && (
        <div>
          <Link
            href={"/care-instructions"}
            className="text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%] underline block hover:text-white/60 transition duration-300 ease-in-out"
          >
            Care Instructions
          </Link>
        </div>
      )}
    </section>
  );
}
