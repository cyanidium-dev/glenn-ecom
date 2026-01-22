import MainButton from "../shared/buttons/MainButton";

export default function OrderBlock() {
    return (
        <div>
            <p className="text-[14px] lg:text-[18px] leading-[121%] lg:leading-[117%] mb-[5px] lg:mb-2">Quantity</p>
            <select className="mb-5 lg:mb-[17px]">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <MainButton variant="outline" className="h-10 md:h-[45px]">Add to Basket</MainButton>
        </div>
    );
}