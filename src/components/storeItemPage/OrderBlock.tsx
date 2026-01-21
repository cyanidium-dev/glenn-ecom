import MainButton from "../shared/buttons/MainButton";

export default function OrderBlock() {
    return (
        <div>
            <p className="text-[14px] leading-[17px] mb-[5px]">Quantity</p>
            <select className="mb-5">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <MainButton variant="outline">Add to Basket</MainButton>
        </div>
    );
}