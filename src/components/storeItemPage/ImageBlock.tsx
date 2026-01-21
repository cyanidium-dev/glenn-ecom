import Image from "next/image";
import Container from "../shared/container/Container";

interface ImageBlockProps {
    image: { url: string; alt: string };
    isVinyl?: boolean;
}

export default function ImageBlock({ image, isVinyl }: ImageBlockProps) {
    return (
        <section className="relative pt-[131px] pb-5">
            <Container className="relative px-[15px] ssm:px-[30px]">
                <div className="relative w-[220px] h-[223px]">
                    <Image src={image.url} alt={image.alt} width={220} height={223} className="object-cover" />
                </div>
                {isVinyl &&
                    <div className="w-[218px] h-[218px] absolute -z-10 top-1/2 right-[15px] ssm:right-[30px] -translate-y-1/2">
                        <Image src="/images/vinyl.webp" alt="Vinyl" width={218} height={218} className="object-cover" />
                    </div>}
                {!isVinyl &&
                    <div className="w-[218px] h-[218px] absolute -z-10 top-1/2 right-[15px] ssm:right-[30px] -translate-y-1/2">
                        <Image src="/images/cd.webp" alt="CD" width={218} height={218} className="object-cover" />
                    </div>}
            </Container>
        </section>
    );
}