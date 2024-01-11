import { getSanityClient } from "./client";

export async function executeQuery<T>(query: string): Promise<T> {
  const data: T = await getSanityClient().fetch(query);

  if (!data) {
    throw new Error("data not available");
  }

  return data;
}
