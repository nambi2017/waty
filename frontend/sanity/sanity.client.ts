// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5d5w4ch5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: "2024-11-18", // Use current date
  useCdn: true, // Set to false if you want to ensure fresh data
};

const client = createClient(config);

export default client;