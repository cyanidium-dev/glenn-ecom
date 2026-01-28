import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemHeading from "@/components/storeItemPage/ItemHeading";
import ItemDescriptionRaw from "@/components/storeItemPage/ItemDescriptionRaw";
import ImageBlock from "@/components/storeItemPage/ImageBlock";
import Container from "@/components/shared/container/Container";
import { extractTextFromBlocks } from "@/utils/portableTextUtils";
import { formatReleaseDate } from "@/utils/dateUtils";
import { recordQuery } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { SanityRecord } from "@/types/store";

interface ItemPageProps {
  params: Promise<{
    item: string;
  }>;
}

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { item } = await params;
  const itemData = (await fetchSanityData(recordQuery, {
    slug: item,
  })) as SanityRecord | null;

  if (!itemData) {
    notFound();
  }

  const description = extractTextFromBlocks(itemData.description);
  const shortDescription =
    description.length > 160
      ? description.substring(0, 157) + "..."
      : description;

  return {
    title: `${itemData.title} | Store`,
    description:
      shortDescription || `${itemData.title} - ${itemData.releaseDate}`,
    openGraph: {
      title: itemData.title,
      description:
        shortDescription || `${itemData.title} - ${itemData.releaseDate}`,
      images: [
        {
          url: itemData.ogImage.asset.url,
          width: 1200,
          height: 630,
          alt: itemData.title,
        },
      ],
    },
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { item } = await params;
  const itemData = (await fetchSanityData(recordQuery, {
    slug: item,
  })) as SanityRecord | null;

  if (!itemData) {
    notFound();
  }

  // Format release date
  const formattedReleaseDate = formatReleaseDate(itemData.releaseDate);

  return (
    <div className="pt-[141px] lg:pt-[192px] lg:pb-50 pb-25">
      <Container className="px-[15px] ssm:px-[30px]">
        <article className="flex flex-col lg:flex-row lg:gap-20">
          <ImageBlock
            coverImage={itemData.coverImage}
            discImage={itemData.discImage}
            title={itemData.title}
          />
          <div className="pt-10 lg:pt-0 lg:w-[44.7%] lg:shrink-0">
            <ItemHeading title={itemData.title} price={itemData.priceCHF} />
            <ItemDescriptionRaw
              releaseDate={formattedReleaseDate}
              description={itemData.description}
              isCareInstructions={itemData.isCareInstructions}
              careInstructionLink={itemData.careInstructionLink}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}
