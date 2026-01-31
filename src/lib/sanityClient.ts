import { createClient } from "next-sanity";
console.log("Token exists:", !!process.env.SANITY_API_WRITE_TOKEN);
export const client = createClient({
  projectId: "6j5qleuo",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

export const writeClient = createClient({
  projectId: "6j5qleuo",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
});
