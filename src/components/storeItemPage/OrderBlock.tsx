"use client";
import MainButton from "../shared/buttons/MainButton";
import SelectInput from "../shared/selectInput/SelectInput";

export default function OrderBlock() {
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <p className="text-[14px] lg:text-[18px] leading-[121%] lg:leading-[117%] mb-[5px] lg:mb-2">
        Quantity
      </p>
      <SelectInput
        options={options}
        defaultValue="1"
        onChange={handleChange}
        className="mb-5 lg:mb-[17px]"
      />
      <MainButton variant="outline" className="h-10 md:h-[45px]">
        Add to Basket
      </MainButton>
    </div>
  );
}
