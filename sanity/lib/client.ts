import { createClient } from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "67gkfdi6";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const isSanityConfigured = Boolean(rawProjectId);

// Standard public client for website frontend (no auth token required for public datasets)
export const client = createClient({
  projectId: rawProjectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

// Authenticated client for Draft Mode / Preview
export const previewClient = createClient({
  projectId: rawProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});
