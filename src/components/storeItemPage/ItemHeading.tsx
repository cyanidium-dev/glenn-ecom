import OrderBlock from "./OrderBlock";

interface ItemHeadingProps {
    title: string;
    price: number;
}

export default function ItemHeading({ title, price }: ItemHeadingProps) {
    return (
        <section>
            <h1 className="font-andes text-[48px] lg:text-[56px] leading-[91%] lowercase mb-[10px] tracking-0">{title}</h1>
            <p className="text-[14px] lg:text-[18px] leading-[121%] lg:leading-[117%] mb-5 lg:mb-[15px]">{price}.- CHF</p>
            <OrderBlock />
        </section>
    );
}