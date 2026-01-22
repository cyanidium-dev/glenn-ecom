import ItemHeading from "@/components/storeItemPage/ItemHeading";
import ItemDescription from "@/components/storeItemPage/ItemDescription";
import Link from "next/link";
import ImageBlock from "@/components/storeItemPage/ImageBlock";
import { storeItemsData } from "@/utils/storeItemsData";
import Container from "@/components/shared/container/Container";

interface ItemPageProps {
    params: {
        item: string;
    };
}

export default async function ItemPage({ params }: ItemPageProps) {
    const { item } = await params;
    const itemData = storeItemsData.find((itemData) => itemData.slug === item);
    if (!itemData) {
        return <div>Item not found</div>;
    }
    return (
        <div className="pt-[141px] lg:pt-[192px] lg:pb-50 pb-25">
            <Container className="px-[15px] ssm:px-[30px] flex flex-col lg:flex-row lg:gap-20">
                <ImageBlock image={itemData.image} isVinyl={itemData.isVinyl} />
                <div className="pt-10 lg:pt-0 lg:w-[calc(626/(1600-200-80)*100%)] lg:shrink-0">
                    <ItemHeading title={itemData.title} price={itemData.price} />
                    <ItemDescription releaseDate={itemData.releaseDate} aboutEP={itemData.aboutEP} aboutMedium={itemData.aboutMedium} tracklist={itemData.tracklist} />

                        {itemData.isVinyl && <Link href="/care-instructions" className="text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%] underline block">
                            Care Instructions
                        </Link>}

                </div>
            </Container>
        </div>
    );
}