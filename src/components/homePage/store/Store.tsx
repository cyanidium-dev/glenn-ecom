import Container from "@/components/shared/container/Container";
import { MainPageStoreItem } from "@/types/store";
import ItemsList from "./ItemsList";
import PageDecorations from "../decorations/PageDecorations";

interface StoreProps {
  records: MainPageStoreItem[];
}

export default function Store({ records }: StoreProps) {
  if (!records || !records.length) {
    return null;
  }

  return (
    <section
      id="store"
      className="relative pt-[75px] pb-[60px] lg:pt-[150px] lg:pb-[175px]"
    >
      <PageDecorations />
      <Container className="relative z-20">
        <h2 className="font-andes text-[46px] lg:text-[110px] leading-[95%] text-center mb-5 lg:mb-10">
          Store
        </h2>
        <ItemsList items={records} />
      </Container>
    </section>
  );
}
