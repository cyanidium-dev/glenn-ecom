import PortableTextRenderer from "../shared/portableTextRenderer/PortableTextRenderer";
import { PortableTextBlock } from "@/types/store";
import Container from "../shared/container/Container";

interface ItemDescriptionProps {
    releaseDate: string;
    aboutEP: PortableTextBlock[];
    aboutMedium: PortableTextBlock[];
    tracklist: { sideA: string[], sideB: string[] };
}

export default function ItemDescription({ releaseDate, aboutEP, aboutMedium, tracklist }: ItemDescriptionProps) {
    return (
        <section className="pt-5 pb-25">
            <Container className="px-[15px] ssm:px-[30px]">
                <p className="text-[12px] leading-[14px] mb-[15px]">Release date: {releaseDate}</p>
                <h2 className="text-[12px] leading-[14px] font-medium mb-[15px]">About the EP</h2>
                <PortableTextRenderer value={aboutEP} />
                <h2 className="text-[12px] leading-[14px] font-medium mt-[40px] mb-[14px]">About the Medium</h2>
                <PortableTextRenderer value={aboutMedium} />
                <h2 className="text-[12px] leading-[14px] font-medium mt-[30px] mb-[14px]">Tracklist</h2>
                <h3 className="text-[12px] leading-[14px] font-medium mb-[6px]">Side A</h3>
                <ul className="mb-[10px]">
                    {tracklist.sideA.map((track) => (
                        <li key={track} className="text-[12px] leading-[14px]">{track}</li>
                    ))}
                </ul>
                <h3 className="text-[12px] leading-[14px] font-medium mb-[6px]">Side B</h3>
                <ul>
                    {tracklist.sideB.map((track) => (
                        <li key={track} className="text-[12px] leading-[14px]">{track}</li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}