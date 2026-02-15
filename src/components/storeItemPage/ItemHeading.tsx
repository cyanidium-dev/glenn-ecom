import OrderBlock from "./OrderBlock";
import { SanityRecord } from "@/types/store";

interface ItemHeadingProps {
  product: SanityRecord;
}
export default function ItemHeading({ product }: ItemHeadingProps) {
  return (
    <section>
      <h1 className="font-andes text-[48px] lg:text-[56px] leading-[91%] lowercase mb-[10px] tracking-0">
        {product.title}
      </h1>
      <p className="text-[14px] lg:text-[18px] leading-[121%] lg:leading-[117%] mb-5 lg:mb-[15px]">
        {product.priceCHF}.- CHF
      </p>
      <OrderBlock product={product} />
    </section>
  );
}
