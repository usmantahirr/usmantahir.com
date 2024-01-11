import ExperienceComponent from './experiences';
import ErrorSection from "@/components/ErrorSection";
import { getErrorMessage } from "@/lib/utils";
import { executeQuery } from "@/sanity/sanity-utils";
import { groq } from "next-sanity";
import { Experience } from "@/types/Experience";

const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const Experience = async () => {
  let experiences = undefined;

  await wait();

  try {
    experiences = await executeQuery<Experience[]>(groq`*[_type == "experience"] | order(from desc) {
        _id,
        institution,
        from,
        to,
        position,
        location,
        type,
        description,
        "logo": logo.asset->url,
        technologies
      }`,
    );
  } catch (error: unknown) {
    return (<ErrorSection errorMessage={getErrorMessage(error)} />)
  }

  return <ExperienceComponent experiences={experiences} />
}

export default Experience;