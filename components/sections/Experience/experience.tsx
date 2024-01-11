import Image from "next/image";
import moment from "moment";
import { PortableText } from "@portabletext/react";
import type { Experience } from "@/types/Experience";
import { useTheme } from "@/context/theme-context";

type Props = {
  experience: Experience
}

const formatDate = (from: string, to: string): string => {
  const fromDate = moment(from);
  const toDate = moment(to);

  return `${fromDate.format("MMMM Do YYYY")} - ${to ? toDate.format("MMMM Do YYYY") : "Present"}`;
};
const Experience = ({ experience }: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className="max-w-[70rem] my-5 py-5 px-10 border-gray-600 content-start relative"
      style={{
        background: theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
      }}>
      <div className="flex">
        <div className="inline mr-5">
          <Image src={experience.logo} alt={experience.institution} width={50} height={50} />
        </div>
        <div className="inline">
          <h2 className="text-2xl font-light">{experience.institution}</h2>
          <h3 className="text-gray-500 font-semibold">{experience.location}</h3>
        </div>
      </div>

      <span className="font-semibold absolute right-8 top-5">{formatDate(experience.from, experience.to)}</span>
      <div className="pt-4">
        <PortableText value={experience.description} />
      </div>
      <div className="flex flex-wrap text-sm mt-4">
        {
          experience.technologies.map((technology: string) => (
              <div
                className="py-2 px-3 m-1 bg-white borderBlack rounded dark:bg-white/10 dark:text-white/80"
                key={technology}>{technology}
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};

export default Experience;