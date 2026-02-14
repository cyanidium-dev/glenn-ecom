import type { Metadata } from "next";
import Container from "@/components/shared/container/Container";

export const metadata: Metadata = {
  title: "Care Instructions | Glenn Garbo",
  description:
    "Learn how to properly care for your vinyl records. Essential tips for cleaning, storage, and handling to preserve your collection's quality and longevity.",
  keywords: [
    "vinyl care",
    "record care",
    "vinyl maintenance",
    "record storage",
    "Glenn Garbo",
  ],
  openGraph: {
    title:
      "Care Instructions for the Distinguished Record Collector | Glenn Garbo",
    description:
      "Essential care instructions for maintaining your vinyl record collection. Learn proper cleaning, storage, and handling techniques.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Glenn Garbo",
      },
    ],
  },
};

export default function CareInstructions() {
  const careInstructions = [
    "For optimal auditory pleasure, we advise using a dedicated antistatic record brush before playing.",
    "(The record store of your choice will be happy to help you find the right one.)",
    "• For optimal storage stability, we recommend keeping your records in an upright, vertical position to prevent gradual warping.",
    "• To preserve the integrity of the vinyl, keep records away from direct sunlight and sources of heat, as elevated temperatures may soften or deform the disc over time.",
    "• For best handling, hold the record exclusively by the edges and the labeled center area, ensuring that oils or sebum from the fingers do not settle into the grooves.",
    "• After each listening session, we advise returning the record immediately to its inner and outer sleeves, safeguarding it from dust accumulation and surface abrasion.",
  ];
  return (
    <section className="pt-[124px] ssm:pt-[131px] lg:pt-[220px] lg:pb-[150px]">
      <Container className="px-[15px] ssm:px-[20px]">
        <h1 className="mb-[30px] lg:mb-15 max-w-[1200px] mx-auto font-andes text-[46px] ssm:text-[47px] lg:text-[96px] leading-[95%] font-medium tracking-0.01em text-center lowercase">
          Care Instructions for the Distinguished Record Collector
        </h1>
        <ul className="flex flex-col gap-2 lg:gap-[15px] max-w-[730px] mx-auto">
          {careInstructions.map((instruction, index) => (
            <li
              key={index}
              className="text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%] text-center"
            >
              {instruction}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
