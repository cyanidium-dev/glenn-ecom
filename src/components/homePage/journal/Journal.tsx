import Container from "@/components/shared/container/Container";
import SpoonIcon from "@/components/shared/icons/SpoonIcon";
import JournalForm from "./JournalForm";

export default function Journal() {
  return (
    <section
      id="journal"
      className="pt-[60px] pb-[130px] xl:pt-[175px] xl:pb-[200px]"
    >
      <Container>
        <SpoonIcon className="w-full h-auto max-w-[661px] mx-auto aspect-350/80 mb-[15px]" />
        <h2 className="font-andes text-[46px] lg:text-[110px] leading-[95%] text-center mb-[15px] lg:mb-10">
          Join the longspoon Journal
        </h2>
        <p className="text-center text-[11px] lg:text-[22px] leading-[120%] tracking-[-0.01em] mb-[30px] lg:mb-[50px] whitespace-pre-line">
          A blend of the practical and the editorial: announcements, upcoming
          events, occasional insights, and whatever happens to occupy Glenn’s
          mind at the time.
        </p>
        <JournalForm />
      </Container>
    </section>
  );
}
