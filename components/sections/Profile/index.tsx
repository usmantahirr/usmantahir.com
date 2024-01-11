import { groq } from "next-sanity";
import { executeQuery } from "@/sanity/sanity-utils";
import { getErrorMessage } from "@/lib/utils";
import ErrorSection from "@/components/ErrorSection";
import SectionDivider from "@/components/SectionDivider";
import type { Profile } from "@/types/Profile";
import Intro from "./intro";
import About from "./about";
import Skills from "./skills";

const Profile = async () => {
  let profile = undefined;

  try {
    profile = await executeQuery<Profile>(groq`*[_type == "profile"][0]{
        intro,
        socials,
        about,
        "cv": cv.asset->url,
        "photo": photo.asset->url,
        skills
      }`);
  } catch (error: unknown) {
    return <ErrorSection errorMessage={getErrorMessage(error)} />;
  }

  return (
    <>
      <Intro
        intro={profile.intro}
        socials={profile.socials}
        cv={profile.cv}
        photo={profile.photo}
      />
      <SectionDivider />
      <About content={profile.about} />
      <Skills data={profile.skills} />
    </>
  );
};

export default Profile;
