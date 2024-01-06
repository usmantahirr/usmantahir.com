import { PortableTextBlock } from 'sanity';

export type Profile = {
  _id: string,
  _createdAt: string,
  name: string,
  intro: string,
  about: PortableTextBlock[],
  socials: {
    linkedIn: string,
    github: string,
  },
  cv: string,
  skills: string[],
}