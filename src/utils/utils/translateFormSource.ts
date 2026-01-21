const SERVICE_TITLE_MAP: Record<string, string> = {
  "Landing page": "Лендінг",
  "Corporate website": "Сайт-компанія",
  "E-commerce": "Інтернет-магазин",
};

function translateServiceTitle(title: string): string {
  return SERVICE_TITLE_MAP[title] || title;
}

export function translateFormSource(source: string): string {
  if (source.startsWith("service-card-")) {
    const serviceTitle = source.replace("service-card-", "");
    const translatedTitle = translateServiceTitle(serviceTitle);
    return `Картка послуги "${translatedTitle}"`;
  }

  if (source.startsWith("comparison-table-header-")) {
    const serviceTitle = source.replace("comparison-table-header-", "");
    const translatedTitle = translateServiceTitle(serviceTitle);
    return `Таблиця порівняння - колонка "${translatedTitle}"`;
  }

  if (source === "comparison-table-mobile") {
    return "Таблиця порівняння (мобільна версія)";
  }

  if (source === "wow-design-learn-more") {
    return "Підказка про wow дизайн - кнопка 'Дізнатися більше'";
  }

  return `Джерело: ${source}`;
}
