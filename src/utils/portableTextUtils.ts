import { PortableTextBlock } from "@/types/store";

/**
 * Extracts plain text from Portable Text blocks
 * @param blocks - Array of Portable Text blocks
 * @returns Concatenated text string from all blocks
 */
export function extractTextFromBlocks(blocks: PortableTextBlock[]): string {
  return blocks
    .map(block => {
      if (block.children) {
        return block.children
          .map(child =>
            typeof child === "object" && "text" in child ? child.text : ""
          )
          .join("");
      }
      return "";
    })
    .join(" ")
    .trim();
}
