import { Blog } from "@/types/blog";

export const calculateReadingTime = (
  article: Blog,
  wordsPerMinute: number = 200
): number => {
  const countWords = (text: string): number =>
    text.split(/\s+/).filter(Boolean).length;

  let totalWords = 0;

  // Підрахунок слів у заголовку та описі
  if (article.name) totalWords += countWords(article.name);
  if (article.description) totalWords += countWords(article.description);

  // Підрахунок слів у контенті (Portable Text)
  if (article.content && Array.isArray(article.content)) {
    for (const block of article.content) {
      if (block._type === "block" && Array.isArray(block.children)) {
        for (const child of block.children) {
          if (child._type === "span" && child.text) {
            totalWords += countWords(child.text);
          }
        }
      }
    }
  }

  return Math.ceil(totalWords / wordsPerMinute);
};
