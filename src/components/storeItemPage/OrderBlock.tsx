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
  const addToCart = useCartStore((state) => state.addToCart);
  // const {
  //   cartItems,
  //   isDrawerOpen,
  //   toggleDrawer,
  //   removeFromCart,
  //   getTotalPrice,
  // } = useCartStore();

  // const totalPrice = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0,
  // );

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product._id,
        name: product.title,
        price: product.priceCHF,
        image: product.coverImage,
        slug: product.slug,
      },
      quantity,
    );
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
          variant="outline"
          className="h-10 md:h-[45px]"
          onClick={handleAddToCart}
        >
          Add to Basket
        </MainButton>
      </motion.div>
      {/* 
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Your basket is empty
          </p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start border-b pb-4"
              >
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: <span className="font-bold">{item.quantity}</span>
                  </p>
                  <p className="text-sm">{item.price}.- CHF</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between mb-4">
          <span className="font-andes text-xl">Total:</span>
          <span className="font-bold text-xl">{totalPrice}.- CHF</span>
        </div>
      </div> */}
    </div>
  );
}
