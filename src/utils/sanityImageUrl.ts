import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanityClient";
import { SanityImage } from "@/types/sanity";

const builder = imageUrlBuilder(client);

/**
 * Оптимізує URL зображення з Sanity для background-image
 * @param image - Sanity зображення
 * @param width - Ширина зображення (для responsive можна використовувати масив). Якщо не вказано, використовується нативна ширина
 * @param quality - Якість зображення (0-100), за замовчуванням 80
 * @param format - Формат зображення ('webp', 'jpg', 'png' тощо)
 * @returns Оптимізований URL зображення
 */
export function getOptimizedImageUrl(
  image: SanityImage | null | undefined,
  width?: number | string,
  quality: number = 80,
  format: "webp" | "jpg" | "png" | "auto" = "auto"
): string {
  if (!image?.asset?._id) {
    return "";
  }

  const imageBuilder = builder.image(image);

  // Використовуємо нативну ширину, якщо width не вказано
  if (width !== undefined && width !== null) {
    imageBuilder.width(typeof width === "number" ? width : parseInt(width));
  }

  imageBuilder.quality(quality);

  // Використовуємо auto("format") для автоматичного вибору найкращого формату
  // (WebP, AVIF, або оригінальний, якщо браузер не підтримує)
  // Якщо потрібен конкретний формат, використовуємо format()
  if (format === "auto") {
    imageBuilder.auto("format");
  } else {
    imageBuilder.format(format);
  }

  return imageBuilder.url();
}
