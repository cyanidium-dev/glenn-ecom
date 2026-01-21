import OrderBlock from "./OrderBlock";
import Container from "../shared/container/Container";

interface ItemHeadingProps {
    title: string;
    price: number;
}

export default function ItemHeading({ title, price }: ItemHeadingProps) {
    return (
        <section className="pt-5">
            <Container className="px-[15px] ssm:px-[30px]">
                <h1 className="font-andes text-[48px] leading-[44px] lowercase mb-[10px] tracking-0">{title}</h1>
                <p className="text-[14px] leading-[17px] mb-5">{price}.- CHF</p>
                <OrderBlock />
            </Container>
        </section>
    );
}