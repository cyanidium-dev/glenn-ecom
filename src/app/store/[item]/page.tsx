import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemHeading from "@/components/storeItemPage/ItemHeading";
import ItemDescription from "@/components/storeItemPage/ItemDescription";
import ImageBlock from "@/components/storeItemPage/ImageBlock";
import { storeItemsData } from "@/utils/storeItemsData";
import Container from "@/components/shared/container/Container";
import { extractTextFromBlocks } from "@/utils/utils/portableTextUtils";

interface ItemPageProps {
  params: Promise<{
    item: string;
  }>;
}

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { item } = await params;
  const itemData = storeItemsData.find(itemData => itemData.slug === item);

  if (!itemData) {
    notFound();
  }

  const description = extractTextFromBlocks(itemData.aboutEP);
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
          url: itemData.image.url,
          width: 1200,
          height: 630,
          alt: itemData.image.alt,
        },
      ],
    },
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { item } = await params;
  const itemData = storeItemsData.find(itemData => itemData.slug === item);
  if (!itemData) {
    notFound();
  }
  return (
    <div className="pt-[141px] lg:pt-[192px] lg:pb-50 pb-25">
      <Container className="px-[15px] ssm:px-[30px]">
        <article className="flex flex-col lg:flex-row lg:gap-20">
          <ImageBlock image={itemData.image} isVinyl={itemData.isVinyl} />
          <section className="pt-10 lg:pt-0 lg:w-[44.7%] lg:shrink-0">
            <ItemHeading title={itemData.title} price={itemData.price} />
            <ItemDescription
              releaseDate={itemData.releaseDate}
              aboutEP={itemData.aboutEP}
              aboutMedium={itemData.aboutMedium}
              tracklist={itemData.tracklist}
              isVinyl={itemData.isVinyl}
            />
          </section>
        </article>
      </Container>
    </div>
  );
}
