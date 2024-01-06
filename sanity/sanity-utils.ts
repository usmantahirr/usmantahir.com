import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";
import { Profile } from '@/types/Profile';

export async function getProfile(): Promise<Profile> {
  const client = createClient({
    projectId,
    apiVersion,
    dataset,
  });

  return client.fetch(
    groq`*[_type == "profile"][0]{
        _id,
        _createdAt,
        name,
        intro,
        socials,
        about,
        "cv": cv.asset->url,
        skills
      }`
  );
}
