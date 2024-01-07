import { groq } from "next-sanity";
import { Profile } from "@/types/Profile";
import { getSanityClient } from "./client";

export async function getProfile(): Promise<Profile> {
  const data: Profile = await getSanityClient().fetch(
    groq`*[_type == "profile"][0]{
        _id,
        _createdAt,
        name,
        intro,
        socials,
        about,
        "cv": cv.asset->url,
        "photo": photo.asset->url,
        skills
      }`
  );

  if (!data) {
    throw new Error("Profile data not available");
  }

  return data;
}
