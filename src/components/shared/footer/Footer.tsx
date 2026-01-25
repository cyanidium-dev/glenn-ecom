import Container from "../container/Container";
import Rights from "./Rights";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="pb-[34px] lg:py-4">
      <Container>
        <Socials className="mb-[25px] lg:mb-[30px]" />
        <Rights />
      </Container>
    </footer>
  );
}
