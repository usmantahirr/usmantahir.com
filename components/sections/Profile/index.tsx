import { getProfile } from "@/sanity/sanity-utils";
import { getErrorMessage } from "@/lib/utils";
import ErrorSection from '@/components/ErrorSection';
import SectionDivider from "@/components/section-divider";
import Intro from "./intro";
import About from "./about";

const Profile = async () => {
  let profile = undefined;

  try {
    profile = await getProfile();
  } catch (error: unknown) {
    return (<ErrorSection errorMessage={getErrorMessage(error)} />)
  }

  return (
    <>
      <Intro intro={profile.intro} socials={profile.socials} cv={profile.cv} photo={profile.photo} />
      <SectionDivider />
      <About content={profile.about} />
    </>
  );
};

export default Profile;
