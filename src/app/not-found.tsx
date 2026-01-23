import Container from "@/components/shared/container/Container";
import Link from "next/link";
import { fadeInAnimation } from "@/utils/utils/animationVariants";
import * as motion from "motion/react-client";

export default function NotFound() {
  return (
    <section className="pt-[231px] lg:pt-[218px] lg:pb-[128px] pb-[167px]">
      <Container className="px-[15px] ssm:px-[20px]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: -30, delay: 0.1 })}
          className="mb-[30px] lg:mb-5 font-andes text-[86px] ssm:text-[90px] lg:text-[190px] leading-[95%] tracking-0.01em text-center lowercase"
        >
          404
          <br />
          Page not found
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="max-w-[327px] lg:max-w-[423px] mx-auto mb-5 lg:mb-10 text-[16px] lg:text-[20px] leading-[119%] lg:leading-[120%] text-center"
        >
          The page you’re looking for doesn’t exist or has been moved.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.4 })}
        >
          <Link
            href="/"
            className="w-fit mx-auto block text-[16px] lg:text-[20px] leading-[119%] lg:leading-[120%] text-center underline
          hover:text-white/60 transition duration-300 ease-in-out"
          >
            Back to Glenn Garbo
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
