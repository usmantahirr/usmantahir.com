import { getProfile } from "@/sanity/sanity-utils";

import Intro from "./intro";
import SectionDivider from "../section-divider";
import About from "./about";

const Profile = async () => {
  const profile = await getProfile();

  console.log(profile);

  return (
    <>
      <Intro intro={profile.intro} socials={profile.socials} cv={profile.cv} />
      <SectionDivider />
      <About content={profile.about} />
    </>
  );
};

export default Profile;
