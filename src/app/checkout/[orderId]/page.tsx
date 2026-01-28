import Container from "@/components/shared/container/Container";
import Link from "next/link";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface SuccessProps {
  params: {
    orderId: string;
  };
}

export default async function Success({ params }: SuccessProps) {
  const orderId = (await params).orderId;

  return (
    <section className="pt-[231px] lg:pt-[218px] lg:pb-[128px] pb-[167px]">
      <Container className="px-[15px] ssm:px-[20px]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: -30, delay: 0.1 })}
          className="mb-[30px] lg:mb-5 font-andes text-[90px] lg:text-[190px] leading-[95%] tracking-0.01em text-center lowercase"
        >
          Thank you for your order
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="mb-2 lg:mb-[10px] text-[16px] lg:text-[20px] lg:leading-[120%] text-center"
        >
          Your order has been successfully placed.
        </motion.p>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="mb-6 lg:mb-10 text-[16px] lg:text-[20px] font-medium leading-[120%] text-center"
        >
          Order number: #{orderId}
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
