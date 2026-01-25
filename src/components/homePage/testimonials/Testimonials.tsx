import Container from "@/components/shared/container/Container";
import { testimonialsData } from "./testimonialsData";
import TestimonialSwiper from "./TestimonialSwiper";

export default function Testimonials() {
  return (
    <section className="pt-[45px] lg:pb-[100px]">
      <Container className="px-[20px] ssm:px-[20px]">
        <h2 className="sr-only">Testimonials</h2>
        <TestimonialSwiper testimonialsList={testimonialsData} />
      </Container>
    </section>
  );
}
