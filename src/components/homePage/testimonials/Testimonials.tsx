import Container from "@/components/shared/container/Container";
import TestimonialCard from "./TestimonialCard";
import { testimonialsData } from "./testimonialsData";

export default function Testimonials() {
  return (
    <section>
      <Container className="px-[20px] ssm:px-[20px]">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          {testimonialsData.map(testimonial => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
