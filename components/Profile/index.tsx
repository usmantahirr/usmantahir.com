import { getProfile } from "@/sanity/sanity-utils";

import Intro from "./intro";
import SectionDivider from "../section-divider";
import About from "./about";
import { getErrorMessage } from "@/lib/utils";
import ErrorSection from '@/components/ErrorSection';

const Profile = async () => {
  let profile = undefined;

  try {
    profile = await getProfile();
  } catch (error: unknown) {
    return (<ErrorSection errorMessage={getErrorMessage(error)} />)
  }

  return (
    <>
      <Intro intro={profile.intro} socials={profile.socials} cv={profile.cv} />
      <SectionDivider />
      <About content={profile.about} />
    </>
  );
};

export default Profile;
