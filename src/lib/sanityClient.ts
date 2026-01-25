import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6j5qleuo",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});
