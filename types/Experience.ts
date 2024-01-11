import { PortableTextBlock } from "sanity";

export type Experience = {
  _id: string;
  institution: string;
  from: string;
  to: string;
  position: string;
  location: string;
  type: "education" | "work";
  description: PortableTextBlock[];
  logo: string;
  technologies: string[];
};
