import Image from "next/image";
import moment from "moment";
import { PortableText } from "@portabletext/react";
import type { Experience } from "@/types/Experience";
import { useTheme } from "@/context/theme-context";

type Props = {
  experience: Experience;
};

const formatDate = (from: string, to: string): string => {
  const fromDate = moment(from);
  const toDate = moment(to);

  return `${fromDate.format("MMMM Do YYYY")} - ${to ? toDate.format("MMMM Do YYYY") : "Present"}`;
};
const Experience = ({ experience }: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className="relative my-5 max-w-[70rem] content-start border-gray-600 px-10 py-5"
      style={{
        background: theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="flex">
        <div className="mr-5 inline">
          <Image src={experience.logo} alt={experience.institution} width={50} height={50} />
        </div>
        <div className="inline">
          <span className="text-2xl font-light">{experience.institution}</span>
          <div className="text-gray-500">
            <span className="mr-1 font-semibold">{experience.position}</span>(
            <span className="mx-1 text-sm">{experience.location}</span>)
          </div>
        </div>
      </div>

      <span className="absolute right-8 top-5 font-semibold">
        {formatDate(experience.from, experience.to)}
      </span>
      <div className="pt-4">
        <PortableText value={experience.description} />
      </div>
      <div className="mt-4 flex flex-wrap text-sm">
        {experience.technologies.map((technology: string) => (
          <div
            className="borderBlack m-1 rounded bg-white px-3 py-2 dark:bg-white/10 dark:text-white/80"
            key={technology}
          >
            {technology}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
