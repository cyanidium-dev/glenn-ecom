import Container from "../shared/container/Container";
import InfoBlock from "./InfoBlock";
import CheckoutForm from "./CheckoutForm";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { allRecordsQuery, settingsQuery } from "@/lib/queries";

export default async function Checkout() {
  const settingsData = await fetchSanityData(
    settingsQuery,
    {},
    { revalidate: 0, useCdn: false },
  );
  const recordsData = await fetchSanityData(
    allRecordsQuery,
    {},
    { revalidate: 0, useCdn: false },
  );

  return (
    <section className="pt-[144px] lg:pt-[129px] pb-[100px]">
      <Container className="px-[15px] ssm:px-[20px] xl:px-[200px] md:flex md:flex-row-reverse md:items-start justify-center md:gap-[40px] lg:gap-[60px]">
        <InfoBlock settings={settingsData} records={recordsData} />
        <CheckoutForm />
      </Container>
    </section>
  );
}
