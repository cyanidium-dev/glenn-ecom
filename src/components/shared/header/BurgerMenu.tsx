import { Dispatch, SetStateAction } from "react";
import { NavMenuMobile } from "./NavMenu";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../container/Container";
import CloseIcon from "../icons/CloseIcon";
import { fadeInAnimation, burgerMenuVariants } from "@/utils/animationVariants";

interface BurgerMenuMobTabProps {
  isHeaderMenuOpened: boolean;
  setIsHeaderMenuOpened: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerMenu({
  isHeaderMenuOpened,
  setIsHeaderMenuOpened,
}: BurgerMenuMobTabProps) {
  return (
    <AnimatePresence>
      {isHeaderMenuOpened && (
        <motion.div
          viewport={{ once: true, amount: 0.2 }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={burgerMenuVariants}
          className={`${
            isHeaderMenuOpened ? "no-doc-scroll" : "pointer-events-none"
          } md:hidden absolute z-50 top-0 left-0 w-[330px] h-dvh bg-linear-to-l from-[#92001D] to-[#000000] overflow-hidden`}
        >
          <Container className="relative w-full pt-[84px]">
            <button
              type="button"
              aria-label="close menu button"
              onClick={() => setIsHeaderMenuOpened(false)}
              className="absolute top-10 right-[30px] w-4 h-4 text-white outline-none"
            >
              <CloseIcon className="w-full h-full" />
            </button>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ delay: 0.3, x: 30 })}
              className="w-full"
            >
              <NavMenuMobile setIsHeaderMenuOpened={setIsHeaderMenuOpened} />
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
