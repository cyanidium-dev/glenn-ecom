"use client";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../container/Container";
import CloseIcon from "../icons/CloseIcon";
import BasketMenuItem from "./BasketMenuItem";
import { fadeInAnimation, basketMenuVariants } from "@/utils/animationVariants";

import SeparatorLine from "../icons/SeparatorLine";
import LinkButton from "../buttons/LinkButton";
import { useCartStore } from "@/store/useCartStore";

export default function BasketMenu() {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);

  const { cartItems } = useCartStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={basketMenuVariants}
          className={`${
            isDrawerOpen ? "no-doc-scroll" : "pointer-events-none"
          } absolute z-60 top-0 right-0 min-w-[330px] w-[85vw] max-w-[658px] h-dvh bg-linear-to-l from-[#92001D] to-[#000000] overflow-hidden opacity-100`}
        >
          <div className="relative w-full h-full flex flex-col">
            <button
              type="button"
              aria-label="close basket menu button"
              onClick={() => toggleDrawer(false)}
              className="absolute top-10 lg:top-[45px] right-[30px] w-4 h-4 lg:w-[23px] lg:h-[23px] text-white outline-none z-10 cursor-pointer hover:opacity-70 transition-opacity duration-300 ease-in-out"
            >
              <CloseIcon className="w-full h-full" />
            </button>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <Container className="relative w-full lg:pl-[25px] lg:pr-[27px] xl:pl-[25px] xl:pr-[27px] pt-[34px] lg:pt-[45px] pb-[30px]">
                {/* Empty Basket Message */}
                {cartItems.length === 0 && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({ delay: 0.3, x: -30 })}
                    className="w-full"
                  >
                    <h3 className="font-andes lowercase text-[34px] lg:text-[38px] leading-[95%] mb-5 lg:mb-[30px]">
                      Your Cart is empty
                    </h3>
                    <LinkButton
                      href="/#store"
                      className="w-full"
                      variant="gradient"
                      onClick={() => toggleDrawer(false)}
                    >
                      Continue Shopping
                    </LinkButton>
                  </motion.div>
                )}
                {cartItems.length > 0 && (
                  <>
                    <h3 className="font-andes lowercase text-[34px] lg:text-[38px] leading-[95%] mb-5 lg:mb-[30px]">
                      Your Cart
                    </h3>
                    <motion.ul
                      initial="hidden"
                      whileInView="visible"
                      exit="exit"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={fadeInAnimation({ delay: 0.3, x: -30 })}
                      className="w-full flex flex-col gap-5"
                    >
                      {cartItems.map((item) => (
                        <BasketMenuItem key={item.id} item={item} />
                      ))}
                    </motion.ul>
                  </>
                )}
              </Container>
            </div>
            {cartItems.length > 0 && (
              <div className="shrink-0">
                <Container className="w-full lg:pl-[25px] lg:pr-[27px] xl:pl-[25px] xl:pr-[27px] pb-[30px]">
                  <SeparatorLine className="w-full h-[2px] -my-px" />
                  <div className="flex justify-between items-center mt-5 mb-[5px]">
                    <p className="font-andes lowercase text-[26px] lg:text-[26px] leading-[95%]">
                      Subtotal:
                    </p>
                    <p className="text-[16px] lg:text-[18px] leading-[120%]">
                      {subtotal.toFixed(2)}.- CHF
                    </p>
                  </div>
                  <p className="text-[12px] lg:text-[14px] leading-[120%] mb-5 lg:mb-[15px]">
                    Shipping and taxes calculated at checkout
                  </p>
                  <LinkButton
                    href="/checkout"
                    variant="gradient"
                    className="w-full h-[38px] lg:h-[45px] text-[14px] lg:text-[18px]"
                    onClick={() => toggleDrawer(false)}
                  >
                    Checkout
                  </LinkButton>
                </Container>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
