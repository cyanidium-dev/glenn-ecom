import axios from "axios";
import { client } from "@/lib/sanityClient";

export const fetchSanityData = async (
  query: string,
  params: Record<string, unknown> = {}
) => {
  // На сервере используем Sanity client напрямую (быстрее и надежнее)
  // На клиенте используем API route через HTTP
  if (typeof window === "undefined") {
    try {
      const data = await client.fetch(query, params);
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Sanity fetch failed on server:", errorMessage, error);
      throw new Error(`Failed to fetch Sanity data: ${errorMessage}`);
    }
  }

  // На клиенте используем API route
  const baseUrl = window.location.origin;

  try {
    const response = await axios.post(
      `${baseUrl}/api/sanity`,
      {
        query,
        params,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    // Улучшенная обработка ошибок для отладки
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(
        `Failed to fetch Sanity data: ${errorMessage} (Status: ${error.response?.status || "unknown"})`
      );
    }
    throw new Error(
      `Failed to fetch Sanity data: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
