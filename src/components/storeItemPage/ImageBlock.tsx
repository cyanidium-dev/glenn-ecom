import Image from "next/image";

interface ImageBlockProps {
    image: { url: string; alt: string };
    isVinyl?: boolean;
}

export default function ImageBlock({ image, isVinyl }: ImageBlockProps) {
    return (
        <section className="relative lg:pt-[147px] lg:w-[calc(697/(1600-200-80)*100%)] lg:shrink-0">
            <div className="relative mx-auto max-w-[697px] lg:max-w-full aspect-330/225 md:aspect-697/469">
                <div className="relative w-full h-full aspect-463/469">
                    <Image src={image.url} alt={image.alt} fill className="object-cover" />
                </div>
                {isVinyl &&
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-4px)] aspect-220/224 md:aspect-square -z-10">
                        <Image src="/images/vinyl.webp" alt="Vinyl" fill className="object-cover" />
                    </div>}
                {!isVinyl &&
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[calc(100%-4px)] aspect-220/224 md:aspect-square -z-10">
                        <Image src="/images/cd.webp" alt="CD" fill className="object-cover" />
                    </div>}
            </div>
        </section>
    );
}