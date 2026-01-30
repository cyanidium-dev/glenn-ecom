"use client";
import MainButton from "../shared/buttons/MainButton";
import SelectInput from "../shared/selectInput/SelectInput";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { SanityRecord } from "@/types/store";

interface OrderBlockProps {
  product: SanityRecord;
}
export default function OrderBlock({ product }: OrderBlockProps) {
  const { addToCart, toggleDrawer, cartItems } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const isInCart = cartItems.some((item) => item.id === product._id);

  const handleAddToCart = () => {
    if (isInCart) {
      toggleDrawer(true);
      return;
    }
    addToCart(
      {
        id: product._id,
        name: product.title,
        price: product.priceCHF,
        coverImage: product.coverImage,
        discImage: product.discImage,
        slug: product.slug,
      },
      quantity,
    );

    toggleDrawer(true);
  };
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

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
          onChange={(val) => setQuantity(Number(val))}
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
        <MainButton
          variant={isInCart ? "white" : "outline"}
          className="h-10 md:h-[45px]"
          onClick={handleAddToCart}
        >
          {isInCart ? "Already in Basket" : "Add to Basket"}
        </MainButton>
      </motion.div>
    </div>
  );
}
