import { createClient } from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const isValidFormat = /^[a-z0-9-]+$/.test(rawProjectId);

export const isSanityConfigured =
  isValidFormat &&
  rawProjectId !== "your-project-id" &&
  rawProjectId !== "placeholder-id";

// Standard public client for website frontend (no auth token required for public datasets)
export const client = createClient({
  projectId: isValidFormat ? rawProjectId : "sportmantle-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

// Authenticated client for Draft Mode / Preview
export const previewClient = createClient({
  projectId: isValidFormat ? rawProjectId : "sportmantle-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});
