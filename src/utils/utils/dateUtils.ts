/**
 * Formats a date string from YYYY-MM-DD to "D Month YYYY" format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "5 September 2025")
 */
export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
