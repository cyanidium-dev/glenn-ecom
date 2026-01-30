import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container/Container";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { fadeInAnimation } from "@/utils/animationVariants";
import { BasketItem } from "@/types/store";
import { fetchSanityData } from "@/utils/fetchSanityData";

interface SuccessProps {
  params: Promise<{
    orderId: string;
  }>;
  searchParams: Promise<{ session_id?: string }>;
}

export async function generateMetadata({
  params,
}: SuccessProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order ${orderId}`,
    description: "Order confirmation.",
    robots: { index: false, follow: false },
  };
}

export default async function Success({ params, searchParams }: SuccessProps) {
  const { orderId } = await params;
  const { session_id } = await searchParams;
  const orderQuery = `*[_type == "order" && (_id == $orderId || stripeSessionId == $sessionId)][0]`;

  const order = (await fetchSanityData(
    orderQuery,
    {
      orderId: orderId,
      sessionId: session_id || "",
    },
    { useCdn: false },
  )) as BasketItem | null;
  if (!order) {
    return notFound();
  }
  console.log;
  const isPaid = order.status === "paid";

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
          {isPaid ? "Thank you for your order" : "Order is being processed"}
        </motion.h1>

        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="mb-2 lg:mb-[10px] text-[16px] lg:text-[20px] lg:leading-[120%] text-center"
        >
          {isPaid
            ? "Your order has been successfully placed and paid."
            : "We are waiting for payment confirmation from Stripe."}
        </motion.p>

        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          className="mb-6 lg:mb-10 text-[16px] lg:text-[20px] font-medium leading-[120%] text-center"
        >
          {/* Використовуємо реальний orderNumber з бази, або ID як фолбек */}
          Order number: #{order.orderNumber || order._id}
        </motion.p>

        <div className="flex flex-col items-center gap-4">
          <div className="px-4 py-1 rounded-full border border-white/20 text-sm uppercase tracking-widest">
            Status:{" "}
            <span className={isPaid ? "text-green-500" : "text-yellow-500"}>
              {order.status}
            </span>
          </div>

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
        </div>
      </Container>
    </section>
  );
}
