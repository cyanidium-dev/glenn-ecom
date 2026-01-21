import ItemHeading from "@/components/storeItemPage/ItemHeading";
import ItemDescription from "@/components/storeItemPage/ItemDescription";
import Link from "next/link";
import ImageBlock from "@/components/storeItemPage/ImageBlock";
import { storeItemsData } from "@/utils/storeItemsData";

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
        <>
            <ImageBlock image={itemData.image} isVinyl={itemData.isVinyl} />
            <ItemHeading title={itemData.title} price={itemData.price} />
            <ItemDescription releaseDate={itemData.releaseDate} aboutEP={itemData.aboutEP} aboutMedium={itemData.aboutMedium} tracklist={itemData.tracklist} />
            {itemData.isVinyl && <Link href="/care-instructions" className="text-[12px] leading-[14px] underline mt-5 block">Care Instructions</Link>}
        </>
    );
}