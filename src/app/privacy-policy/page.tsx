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
              {"\n"}Switzerland
              {"\n"}
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
            <p className="lg:whitespace-pre-line">
              We may collect and process the following personal data:
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Contact data
              (name, email address) when you contact us via the contact form,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Newsletter data
              (email address) if you subscribe to the newsletter,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Order data when
              you purchase products from the store, including:
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Name,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Email address,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Shipping address,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Order details.
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
            <p className="lg:whitespace-pre-line">
              Your data is used for the following purposes:
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>To respond to
              enquiries sent via the contact form,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>To process and
              fulfil orders,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>To send order
              confirmations and delivery updates,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>To send
              newsletters (only if you have explicitly subscribed),
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>To ensure the
              technical functionality and security of the website.
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
            <p className="lg:whitespace-pre-line">
              Personal data is processed based on:
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Your consent (e.g.
              contact form, newsletter signup),
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>The performance of
              a contract (e.g. processing orders),
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Legal obligations
              (e.g. accounting requirements).
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
              Third-Party Services
            </h3>
            <p className="lg:whitespace-pre-line">
              This website may use third-party services, including:
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Payment providers
              (e.g. Stripe, PayPal) for secure payment processing,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Shipping providers
              for order fulfilment,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Embedded content
              (e.g. music streaming services such as Spotify or Apple Music),
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>These providers
              process data in accordance with their own privacy policies.
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
              Cookies
            </h3>
            <p className="lg:whitespace-pre-line">
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
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 0.8 })}
          >
            <h3 className="[counter-increment:section] before:content-[counter(section)'.'] before:mr-1">
              Data Retention
            </h3>
            <p>
              Personal data is stored only for as long as necessary to fulfil
              its purpose or comply with legal obligations.
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
              Your Rights
            </h3>
            <p className="lg:whitespace-pre-line">
              You have the right to:
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Request access to
              your personal data,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Request correction
              or deletion of your data,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Withdraw consent
              at any time,
              {"\n"}
              <span className="hidden lg:inline">{`• `}</span>Lodge a complaint
              with a data protection authority,
              {"\n"}Requests can be sent to the contact details listed above.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30, delay: 1.0 })}
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
