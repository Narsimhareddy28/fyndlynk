import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "s1uthi16",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Enable CDN for better CORS support
  stega: false, // Disable stega for development
}); 