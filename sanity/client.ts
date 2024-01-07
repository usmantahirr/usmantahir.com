import { createClient as createSanityClient, SanityClient, ClientConfig } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let clientInstance: SanityClient | undefined;

export function getSanityClient(): SanityClient {
  if (!clientInstance) {
    const config: ClientConfig = {
      projectId,
      apiVersion,
      dataset,
    };
    clientInstance = createSanityClient(config);
  }
  return clientInstance;
}
