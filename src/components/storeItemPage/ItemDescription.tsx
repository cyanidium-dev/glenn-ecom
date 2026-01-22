import PortableTextRenderer from "../shared/portableTextRenderer/PortableTextRenderer";
import { PortableTextBlock } from "@/types/store";

interface ItemDescriptionProps {
    releaseDate: string;
    aboutEP: PortableTextBlock[];
    aboutMedium: PortableTextBlock[];
    tracklist: PortableTextBlock[];
}

export default function ItemDescription({ releaseDate, aboutEP, aboutMedium, tracklist }: ItemDescriptionProps) {
    return (
        <section className="py-5 lg:pb-10">
            <p className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] mb-[15px] lg:mb-[30px]">Release date: {releaseDate}</p>
            <h2 className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mb-[15px]">About the EP:</h2>
            <div className="flex flex-col gap-2 lg:gap-[15px]">
                <PortableTextRenderer value={aboutEP} />
            </div>
            <h2 className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mt-[40px] lg:mt-[50px] mb-[14px] lg:mb-[15px]">About the Medium:</h2>
            <div className="flex flex-col gap-2 lg:gap-[15px]">
                <PortableTextRenderer value={aboutMedium} />
            </div>
            <h2 className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mt-[30px] lg:mt-[40px] mb-[14px] lg:mb-[15px]">Track listing:</h2>
            <div className="flex flex-col gap-[6px] lg:gap-[5px]">
                <PortableTextRenderer value={tracklist} />
            </div>
        </section>
    );
}