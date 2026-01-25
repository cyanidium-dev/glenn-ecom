import type { Metadata } from "next";
import Container from "@/components/shared/container/Container";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "Privacy Policy | Glenn Garbo",
  description:
    "Privacy policy for Glenn Garbo. Learn how we collect, process, and protect your personal data.",
  keywords: ["privacy policy", "data protection", "Glenn Garbo"],
  openGraph: {
    title: "Privacy Policy | Glenn Garbo",
    description:
      "Privacy policy for Glenn Garbo. Learn how we collect, process, and protect your personal data.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Glenn Garbo",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  return (
    <section className="pt-[131px] lg:pt-[200px] pb-[84px] lg:pb-[150px]">
      <Container className="px-[15px] ssm:px-[20px]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: -30, delay: 0.1 })}
          className="mb-[30px] lg:mb-15 mx-auto font-andes text-[48px] lg:text-[96px] leading-[95%] font-medium tracking-0.01em text-center lowercase"
        >
          Privacy Policy
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
              Data Controller
            </h3>
            <p className="whitespace-pre-line">
              The data controller responsible for this website is:
              {"\n"}Mathias Biehle
              {"\n"}Country: Switzerland
              {"\n"}Contact:{" "}
              <a
                href="mailto:contact@glenngarbo.com"
                className="underline hover:text-white/60 transition duration-300 ease-in-out"
              >
                contact@glenngarbo.com
              </a>
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
              Personal Data We Collect
            </h3>
            <p className="whitespace-pre-line">
              We may collect and process the following personal data:
              {"\n"}• Contact data (name, email address) when you contact us via
              the contact form,
              {"\n"}• Newsletter data (email address) if you subscribe to the
              newsletter,
              {"\n"}• Order data when you purchase products from the store
              (name, email address, shipping address, and order details)
              {"\n"}Payment information is processed directly by our payment
              providers and is not stored on this website.
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
              Purpose of Data Processing
            </h3>
            <p className="whitespace-pre-line">
              Your data is used for the following purposes:
              {"\n"}• To respond to enquiries sent via the contact form,
              {"\n"}• To process and fulfil orders,
              {"\n"}• To send order confirmations and delivery updates,
              {"\n"}• To send newsletters (only if you have explicitly
              subscribed),
              {"\n"}• To ensure the technical functionality and security of the
              website.
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
              Legal Basis
            </h3>
            <p className="whitespace-pre-line">
              Personal data is processed based on:
              {"\n"}• Your consent (e.g. contact form, newsletter signup),
              {"\n"}• The performance of a contract (e.g. processing orders),
              {"\n"}• Legal obligations (e.g. accounting requirements).
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
              Third-Party Services
            </h3>
            <p className="whitespace-pre-line">
              This website may use third-party services, including:
              {"\n"}• Payment providers (e.g. Stripe, PayPal) for secure payment
              processing,
              {"\n"}• Shipping providers for order fulfilment,
              {"\n"}• Embedded content (e.g. music streaming services such as
              Spotify or Apple Music),
              {"\n"}• These providers process data in accordance with their own
              privacy policies.
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
              Cookies
            </h3>
            <p className="whitespace-pre-line">
              This website uses cookies that are necessary for its basic
              functionality. Additional cookies (e.g. analytics) will only be
              used if explicitly enabled.
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
              Your Rights
            </h3>
            <p className="whitespace-pre-line">
              You have the right to:
              {"\n"}• Request access to your personal data,
              {"\n"}• Request correction or deletion of your data,
              {"\n"}• Withdraw consent at any time,
              {"\n"}• Lodge a complaint with a data protection authority,
            </p>
            <p className="whitespace-pre-line">
              Requests can be sent to the contact details listed above.
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
              Changes
            </h3>
            <p>
              This Privacy Policy may be updated from time to time to reflect
              legal or technical changes.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
