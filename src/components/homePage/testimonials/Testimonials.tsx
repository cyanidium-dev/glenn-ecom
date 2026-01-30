import Container from "@/components/shared/container/Container";
import { testimonialsData } from "./testimonialsData";
import TestimonialSwiper from "./TestimonialSwiper";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Testimonials() {
  return (
    <section className="pt-[45px] lg:pb-[100px]">
      <Container className="px-[20px] ssm:px-[20px]">
        <h2 className="sr-only">Testimonials</h2>
        <motion.div
          variants={fadeInAnimation({ y: 50, duration: 1, scale: 0.9 })}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
        >
          <TestimonialSwiper testimonialsList={testimonialsData} />
        </motion.div>
      </Container>
    </section>
  );
}
