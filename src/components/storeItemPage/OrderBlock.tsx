"use client";
import MainButton from "../shared/buttons/MainButton";
import SelectInput from "../shared/selectInput/SelectInput";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

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
      <motion.p
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.3 })}
        className="text-[14px] lg:text-[18px] leading-[121%] lg:leading-[117%] mb-[5px] lg:mb-2"
      >
        Quantity
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.4 })}
      >
        <SelectInput
          options={options}
          defaultValue="1"
          onChange={handleChange}
          className="mb-5 lg:mb-[17px]"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ y: 20, delay: 0.5 })}
      >
        <MainButton variant="outline" className="h-10 md:h-[45px]">
          Add to Basket
        </MainButton>
      </motion.div>
    </div>
  );
}
