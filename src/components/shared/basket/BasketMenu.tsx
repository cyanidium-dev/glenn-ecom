import { Dispatch, SetStateAction, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../container/Container";
import CloseIcon from "../icons/CloseIcon";
import BasketMenuItem from "./BasketMenuItem";
import { fadeInAnimation, basketMenuVariants } from "@/utils/animationVariants";
import MainButton from "../buttons/MainButton";
import Link from "next/link";
import { BasketItem } from "@/types/store";
import { testingData } from "./testingData";

interface BasketMenuProps {
  isBasketMenuOpened: boolean;
  setIsBasketMenuOpened: Dispatch<SetStateAction<boolean>>;
}

export default function BasketMenu({
  isBasketMenuOpened,
  setIsBasketMenuOpened,
}: BasketMenuProps) {
  const getItems = useCallback(() => {
    return testingData;
  }, []);

  return (
    <AnimatePresence>
      {isBasketMenuOpened && (
        <motion.div
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={basketMenuVariants}
          className={`${
            isBasketMenuOpened ? "no-doc-scroll" : "pointer-events-none"
          } fixed z-50 top-0 right-0 min-w-[330px] w-[85vw] max-w-[658px] h-dvh bg-linear-to-l from-[#92001D] to-[#000000] overflow-hidden opacity-100`}
        >
          <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
            <Container className="relative w-full lg:pl-[25px] lg:pr-[27px] xl:pl-[25px] xl:pr-[27px] pt-[34px] lg:pt-[45px] pb-[30px]">
              <button
                type="button"
                aria-label="close basket menu button"
                onClick={() => setIsBasketMenuOpened(false)}
                className="absolute top-10 lg:top-[45px] right-[30px] w-4 h-4 lg:w-[23px] lg:h-[23px] text-white outline-none z-10 cursor-pointer"
              >
                <CloseIcon className="w-full h-full" />
              </button>
              {/* Empty Basket Message */}
              {getItems().length === 0 && (
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
                  <Link href="/#store" className="block w-full">
                    <MainButton
                      variant="gradient"
                      className="w-full h-[35px] lg:h-[45px] text-[14px] lg:text-[18px]"
                    >
                      Continue Shopping
                    </MainButton>
                  </Link>
                </motion.div>
              )}
              {getItems().length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeInAnimation({ delay: 0.3, x: -30 })}
                  className="w-full"
                >
                  {getItems().map((item: BasketItem) => (
                    <BasketMenuItem key={item.id} item={item} />
                  ))}
                </motion.div>
              )}
            </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
