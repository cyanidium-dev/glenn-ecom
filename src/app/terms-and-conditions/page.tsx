import type { Metadata } from "next";
import Container from "@/components/shared/container/Container";
import { fadeInAnimation } from "@/utils/utils/animationVariants";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Terms and Conditions | Glenn Garbo",
  description:
    "Terms and conditions for Glenn Garbo. Learn about our policies for products, payments, shipping, and returns.",
  keywords: ["terms and conditions", "terms", "Glenn Garbo"],
  openGraph: {
    title: "Terms and Conditions | Glenn Garbo",
    description:
      "Terms and conditions for Glenn Garbo. Learn about our policies for products, payments, shipping, and returns.",
    type: "website",
  },
};

export default function TermsAndConditions() {
  return (
    <section className="pt-[131px] lg:pt-[200px] pb-[84px] lg:pb-[150px]">
      <Container className="px-[15px] ssm:px-[25px]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: -30, delay: 0.1 })}
          className="mb-[30px] lg:mb-15 mx-auto font-andes text-[48px] lg:text-[96px] leading-[95%] font-medium tracking-0.01em text-center lowercase"
        >
          Terms and conditions
        </motion.h1>
        <div className="max-w-[536px] mx-auto flex flex-col gap-[1lh] text-center text-[12px] leading-[116%] lg:text-[18px] lg:leading-[121%] [counter-reset:section]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.2 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Seller
            </h3>
            <p className="lg:whitespace-pre-line">
              The seller of products offered on this website is:
              {"\n"}Mathias Biehle
              {"\n"}Switzerland
              {"\n"}contact@glenngarbo.com
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.3 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Products
            </h3>
            <p>
              This website sells physical products only, such as vinyl records
              and CDs. All product descriptions are provided to the best of our
              knowledge.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.4 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Prices and Payment
            </h3>
            <p className="lg:whitespace-pre-line">
              <span className="hidden lg:inline">{`• `}</span>All prices are
              listed in [currency to be confirmed].
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Payment is
              processed securely via third-party payment providers.
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Any applicable
              taxes or shipping costs are shown during checkout.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.5 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Shipping
            </h3>
            <p className="lg:whitespace-pre-line">
              <span className="hidden lg:inline">{`• `}</span>Products are
              shipped to the address provided during checkout.
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Shipping times and
              costs depend on the destination and will be indicated before
              purchase.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.6 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Right of Withdrawal
            </h3>
            <p className="lg:whitespace-pre-line">
              Customers have the right to withdraw from the purchase within 14
              days of receiving the goods, unless otherwise stated.
              {"\n"}To exercise this right, please contact us via email before
              returning the product.
              {"\n"}Return shipping costs are borne by the customer unless the
              product is defective.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.7 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Returns and Refunds
            </h3>
            <p className="lg:whitespace-pre-line">
              <span className="hidden lg:inline">{`• `}</span>Returned items
              must be unused and in their original condition.
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Refunds will be
              issued after receipt and inspection of the returned item.
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Shipping costs are
              non-refundable unless legally required.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.8 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Liability
            </h3>
            <p>
              We are not liable for delays or damages caused by shipping
              providers or circumstances beyond our control.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.9 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Governing Law
            </h3>
            <p>
              These Terms and Conditions are governed by the laws of
              Switzerland.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
