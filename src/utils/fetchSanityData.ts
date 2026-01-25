import axios from "axios";
import { client } from "../../lib/sanityClient";

export const fetchSanityData = async (
  query: string,
  params: Record<string, unknown> = {}
) => {
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
